FROM python:3.12.2-alpine AS builder

RUN apk add --no-cache gcc musl-dev

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN test -f fast_store.db && rm fast_store.db || true

COPY . .

EXPOSE 8000
CMD ["uvicorn", "apps.main:app", "--host", "0.0.0.0", "--port", "8000", "--forwarded-allow-ips", "*"]
