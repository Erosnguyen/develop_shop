import logging
from typing import List
from contextlib import contextmanager
from apps.products.services import ProductService
from config.database import DatabaseManager
from .models import Guest_Order, Guest_OrderItem
from .schemas import (
    GuestAddressSchema, GuestOrderCreateSchema, GuestOrderItemSchema,
    GuestOrderSchema, ProductSchema, ProductVariantSchema, ProductMediaSchema,
    ProductOptionSchema, ProductOptionItemSchema
)

class GuestOrderService:
    @classmethod
    @contextmanager
    def session_scope(cls):
        """Provide a transactional scope around a series of operations."""
        session = DatabaseManager.session
        try:
            yield session
            session.commit()
        except Exception as e:
            session.rollback()
            raise e
        finally:
            session.close()

    @classmethod
    async def create_guest_order(cls, order_data: GuestOrderCreateSchema):
        total_price = 0
        order_items = []
        for item in order_data.items:
            variant_id = item.variant_product_id
            quantity = item.quantity
            variant = ProductService.retrieve_variant(variant_id)
            if variant is None:
                logging.error(f"Variant with ID {variant_id} not found.")
                continue
            logging.debug(f"Retrieved variant: {variant}")
            price = variant["price"]
            total_price += price * quantity
            order_item = Guest_OrderItem(product_id=variant_id, quantity=quantity)
            order_items.append(order_item)

        if not order_items:
            logging.error("No items were added to the order.")
            raise ValueError("No valid items found to create an order.")

        with cls.session_scope() as session:
            order = Guest_Order(
                total_price=total_price,
                status="pending",
                guest_first_name=order_data.first_name,
                guest_last_name=order_data.last_name,
                guest_email=order_data.email,
                address_street=order_data.address.street,
                address_city=order_data.address.city,
                address_state=order_data.address.state,
                address_country=order_data.address.country,
            )
            session.add(order)
            session.flush()

            for order_item in order_items:
                order_item.order_id = order.id
                session.add(order_item)

            # Refresh the order instance within the session
            session.refresh(order)
            order_items = (
                session.query(Guest_OrderItem).filter_by(order_id=order.id).all()
            )

            # Retrieve order_id within the session scope
            order_id = order.id

        items_with_product = []
        for item in order_items:
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
                    updated_at=variant["updated_at"].strftime("%Y-%m-%d %H:%M:%S") if variant["updated_at"] else None
                )
            ]

            product_media = [
                ProductMediaSchema(
                    media_id=media.id,
                    product_id=media.product_id,
                    alt=media.alt,
                    src=media.src,
                    type=media.type,
                    created_at=media.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    updated_at=media.updated_at.strftime("%Y-%m-%d %H:%M:%S") if media.updated_at else None
                )
                for media in product["media"]
            ]

            product_options = [
                ProductOptionSchema(
                    options_id=option["options_id"],
                    option_name=option["option_name"],
                    items=[
                        ProductOptionItemSchema(
                            item_id=item["item_id"],
                            item_name=item["item_name"]
                        )
                        for item in option["items"]
                    ]
                )
                for option in product["options"]
            ]

            items_with_product.append(
                GuestOrderItemSchema(
                    variant_product_id=item.product_id,
                    quantity=item.quantity,
                    product=ProductSchema(
                        product_id=product["product_id"],
                        product_name=product["product_name"],
                        description=product["description"],
                        status=product["status"],
                        created_at=product["created_at"].strftime("%Y-%m-%d %H:%M:%S"),
                        updated_at=product["updated_at"].strftime("%Y-%m-%d %H:%M:%S") if product["updated_at"] else None,
                        published_at=product["published_at"].strftime("%Y-%m-%d %H:%M:%S") if product["published_at"] else None,
                        options=product_options,
                        variants=product_variants,
                        media=product_media
                    ),
                )
            )

        if not items_with_product:
            logging.error("No items were added to the order.")

        return GuestOrderSchema(
            order_id=order_id,
            total_price=float(total_price),
            status="pending",
            first_name=order_data.first_name,
            last_name=order_data.last_name,
            email=order_data.email,
            address=order_data.address,
            items=items_with_product,
        )