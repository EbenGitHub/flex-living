from fastapi import APIRouter, Header, HTTPException, Request
from app.services.http_client import get_from_hostaway
from app.services.mock_reviews import generate_random_reviews, generate_seed_value

router = APIRouter(prefix="/reviews", tags=["reviews"])

@router.get("/")
async def fetch_reviews(request: Request, 
    authorization: str = Header(..., description="Bearer access token"),
):
    headers = {"Authorization": authorization}
    try:
        response = await get_from_hostaway("/reviews", headers=headers)
        if "result" in response and len(response["result"]) == 0:
            seed = generate_seed_value(request.state)
            return generate_random_reviews(seed=seed)
        return response
    except Exception as e:
        seed = generate_seed_value(request.state)
        return generate_random_reviews(seed=seed)
        """
        Some time the hostaway api takes longer time to response and throws with timeout error 
        So for that reason instead of throwing error, just return data would be much better 
        """
        # raise HTTPException(status_code=500, detail=str(e))
