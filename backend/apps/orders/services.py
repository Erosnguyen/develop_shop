from typing import List
from sqlalchemy import and_, or_, select
from apps.orders.models import Order, OrderItem
from apps.products.services import ProductService
from config import settings
from config.database import DatabaseManager

class OrderService:
    @classmethod
    async def create_order(cls, customer_id: int, items: List[dict]):
        """
        Create a new order.

        Args:
        - customer_id (int): The ID of the customer placing the order.
        - items (List[dict]): A list of dictionaries representing the order items. Each dictionary should contain the product_id and quantity.

        Returns:
        - Order: The created order object.
        """
        total_price = 0
        order_items = []
        for item in items:
            product_id = item.get("product_id")
            quantity = item.get("quantity")
            # if product_id is None or quantity is None:
            #     raise CustomException("Invalid order item data")
            product = await ProductService.retrieve_product(product_id)
            # if product is None:
            #     raise CustomException(f"Product with ID {product_id} not found")
            total_price += product.price * quantity
            order_items.append(OrderItem(product_id=product_id, quantity=quantity))

        order = Order(
            customer_id=customer_id, total_price=total_price, status="pending"
        )
        order.save()
        for order_item in order_items:
            order.items.append(order_item)
        order.save()
        return order
    @classmethod
    def list_products(cls, limit: int = 12):
        # - if "default variant" is not set, first variant will be
        # - on list of products, for price, get it from "default variant"
        # - if price or stock of default variant is 0 then select first variant that is not 0
        # - or for price, get it from "less price"
        # do all of them with graphql and let the front devs decide witch query should be run.

        # also can override the list `limit` in settings.py
        if hasattr(settings, "products_list_limit"):
            limit = settings.products_list_limit

        orders_list = []

        with DatabaseManager.session as session:
            orders = session.execute(select(Order.id).limit(limit))

        for order in orders:
            orders_list.append(cls.retrieve_product(order.id))

        return orders_list