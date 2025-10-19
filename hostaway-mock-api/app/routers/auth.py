from fastapi import APIRouter, Form
from app.services.http_client import post_to_hostaway

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/token")
async def get_access_token(
    grant_type: str = Form(...),
    client_id: str = Form(...),
    client_secret: str = Form(...),
    scope: str = Form(...),
):
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": grant_type,
        "client_id": client_id,
        "client_secret": client_secret,
        "scope": scope,
    }

    response = await post_to_hostaway("/accessTokens", data, headers)
    return response
