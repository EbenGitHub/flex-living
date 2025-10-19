import jwt

def decode_jwt(token: str) -> dict:
    """
    Decode JWT payload without verifying signature (useful for RS256).
    """
    try:
        payload = jwt.decode(token, options={"verify_signature": False})
        return payload
    except Exception:
        return {}
    
def get_bearer_token(token: str) -> dict:
    """
    Return the token without bearer prefix
    """
    try:
        if token and token.lower().startswith("bearer "):
            return token.split(" ", 1)[1].strip()
        return ""
    except Exception:
        return ""
