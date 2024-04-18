from fastapi import APIRouter

from src.routers.sliders.schema import SliderCreate, SliderUpdate

router = APIRouter(prefix="/sliders", tags=["Sliders"])


@router.get("/")
async def get_sliders():
    return {"message": "Get all sliders"}


@router.get("/{slider_id}")
async def get_slider(slider_id: int):
    return {"message": f"Get slider with ID {slider_id}"}


@router.post("/")
async def create_slider(slider: SliderCreate):
    return {"message": "Create a new slider", "data": slider.dict()}


@router.put("/{slider_id}")
async def update_slider(slider_id: int, slider: SliderUpdate):
    return {"message": f"Update slider with ID {slider_id}", "data": slider.dict()}


@router.delete("/{slider_id}")
async def delete_slider(slider_id: int):
    return {"message": f"Delete slider with ID {slider_id}"}
