dev:
	uvicorn apps.main:app --reload

format:
	black . && isort .

build:
	docker build -t huongvietbe:latest .

run:
	docker run -p 8000:8000 huongvietbe:latest
