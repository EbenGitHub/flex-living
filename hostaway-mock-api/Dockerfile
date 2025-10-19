FROM python:3.13-slim AS base

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .

# RUN pip install --no-cache-dir -r requirements.txt
RUN pip install "fastapi[standard]"
RUN pip install fastapi "uvicorn[standard]" pydantic-settings

COPY . .

EXPOSE 8000

# Command to run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
