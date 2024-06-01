from contextlib import contextmanager

from apps.products.services import ProductService
from config.database import DatabaseManager

from .models import Guest_Order, Guest_OrderItem
from .schemas import (GuestAddressSchema, GuestOrderCreateSchema,
                      GuestOrderItemSchema, GuestOrderSchema)


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
                continue
            price = variant["price"]
            total_price += price * quantity
            order_item = Guest_OrderItem(product_id=variant_id, quantity=quantity)
            order_items.append(order_item)

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

        return GuestOrderSchema(
            order_id=order_id,
            total_price=float(total_price),
            status="pending",
            first_name=order_data.first_name,
            last_name=order_data.last_name,
            email=order_data.email,
            address=order_data.address,
            items=[
                GuestOrderItemSchema(
                    variant_product_id=item.product_id, quantity=item.quantity
                )
                for item in order_items
            ],
        )
