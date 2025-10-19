import { Injectable } from '@nestjs/common';
import { flexLivingPackageTest } from '@flex-living/utils/test';

@Injectable()
export class AppService {
  getHello(): string {
    const test = flexLivingPackageTest();
    return test;
  }
}
