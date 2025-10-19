import json
import random
from pathlib import Path
from copy import deepcopy
from datetime import datetime, timedelta
import hashlib

mock_file = Path(__file__).parent.parent / "mock.json"
with open(mock_file) as f:
    MOCK_TEMPLATE = json.load(f)["result"]

def generate_random_reviews(seed: int = None, count: int = None):
    """
    Generate `count` number of random reviews based on the mock template.
    If count is None, generate a random number between 1 and 5.
    """
    rng = random.Random(seed)
    count = count or rng.randint(5, 15)
    reviews = []

    for _ in range(count):
        review = deepcopy(rng.choice(MOCK_TEMPLATE))

        review["id"] = rng.randint(1000, 9999)
        review["rating"] = rng.randint(1, 10)
        for category in review.get("reviewCategory", []):
            category["rating"] = rng.randint(1, 10)

        delta_days = rng.randint(0, 730)
        review["submittedAt"] = (datetime.now() - timedelta(days=delta_days)).strftime("%Y-%m-%d %H:%M:%S")

        review["guestName"] = f"{review['guestName'].split()[0]} {rng.choice(['Smith','Johnson','Williams','Brown'])}"

        reviews.append(review)

    return {
        "status": "success",
        "result": reviews,
        "count": len(reviews),
        "offset": None
    }

def generate_seed_value(state: map):
    payload = getattr(state, "jwt_payload", {}) or {}
    secret_id = payload.get("secretId", "default-seed")

    h = hashlib.sha256(str(secret_id).encode()).hexdigest()
    return int(h[:16], 16) % (10**9)