FROM python:3 AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

RUN test -f fast_store.db && rm fast_store.db || true

COPY . .

RUN python demo.py

CMD ["uvicorn", "apps.main:app","--port", "8000","--host", "0.0.0.0", "--forwarded-allow-ips", "*","--reload"]
