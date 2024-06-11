from sqlalchemy import (Boolean, Column, DateTime, ForeignKey, Integer, String,
                        func)
from sqlalchemy.orm import relationship

from config.database import FastModel


class User(FastModel):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(256), nullable=False, unique=True)
    password = Column(String, nullable=False)

    first_name = Column(String(256), nullable=True)
    last_name = Column(String(256), nullable=True)

    is_verified_email = Column(Boolean, default=False)
    is_active = Column(Boolean, default=False)
    is_superuser = Column(Boolean, default=False)

    role = Column(String(5), default="user")

    date_joined = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, nullable=True, onupdate=func.now())
    last_login = Column(DateTime, nullable=True)

    change = relationship(
        "UserVerification", back_populates="user", cascade="all, delete-orphan"
    )


class UserVerification(FastModel):

    __tablename__ = "users_verifications"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    request_type = Column(String, nullable=True)
    new_email = Column(String(256), nullable=True)
    new_phone = Column(String(256), nullable=True)
    active_access_token = Column(String, nullable=True)

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    user = relationship("User", back_populates="change")
