from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routers.address.router import router as address_router
from src.routers.authen.router import router as auth_router
from src.routers.blog.router import router as blog_router
from src.routers.category.router import router as category_router
from src.routers.dashboard.router import router as dashboard_router
from src.routers.feedback.router import router as feedback_router
from src.routers.healthcheck.router import router as healthcheck_router
from src.routers.orders.router import router as orders_router
from src.routers.products.router import router as products_router
from src.routers.send_mail.router import router as send_mail_router
from src.routers.sliders.router import router as sliders_router
from src.routers.tags.router import router as tags_router
from src.routers.users.router import router as users_router

load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(healthcheck_router)
app.include_router(products_router)
app.include_router(users_router)
app.include_router(orders_router)
app.include_router(blog_router)
app.include_router(auth_router)
app.include_router(category_router)
app.include_router(send_mail_router)
app.include_router(dashboard_router)
app.include_router(sliders_router)
app.include_router(tags_router)
app.include_router(feedback_router)
app.include_router(address_router)
