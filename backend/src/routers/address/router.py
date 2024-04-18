from fastapi import APIRouter

router = APIRouter(prefix="/address", tags=["Address"])


@router.post("/add-address")
async def add_address():
    return {"message": "Address added successfully"}


@router.put("/update-address/{address_id}")
async def update_address(address_id: int):
    return {"message": f"Address with ID {address_id} updated successfully"}


@router.delete("/delete-address/{address_id}")
async def delete_address(address_id: int):
    return {"message": f"Address with ID {address_id} deleted successfully"}
