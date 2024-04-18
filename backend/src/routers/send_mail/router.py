from fastapi import APIRouter

router = APIRouter(prefix="/email", tags=["Email"])


@router.post("/send-email")
async def send_email():
    # Logic to send email
    return {"message": "Email sent successfully"}
