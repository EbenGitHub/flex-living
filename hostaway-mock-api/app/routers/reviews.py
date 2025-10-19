from fastapi import APIRouter, Header, HTTPException
from app.services.http_client import get_from_hostaway

router = APIRouter(prefix="/reviews", tags=["reviews"])

@router.get("/")
async def fetch_reviews(
    authorization: str = Header(..., description="Bearer access token"),
):
    headers = {"Authorization": authorization}
    print({authorization})
    try:
        response = await get_from_hostaway("/reviews", headers=headers)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
