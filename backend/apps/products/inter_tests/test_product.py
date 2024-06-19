import pytest
from fastapi.testclient import TestClient
from apps.main import app
from apps.products.models import Product

client = TestClient(app)

# def test_create_product():
#     response = client.post(
#         "/products/",
#         json={"product_name": "Test Product", "description": "A test product", "price": 100.0, "stock": 10}
#     )
#     assert response.status_code == 201
#     assert response.json()["product"]["product_name"] == "Test Product"

def test_retrieve_product():
    response = client.get("/products/1")
    assert response.status_code == 200
    assert response.json()["product"]["product_id"] == 1

def test_list_products():
    response = client.get("/products/")
    assert response.status_code == 200
    assert len(response.json()["products"]) > 0
