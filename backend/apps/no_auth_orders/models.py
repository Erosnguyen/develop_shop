from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String, func
from sqlalchemy.orm import relationship

from config.database import FastModel


class Guest_Order(FastModel):
    __tablename__ = "guest_orders"

    id = Column(Integer, primary_key=True)
    total_price = Column(Numeric(10, 2))
    status = Column(String(50))

    guest_first_name = Column(String(50), nullable=True)
    guest_last_name = Column(String(50), nullable=True)
    guest_email = Column(String(50), nullable=True)
    address_street = Column(String(256), nullable=True)
    address_city = Column(String(100), nullable=True)
    address_state = Column(String(100), nullable=True)
    address_country = Column(String(100), nullable=True)

    items = relationship("Guest_OrderItem", back_populates="order")

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class Guest_OrderItem(FastModel):
    __tablename__ = "guest_order_items"

    item_id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("guest_orders.id"))
    product_id = Column(Integer)
    quantity = Column(Integer)

    order = relationship("Guest_Order", back_populates="items")
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
