import {
  Injectable,
  Logger,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from 'redis';

@Injectable()
export class ThirdPartyService {
  private readonly logger = new Logger(ThirdPartyService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  // Fetch token using client id/secret
  private async authenticate(): Promise<void> {
    const clientId = this.configService.get<string>('THIRD_PARTY_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'THIRD_PARTY_CLIENT_SECRET',
    );
    const apiUrl = this.configService.get<string>('THIRD_PARTY_API_URL');

    try {
      const params = new URLSearchParams();
      params.append('client_id', clientId!);
      params.append('client_secret', clientSecret!);
      params.append('scope', 'general');
      params.append('grant_type', 'client_credentials'); // if required by API

      const { data } = await firstValueFrom(
        this.httpService.post(`${apiUrl}/auth/token`, params.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );

      const token = data.access_token;
      const expiresIn = data.expires_in;
      await this.redisClient.set(`third_party_token`, token, {
        EX: expiresIn - 10,
      });
    } catch (error) {
      //   this.logger.error('Failed to authenticate', error);
      throw new InternalServerErrorException(
        'Failed to authenticate with third party',
      );
    }
  }

  private async getToken(): Promise<string> {
    let token = await this.redisClient.get('third_party_token');
    if (!token) {
      await this.authenticate();
      token = await this.redisClient.get('third_party_token');
    }
    return token!;
  }

  // Make GET request with automatic retry if unauthorized
  async get<T>(path: string, retries = 1): Promise<T> {
    const apiUrl = this.configService.get<string>('THIRD_PARTY_API_URL');

    try {
      const token = await this.getToken();
      const { data } = await firstValueFrom(
        this.httpService.get(`${apiUrl}${path}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      );
      return data;
    } catch (error: any) {
      if (error.response?.status === 401 && retries > 0) {
        this.logger.warn('Token expired, re-authenticating...');
        await this.authenticate();
        return this.get<T>(path, retries - 1);
      }
      this.logger.error('Failed to fetch third-party data', error);
      throw error;
    }
  }
}
