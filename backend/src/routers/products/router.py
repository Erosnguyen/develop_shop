from fastapi import APIRouter

from src.routers.products.schema import ProductCreate, ProductUpdate

router = APIRouter(prefix="/category", tags=["Products"])


@router.get("/")
async def get_products():
    pass


@router.get("/{product_id}")
async def get_product(product_id: int):
    pass


@router.post("/")
async def create_product(product: ProductCreate):
    pass


@router.put("/{product_id}")
async def update_product(product_id: int, product: ProductUpdate):
    pass


@router.delete("/{product_id}")
async def delete_product(product_id: int):
    pass
