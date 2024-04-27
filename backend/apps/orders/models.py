from tortoise import fields
from tortoise.models import Model


class Order(Model):
    order_id = fields.IntField(pk=True)
    customer_id = fields.IntField()
    total_price = fields.DecimalField(max_digits=10, decimal_places=2)
    status = fields.CharField(max_length=50)

    items: fields.ReverseRelation["OrderItem"]

    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "orders"


class OrderItem(Model):
    item_id = fields.IntField(pk=True)
    order = fields.ForeignKeyField("models.Order", related_name="items")
    product_id = fields.IntField()
    quantity = fields.IntField()

    created_at = fields.DatetimeField(auto_now_add=True)
    updated_at = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "order_items"
