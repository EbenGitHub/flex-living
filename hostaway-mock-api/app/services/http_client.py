import httpx
from app.services.config import config_service

timeout = httpx.Timeout(config_service.timeout, connect=config_service.connect_timeout)

async def post_to_hostaway(endpoint: str, data: dict, headers: dict = None):
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(f"{config_service.base_url}{endpoint}", data=data, headers=headers)
        response.raise_for_status()
        return response.json()

async def get_from_hostaway(endpoint: str, headers: dict = None, params: dict = None):
    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.get(f"{config_service.base_url}{endpoint}", headers=headers, params=params)
        response.raise_for_status()
        return response.json()
