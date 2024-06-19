import logging
from typing import List

from sqlalchemy.orm import joinedload

from apps.orders.models import Order, OrderItem
from apps.products.services import ProductService
from config.database import DatabaseManager

from .schemas import (AddressSchema, OrderItemSchema, OrderSchema,
                      OrderUpdateSchema, ProductMediaSchema,
                      ProductOptionItemSchema, ProductOptionSchema,
                      ProductSchema, ProductVariantSchema)


class OrderService:
    @classmethod
    async def create_order(
        cls, customer_id: int, items: List[OrderItemSchema], address: AddressSchema
    ):
        total_price = 0
        order_items = []
        for item in items:
            variant_id = item.variant_product_id
            quantity = item.quantity
            variant = ProductService.retrieve_variant(variant_id)
            if not variant:
                logging.error(f"Variant with ID {variant_id} not found.")
                raise ValueError(f"Variant with ID {variant_id} not found.")
            price = variant["price"]
            total_price += price * quantity
            order_item = OrderItem(product_id=variant_id, quantity=quantity)
            order_items.append(order_item)

        with DatabaseManager.session as session:
            order = Order(
                customer_id=customer_id,
                total_price=total_price,
                status="pending",
                address_street=address.street,
                address_city=address.city,
                address_state=address.state,
                address_country=address.country,
                address_phone=address.phone,
            )
            session.add(order)
            session.flush()

            for order_item in order_items:
                order_item.order_id = order.id
                session.add(order_item)

            session.commit()
            session.refresh(order)

        return cls.retrieve_order(order.id)

    @classmethod
    def list_orders(cls) -> List[OrderSchema]:
        orders_list = []

        with DatabaseManager.session as session:
            orders = session.query(Order).all()

        for order in orders:
            order_schema = cls.retrieve_order(order.id)
            if order_schema:
                orders_list.append(order_schema)

        return orders_list

    @classmethod
    def retrieve_order(cls, order_id: int) -> OrderSchema:
        with DatabaseManager.session as session:
            order = (
                session.query(Order)
                .options(joinedload(Order.items))
                .filter(Order.id == order_id)
                .first()
            )
            if not order:
                return None

        items_with_product = []
        for item in order.items:
            variant = ProductService.retrieve_variant(item.product_id)
            if not variant:
                logging.error(f"Variant with ID {item.product_id} not found.")
                continue  # Skip the item if variant not found

            product = variant["product"]

            product_variants = [
                ProductVariantSchema(
                    variant_id=variant["variant_id"],
                    product_id=variant["product_id"],
                    price=variant["price"],
                    stock=variant["stock"],
                    option1=variant["option1"],
                    option2=variant["option2"],
                    option3=variant["option3"],
                    created_at=variant["created_at"].strftime("%Y-%m-%d %H:%M:%S"),
                    updated_at=(
                        variant["updated_at"].strftime("%Y-%m-%d %H:%M:%S")
                        if variant["updated_at"]
                        else None
                    ),
                )
            ]

            product_media = [
                ProductMediaSchema(
                    media_id=media.id,
                    product_id=media.product_id,
                    alt=media.alt,
                    src=ProductService._ProductService__get_media_url(
                        media.product_id, media.src
                    ),
                    type=media.type,
                    created_at=media.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    updated_at=(
                        media.updated_at.strftime("%Y-%m-%d %H:%M:%S")
                        if media.updated_at
                        else None
                    ),
                )
                for media in product.media
            ]

            product_options = [
                ProductOptionSchema(
                    options_id=option.id,
                    option_name=option.option_name,
                    items=[
                        ProductOptionItemSchema(
                            item_id=item.id, item_name=item.item_name
                        )
                        for item in option.option_items
                    ],
                )
                for option in product.options
            ]

            items_with_product.append(
                OrderItemSchema(
                    variant_product_id=item.product_id,
                    quantity=item.quantity,
                    product=ProductSchema(
                        product_id=product.id,
                        product_name=product.product_name,
                        description=product.description,
                        status=product.status,
                        created_at=product.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                        updated_at=(
                            product.updated_at.strftime("%Y-%m-%d %H:%M:%S")
                            if product.updated_at
                            else None
                        ),
                        published_at=(
                            product.published_at.strftime("%Y-%m-%d %H:%M:%S")
                            if product.published_at
                            else None
                        ),
                        options=product_options,
                        variants=product_variants,
                        media=product_media,
                    ),
                )
            )

        return OrderSchema(
            order_id=order.id,
            customer_id=order.customer_id,
            total_price=float(order.total_price),
            status=order.status,
            address=AddressSchema(
                street=order.address_street,
                city=order.address_city,
                state=order.address_state,
                country=order.address_country,
                phone=order.address_phone,
            ),
            items=items_with_product,
        )

    @classmethod
    def list_orders_by_customer_id(cls, customer_id: int) -> List[OrderSchema]:
        orders_by_customer = []
        with DatabaseManager.session as session:
            orders = (
                session.query(Order)
                .options(joinedload(Order.items))
                .filter(Order.customer_id == customer_id)
                .all()
            )
            for order in orders:
                order_schema = cls.retrieve_order(order.id)
                if order_schema:
                    orders_by_customer.append(order_schema)
        return orders_by_customer

    @classmethod
    async def update_order(
        cls, order_id: int, update_data: OrderUpdateSchema
    ) -> OrderSchema:
        with DatabaseManager.session as session:
            order = (
                session.query(Order)
                .options(joinedload(Order.items))
                .filter(Order.id == order_id)
                .first()
            )
            if order is None:
                logging.error(f"Order with ID {order_id} not found.")
                return None
            order.status = update_data.status
            session.commit()
            session.refresh(order)

        return cls.retrieve_order(order.id)

    @classmethod
    async def delete_order(cls, order_id: int) -> dict:
        with DatabaseManager.session as session:
            order = session.query(Order).filter(Order.id == order_id).first()
            if order is None:
                logging.error(f"Order with ID {order_id} not found.")
                return None

            session.delete(order)
            session.commit()

            return {"order_id": order.id, "status": "deleted"}
