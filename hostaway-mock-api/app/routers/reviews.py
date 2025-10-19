# app/routers/users.py

from fastapi import APIRouter

# ⭐️ Create an APIRouter instance
router = APIRouter(
    tags=["Users"], # Used for documentation (Swagger/ReDoc)
    # The prefix is applied in main.py, e.g., /api/v1/users
    prefix="/users" 
)

@router.post("/")
async def create_user(user: dict):
    # This would contain your actual business logic (e.g., calling a service or CRUD file)
    return {"id": 1, "username": user["username"]}

@router.get("/{user_id}")
async def read_user(user_id: int):
    return {"id": user_id, "username": f"User_{user_id}"}