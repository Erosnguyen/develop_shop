from fastapi import APIRouter

from src.routers.tags.schema import TagCreate, TagUpdate

router = APIRouter(prefix="/tags", tags=["Tags"])


@router.get("/")
async def get_tags():
    pass


@router.get("/{tag_id}")
async def get_tag(tag_id: int):
    pass


@router.post("/")
async def create_tag(tag: TagCreate):
    pass


@router.put("/{tag_id}")
async def update_tag(tag_id: int, tag: TagUpdate):
    pass


@router.delete("/{tag_id}")
async def delete_tag(tag_id: int):
    pass
