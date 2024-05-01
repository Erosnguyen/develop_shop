from sqlalchemy import (Column, DateTime, ForeignKey, Integer, Numeric, String,
                        func)
from sqlalchemy.orm import relationship

from config.database import FastModel


class Order(FastModel):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer,ForeignKey("users.id"))
    total_price = Column(Numeric(10, 2))
    status = Column(String(50))

    items = relationship("OrderItem", back_populates="order")

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


class OrderItem(FastModel):
    __tablename__ = "order_items"

    item_id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer)

    order = relationship("Order", back_populates="items")

    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
