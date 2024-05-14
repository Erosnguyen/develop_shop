import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { getVariantPrice } from "../../lib/utils";
import { getUserOrder, handleAddOrder } from "./billServices";
import MessagePopup from "../../components/MessagePopup/MessagePopup";
import { Button, Divider, Image, Input, Radio, RadioGroup, Tab, Table, TableHeader, TableColumn, TableCell, TableRow, TableBody, Chip } from "@nextui-org/react";
import { toast } from "react-toastify";

const Bill = ({ product }) => {
  const [showMessage, setShowMessage] = useState({});
  const [listYourOrders, setListYourOrders] = useState([]);
  const variants = product?.variants;

  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useContext(StoreContext);
  console.log("Cart Items: ", cartItems);

  const handleDeleteProductInCart = (data, checkedVariant) => {
    removeFromCart(data, checkedVariant);
  };

  const statusColorMap = {
    completed: "success",
    cancel: "danger",
    pending: "warning",
  };

  const updateVariant = (optionName, itemId) => {
    setCheckedVariant((prevVariant) => ({
      ...prevVariant,
      [optionName]: itemId,
    }));
  };

  const handlePriceProduct = (item) => {
    return getVariantPrice(
      item?.data?.variants,
      item.data.checkedVariant.option1,
      item.data.checkedVariant.option2,
      item.data.checkedVariant.option3
    );
  };

  const totalPrice = () => {
    let total = 0;
    cartItems?.forEach((i) => {
      total += handlePriceProduct(i);
    });
    return total.toFixed(2);
  };

  const convertDataSubmit = (data = []) => {
    return {
      items: data?.map((i) => {
        return {
          variant_product_id: i?.data?.variants?.length
            ? i?.data?.variants[0]?.variant_id
            : null,
          quantity: i?.quantity,
        };
      }),
    };
  };

  const columns = [
    {
      key: "id",
      label: "STT",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "created_at",
      label: "Time Ordered",
    },
    {
      key: "total_price",
      label: "Total Price",
    },
  ];

  const handleOrder = async(e) => {
    e.preventDefault();
    try {
      let dataSubmit = convertDataSubmit(cartItems);
      const data = await handleAddOrder(dataSubmit);
      if (data?.status === 201) {
        cartItems?.forEach((i) => {
          handleDeleteProductInCart(i.data, i.data.checkedVariant);
        });
        handleGetUserOrder();
      }
      toast.success("Order successfully!");
    } catch (error) {
      toast.error("Order failed!");
      console.log(error);
    }
  }

  const handleGetUserOrder = async () => {
    try {
      const data = await getUserOrder();
      setListYourOrders(data?.data || []);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetUserOrder();
  }, []);

  return (
    <>
      {showMessage?.open && <MessagePopup showMessage={showMessage} />}
      <div className="bill mt-10 grid grid-cols-2 gap-20">
        <div className="bill-left">
          <h2 className="bill-title font-semibold text-xl mb-5">
            Billing Information
          </h2>
          <form action="" className="flex flex-col gap-4">
            <Input isRequired type="text" label="Fullname"/>
            <Input isRequired type="text" label="Adress"/>            
            <Input isRequired type="text" label="Phone number"/>
            <Input type="text" label="Note"/>
            <RadioGroup label="Payment Method">
              <Radio value="bank">Bank Transfer</Radio>
              <Radio value="cash">Pay cash upon delivery</Radio>
            </RadioGroup>
          </form>
        </div>

        <div className="bill-right">
          <h2 className="font-semibold text-xl mb-5">Your order</h2>
          <Divider orientation="horzital" />
          <div>
            {cartItems?.map((item, index) => (
              <div key={index} className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={`bg-cover bg-center rounded-xl w-20 h-20 cursor-pointer`}
                    style={{
                      backgroundImage: `url(${
                        item?.data?.media
                          ? item?.data?.media[0]?.src
                          : "/src/assets/No_Image.png"
                      })`,
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-foreground underline-offset-4 hover:underline hover:opacity-80 transition-opacity cursor-pointer">
                      {item.data.product_name}
                    </h3>
                    <p>
                      {item.data.checkedVariant.option1} -{" "}
                      {item.data.checkedVariant.option2} -{" "}
                      {item.data.checkedVariant.option3}
                    </p>
                    <p className="font-medium text-foreground">
                      ${handlePriceProduct(item)}{" "}
                      <span className="text-gray-400 font-normal">
                        x {item.quantity}
                      </span>{" "}
                    </p>
                  </div>
                </div>
                <Divider orientation="horzital" />
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="flex justify-between items-center font-medium text-foreground py-4">
                <p>Total</p>
                <p>${totalPrice()}</p>
              </div>
              <Button className="text-white" onClick={handleOrder} radius="sm" fullWidth color="warning">
                Order
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="cart mt-10 w-full">
        <h2 className="bill-title font-semibold text-xl mb-5">
          List your orders
        </h2>

        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={cartItems} emptyContent={"Bạn chưa đặt hàng!"}>
            {
              listYourOrders?.map((i, x) => {
                return (
                  <TableRow key={x}>
                    <TableCell>{x+1}</TableCell>
                    <TableCell>
                      <Chip className="capitalize" color={statusColorMap[i?.status]} size="sm" variant="flat">
                        {i?.status}
                      </Chip>
                    </TableCell>
                    <TableCell>{i?.created_at && new Date(i.created_at).toLocaleString()}</TableCell>
                    <TableCell>${i?.total_price || 0}</TableCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Bill;
