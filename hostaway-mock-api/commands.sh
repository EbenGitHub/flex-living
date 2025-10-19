pip install "fastapi[standard]"
pip install fastapi "uvicorn[standard]" pydantic-settings
fastapi dev main.py
uvicorn app.main:app --reload