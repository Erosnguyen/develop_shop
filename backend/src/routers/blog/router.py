from fastapi import APIRouter

from src.routers.blog.schema import BlogPostCreate, BlogPostUpdate

router = APIRouter(prefix="/blog", tags=["Blog"])


@router.get("/")
async def get_blog_posts():
    pass


@router.get("/{post_id}")
async def get_blog_post(post_id: int):
    pass


@router.post("/")
async def create_blog_post(post: BlogPostCreate):
    pass


@router.put("/{post_id}")
async def update_blog_post(post_id: int, post: BlogPostUpdate):
    pass


@router.delete("/{post_id}")
async def delete_blog_post(post_id: int):
    pass
