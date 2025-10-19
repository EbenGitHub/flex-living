import os
from dotenv import load_dotenv

class ConfigService:
    def __init__(self, env_file: str = ".env"):
        load_dotenv(env_file)
        self.base_url = os.getenv("BASE_URL", "https://api.hostaway.com/v1")
        self.timeout = float(os.getenv("TIMEOUT", 60.0))
        self.connect_timeout = float(os.getenv("CONNECT_TIMEOUT", 10.0))

config_service = ConfigService()
