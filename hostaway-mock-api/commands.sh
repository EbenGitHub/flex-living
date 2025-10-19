pip install "fastapi[standard]"
pip install fastapi "uvicorn[standard]" pydantic-settings
pip install httpx
pip install python-dotenv
# fastapi dev main.py
uvicorn app.main:app --reload