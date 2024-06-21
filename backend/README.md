# Backend

Backend application.

## Requirements

- poetry
- Python 3.10 or later
- [Poetry](https://www.poetryfoundation.org/)

## Quickstart

Prepare environment

```
poetry shell
poetry install
cp .env.template .env
```

Config local database (run only onece at a time)

```
python demo.py
```

Format backend code

```
make format
```

Export python path:

```
export PYTHONPATH=$PYTHONPATH:$(pwd)
```

Start development server

```
make dev
```

Build backend

```
docker build -t huongvietbe:latest .
```

Run docker

```
docker run -p 8000:8000 huongvietbe:latest
```

Check api endpoint:

- localhost:8000/docs

<!-- uvicorn apps.main:app --reload -->
