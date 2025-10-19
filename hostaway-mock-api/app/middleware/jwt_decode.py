from starlette.middleware.base import BaseHTTPMiddleware
from fastapi import Request
from app.services.jwt_utils import decode_jwt, get_bearer_token

class JWTDecodeMiddleware(BaseHTTPMiddleware):
    """
    Decode JWT payload without verifying signature and attach it to request.state.jwt_payload
    """
    async def dispatch(self, request: Request, call_next):
        auth: str | None = request.headers.get("authorization")
        request.state.jwt_payload = None

        token = get_bearer_token(auth)
        if (len(token) > 0):
            payload = decode_jwt(token)
            request.state.jwt_payload = payload

        response = await call_next(request)
        return response
