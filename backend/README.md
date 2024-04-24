# huongvietfood Backend

Backend application.

## Requirements

- Python 3.10 or later
- [Poetry](https://www.poetryfoundation.org/)

## Quickstart

Prepare environment

```
poetry shell
poetry install
cp .env.template .env
```

Config local database

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

Check api endpoint:

* localhost:8000/docs
