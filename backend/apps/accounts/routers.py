from typing import List
from fastapi import APIRouter, Body, Depends, status
from fastapi.security import OAuth2PasswordRequestForm

from apps.accounts import schemas
from apps.accounts.services.authenticate import AccountService
from apps.accounts.services.permissions import Permission
from apps.accounts.services.user import User, UserManager

router = APIRouter(prefix="/accounts")


# ------------------------
# --- Register Routers ---
# ------------------------


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=schemas.RegisterOut,
    summary="Register a new user",
    description="""## Register a new user by email and password, then send an OTP code to the user's email address.
    
Generate an account activation code for a user whose account is not yet enabled.

The account activation code generated by this endpoint is designed for one-time use and will expire after 5 minutes. 
If a new POST request is made to this endpoint, a new code will be generated if the previous code has expired. The newly
 generated code will be valid for another 5 minutes, while the previous code will no longer be valid.

Following the registration request, this endpoint will send an OTP code to the user's email address. It is essential to 
verify this OTP code using the `/accounts/register/verify` endpoint. Verification confirms the user's email address and 
activates their account.
 
Please note that users cannot log in to their accounts until their email addresses are verified.
""",
    tags=["Authentication"],
)
async def register(payload: schemas.RegisterIn = Body(**schemas.RegisterIn.examples())):
    return AccountService.register(**payload.model_dump(exclude={"password_confirm"}))


@router.patch(
    "/register/verify",
    status_code=status.HTTP_200_OK,
    response_model=schemas.RegisterVerifyOut,
    summary="Verify user registration",
    description="Verify a new user registration by confirming the provided OTP.",
    tags=["Authentication"],
)
async def verify_registration(payload: schemas.RegisterVerifyIn):
    return AccountService.verify_registration(**payload.model_dump())


# ---------------------
# --- Login Routers ---
# ---------------------


@router.post(
    "/login",
    status_code=status.HTTP_200_OK,
    response_model=schemas.LoginOut,
    summary="Login a user",
    description="Login a user with valid credentials, if user account is active.",
    tags=["Authentication"],
)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return AccountService.login(form_data.username, form_data.password)


@router.post(
    "/logout",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Logout user",
    description="Logout the currently authenticated user. "
    "Revokes the user's access token and invalidates the session.",
    tags=["Authentication"],
)
async def logout(current_user: User = Depends(AccountService.current_user)):
    AccountService.logout(current_user)


# ------------------------
# --- Password Routers ---
# ------------------------


@router.post(
    "/reset-password",
    status_code=status.HTTP_200_OK,
    response_model=schemas.PasswordResetOut,
    summary="Reset password",
    description="Initiate a password reset request by sending a verification email to the user's "
    "registered email address.",
    tags=["Authentication"],
)
async def reset_password(payload: schemas.PasswordResetIn):
    return AccountService.reset_password(**payload.model_dump())


@router.patch(
    "/reset-password/verify",
    status_code=status.HTTP_200_OK,
    response_model=schemas.PasswordResetVerifyOut,
    summary="Verify reset password",
    description="Verify the password reset request by confirming the provided OTP sent to the user's "
    "registered email address. If the change is successful, the user will need to login again.",
    tags=["Authentication"],
)
async def verify_reset_password(payload: schemas.PasswordResetVerifyIn):
    return AccountService.verify_reset_password(
        **payload.model_dump(exclude={"password_confirm"})
    )


# -------------------
# --- OTP Routers ---
# -------------------


@router.post(
    "/otp",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Resend OTP",
    description="""Allows the user to request a new OTP (One-Time Password) for registration, password reset,
    or email change verification.

### Usage Guidelines:
- For **registration** and **password reset**, provide the user's **primary email address**.
- For **email change**, provide the **primary email address** too, (not the new unverified email).
    """,
    tags=["Authentication"],
)
async def resend_otp(
    payload: schemas.OTPResendIn = Body(**schemas.OTPResendIn.examples()),
):
    AccountService.resend_otp(**payload.model_dump())


@router.get(
    "/me",
    status_code=status.HTTP_200_OK,
    response_model=schemas.CurrentUserOut,
    summary="Retrieve current user",
    description="Retrieve current user if user is active.",
    tags=["Users"],
)
async def retrieve_me(current_user: User = Depends(AccountService.current_user)):
    return {"user": UserManager.to_dict(current_user)}


@router.put(
    "/me",
    status_code=status.HTTP_200_OK,
    response_model=schemas.CurrentUserOut,
    summary="Update current user",
    description="Update current user.",
    tags=["Users"],
)
async def update_me(
    payload: schemas.UpdateUserSchema,
    current_user: User = Depends(AccountService.current_user),
):
    user = UserManager.update_user(current_user.id, **payload.model_dump())
    return {"user": UserManager.to_dict(user)}


@router.patch(
    "/me/password",
    status_code=status.HTTP_200_OK,
    response_model=schemas.PasswordChangeOut,
    summary="Change current user password",
    description="Change the password for the current user. If the change is successful, the user will "
    "need to login again.",
    tags=["Users"],
)
async def change_password(
    payload: schemas.PasswordChangeIn = Body(**schemas.PasswordChangeIn.examples()),
    current_user: User = Depends(AccountService.current_user),
):
    return AccountService.change_password(
        current_user, **payload.model_dump(exclude={"password_confirm"})
    )


@router.post(
    "/me/email",
    status_code=status.HTTP_200_OK,
    response_model=schemas.EmailChangeOut,
    summary="Change current user email",
    description="""## Change the email address for the current user.

After the new email is set, an OTP code will be sent to the new email address for verification purposes.
""",
    tags=["Users"],
)
async def change_email(
    email: schemas.EmailChangeIn,
    current_user: User = Depends(AccountService.current_user),
):
    return AccountService.change_email(current_user, **email.model_dump())


@router.patch(
    "/me/email/verify",
    status_code=status.HTTP_200_OK,
    response_model=schemas.EmailChangeVerifyOut,
    summary="Verify change current user email",
    description="""## Verify the email address change for the current user.

Validating the OTP code sent to the user's new email address. If the OTP is valid, the new
email address will be saved as the user's main email address.
""",
    tags=["Users"],
)
async def verify_change_email(
    otp: schemas.EmailChangeVerifyIn,
    current_user: User = Depends(AccountService.current_user),
):
    return AccountService.verify_change_email(current_user, **otp.model_dump())


@router.get(
    "/{user_id}",
    status_code=status.HTTP_200_OK,
    response_model=schemas.CurrentUserOut,
    summary="Retrieve a single user",
    description="Retrieve a single user by ID. Only admins can read the users data.",
    tags=["Users"],
    dependencies=[Depends(Permission.is_admin)],
)
async def retrieve_user(user_id: int):
    return {"user": UserManager.to_dict(UserManager.get_user(user_id))}

# ------------------------
# --- List All Users ---
# ------------------------

@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    summary="List all users",
    description="Retrieve a list of all users. Only admins can access this endpoint.",
    tags=["Users"],
    dependencies=[Depends(Permission.is_admin)],
)
async def list_users():
    users = UserManager.get_all_users()
    return [{"user": UserManager.to_dict(user)} for user in users]

# ------------------------
# --- Delete a User ---
# ------------------------

@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete a single user",
    description="Delete a user by ID. Only admins can delete users.",
    tags=["Users"],
    dependencies=[Depends(Permission.is_admin)],
)
async def delete_user(user_id: int):
    UserManager.delete_user(user_id)
    return {"detail": "User deleted successfully"}
# TODO DELETE /accounts/me
# TODO add docs and examples to endpoints
