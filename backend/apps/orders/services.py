from typing import List

from sqlalchemy import and_, or_, select
from sqlalchemy.orm import joinedload

from apps.orders.models import Order, OrderItem
from apps.products.services import ProductService
from config import settings
from config.database import DatabaseManager

from .schemas import OrderCreateSchema, OrderItemSchema, OrderSchema


class OrderService:
    @classmethod
    async def create_order(cls, customer_id: int, items: List[OrderItemSchema]):
        """
        Create a new order.

        Args:
        - customer_id (int): The ID of the customer placing the order.
        - items (List[OrderItemSchema]): A list of OrderItemSchema objects representing the order items.
          Each object should contain the variant_product_id and quantity.

        Returns:
        - Order: The created order object.
        """
        total_price = 0
        order_items = []
        for item in items:
            variant_id = item.variant_product_id
            quantity = item.quantity
            variant = ProductService.retrieve_variant(variant_id)
            price = variant["price"]
            total_price += price * quantity
            order_item = OrderItem(product_id=variant_id, quantity=quantity)
            order_items.append(order_item)

        with DatabaseManager.session as session:
            order = Order(
                customer_id=customer_id, total_price=total_price, status="pending"
            )
            session.add(order)
            session.flush()

            for order_item in order_items:
                order_item.order_id = order.id
                session.add(order_item)

            session.commit()

            session.refresh(order)

            order.items

        return order

    @classmethod
    def list_orders(cls, limit: int = 12):
        if hasattr(settings, "orders_list_limit"):
            limit = settings.orders_list_limit

        orders_list = []

        with DatabaseManager.session as session:
            orders = session.execute(select(Order.id).limit(limit))

        for order in orders:
            orders_list.append(cls.retrieve_order(order.id))

        return orders_list

    @classmethod
    def retrieve_order(cls, order_id: int):
        with DatabaseManager.session as session:
            order = (
                session.query(Order)
                .options(joinedload(Order.items))
                .filter(Order.id == order_id)
                .first()
            )
        return order

    @classmethod
    def list_orders_by_customer_id(cls, customer_id: int):
        print("Customer ID:", customer_id)
        orders_by_customer = []
        with DatabaseManager.session as session:
            orders = (
                session.query(Order)
                .options(joinedload(Order.items))
                .filter(Order.customer_id == customer_id)
                .all()
            )
            for order in orders:
                orders_by_customer.append(order)
        return orders_by_customer


