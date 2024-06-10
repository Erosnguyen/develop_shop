import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { getMedia, getOptionName, getVariantPrice } from "../../lib/utils";
import {
  getUserOrder,
  handleAddOrder,
  handleProcessingOrder,
  handleDeleteOrder,
  handleGuestOrder,
} from "./billServices";
import MessagePopup from "../../components/MessagePopup/MessagePopup";
import { fetchApiConfig } from "../../config";
import {
  Button,
  Divider,
  Image,
  Input,
  Radio,
  RadioGroup,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
  Chip,
} from "@nextui-org/react";
import { toast } from "react-toastify";

const Bill = ({ product }) => {
  const [showMessage, setShowMessage] = useState({});
  const [listYourOrders, setListYourOrders] = useState([]);
  const variants = product?.variants;
  const [state, setState] = useState({});
  const isUser = localStorage.getItem("access_token") != null;

  const {
    cartItems,
    selectedProduct,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useContext(StoreContext);

  const handleDeleteProductInCart = (data, checkedVariant) => {
    removeFromCart(data, checkedVariant);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const statusColorMap = {
    completed: "success",
    cancel: "danger",
    processing: "primary",
    pending: "warning",
  };

  // const updateVariant = (optionName, itemId) => {
  //   setCheckedVariant((prevVariant) => ({
  //     ...prevVariant,
  //     [optionName]: itemId,
  //   }));
  // };

  const handlePriceProduct = (item) => {
    return getVariantPrice(
      item?.product?.variants,
      item?.variant_product_id,
      item?.quantity
    );
  };

  const totalPrice = () => {
    let total = 0;
    selectedProduct?.forEach((i) => {
      total += handlePriceProduct(i);
    });
    return total.toFixed(2);
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

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      if (
        state?.street == null ||
        state?.city == null ||
        state?.state == null ||
        state?.country == null
      ) {
        toast.error("Please fill in all the information!");
        return;
      } else {
        if (isUser) {
          // xoá order cũ với status pending
          const listOrderPending = listYourOrders.filter(
            (it) => it.status === "pending"
          );
          listOrderPending.forEach((it) => {
            handleDeleteOrder(it.order_id);
          });
          // thêm order mới
          const convertData = {
            order: {
              items: selectedProduct,
            },
            address: {
              street: state?.street || "",
              city: state?.city || "",
              state: state?.state || "",
              country: state?.country || "",
            },
          };
          await handleAddOrder(convertData);
          // xoá cart
          localStorage.removeItem("cartItems");
          // Lấy lại order
          handleGetUserOrder();
          //Update status
          const order = listYourOrders.filter((it) => it.status === "pending");
          await handleProcessingOrder(order[0].order_id);
          toast.success("Order successfully!");
          window.location = "/bill";
        } else {
          const convertData = {
            items: selectedProduct,
            address: {
              street: state?.street || "",
              city: state?.city || "",
              state: state?.state || "",
              country: state?.country || "",
            },
            first_name: state?.first_name || "",
            last_name: state?.last_name || "",
            email: state?.email || "",
          };
          // console.log(convertData)
          await handleGuestOrder(convertData);
          localStorage.removeItem("cartItems");
          toast.success("Order successfully!");
        }
      }
    } catch (error) {
      toast.error("Order failed!");
      console.log(error);
    }
  };

  const handleGetUserOrder = async () => {
    try {
      if (!isUser) return;
      const data = await getUserOrder();
      setListYourOrders(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUserOrder();
  }, []);

  console.log(selectedProduct);

  return (
    <>
      {showMessage?.open && <MessagePopup showMessage={showMessage} />}
      <div className="bill mt-10 grid grid-cols-2 gap-20">
        <div className="bill-left">
          <h2 className="bill-title font-semibold text-xl mb-5">
            Billing Information
          </h2>
          <form action="" className="flex flex-col gap-4">
            {isUser == false && (
              <>
                <Input
                  onChange={handleChange}
                  isRequired
                  name="first_name"
                  type="text"
                  label="First Name"
                />
                <Input
                  onChange={handleChange}
                  isRequired
                  name="last_name"
                  type="text"
                  label="Last Name"
                />
                <Input
                  onChange={handleChange}
                  isRequired
                  name="email"
                  type="email"
                  label="Email"
                />
              </>
            )}
            <Input
              onChange={handleChange}
              isRequired
              name="street"
              type="text"
              label="Street"
            />
            <Input
              onChange={handleChange}
              isRequired
              name="city"
              type="text"
              label="City"
            />
            <Input
              onChange={handleChange}
              isRequired
              name="state"
              type="text"
              label="State"
            />
            <Input
              onChange={handleChange}
              isRequired
              name="country"
              type="text"
              label="Country"
            />
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
            {selectedProduct.map((item, index) => (
              <div key={index} className="flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-2 w-full">
                  <div
                    className={`bg-cover bg-center rounded-xl w-20 h-20 cursor-pointer`}
                    style={{
                      backgroundImage: `url(${
                        item?.product?.media
                          ? getMedia(
                              item?.product?.product_id,
                              item?.product?.media[0]?.src
                            )
                          : "src/assets/No_Image.png"
                      })`,
                    }}
                  />
                  <div>
                    <a
                      href={`/product/${item?.product?.product_id}`}
                      className="font-medium text-foreground underline-offset-4 hover:underline hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      {item?.product?.product_name}
                    </a>
                    <p>
                      {item?.product?.options.length > 0 && (
                        <p className="text-sm">
                          Variantion :
                          {getOptionName(
                            item?.product?.options,
                            item?.product?.variants
                          )}
                        </p>
                      )}
                    </p>
                    <p className="font-medium text-foreground">
                      $
                      {getVariantPrice(
                        item?.product?.variants,
                        item?.variant_product_id
                      )}{" "}
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
          {selectedProduct.length > 0 && (
            <>
              <div className="flex justify-between items-center font-medium text-foreground py-4">
                <p>Total</p>
                <p>${totalPrice()}</p>
              </div>
              <Button
                className="text-white"
                onClick={handleOrder}
                radius="sm"
                fullWidth
                color="warning"
              >
                Thanh Toán
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="cart mt-10 w-full">
        <h2 className="bill-title font-semibold text-xl mb-5">
          List your orders
        </h2>

        {/* <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={cartItems} emptyContent={"Bạn chưa đặt hàng!"}>
            {listYourOrders
              ?.filter((it) => it.status !== "pending")
              .map((i, x) => {
                return (
                  <TableRow key={x}>
                    <TableCell>{x + 1}</TableCell>
                    <TableCell>
                      <Chip
                        className="capitalize"
                        color={statusColorMap[i?.status]}
                        size="sm"
                        variant="flat"
                      >
                        {i?.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      {i?.created_at && new Date(i.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>${i?.total_price || 0}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table> */}
        <div className="">
          {listYourOrders
            ?.filter((it) => it.status !== "pending")
            .reverse()
            .map((order, index) => (
              <div key={index} className="mb-4 shadow-md p-4">
                <div className="flex justify-end space-x-4">
                  <div>
                    {order.address.street !== ""
                      ? order.address.street +
                        ", " +
                        order.address.city +
                        ", " +
                        order.address.state +
                        ", " +
                        order.address.country +
                        " | "
                      : ""}
                  </div>
                  <div>
                    {/* <p className="uppercase">{order.status}</p> */}
                    <Chip
                      className="uppercase"
                      color={statusColorMap[order?.status]}
                      size="sm"
                      variant="flat"
                    >
                      {order?.status}
                    </Chip>
                  </div>
                </div>
                {order?.items?.map((item, index) => (
                  <div key={index} className="items-center gap-2 w-full">
                    <div className="flex items-center gap-2 w-full p-2">
                      <div className="flex items-center gap-2 w-full">
                        <div
                          className={`bg-cover bg-center rounded-xl w-20 h-20 cursor-pointer`}
                          style={{
                            backgroundImage: `url(${
                              item?.product?.media
                                ? getMedia(
                                    item?.product?.product_id,
                                    item?.product?.media[0]?.src
                                  )
                                : "src/assets/No_Image.png"
                            })`,
                          }}
                        />
                        <div>
                          <a
                            href={`/product/${item.product.product_id}`}
                            className="font-medium text-foreground underline-offset-4 hover:underline hover:opacity-80 transition-opacity cursor-pointer"
                          >
                            {item.product.product_name}
                          </a>
                          {item?.product?.options.length > 0 && (
                            <p className="text-sm">
                              Variantion :
                              {getOptionName(
                                item?.product?.options,
                                item.product.variants
                              )}
                            </p>
                          )}
                          <p className="font-medium text-foreground">
                            $
                            {getVariantPrice(
                              item.product.variants,
                              item.variant_product_id
                            )}{" "}
                            <span className="text-gray-400 font-normal">
                              x {item.quantity}
                            </span>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Divider orientation="horzital" />
                  </div>
                ))}
                <div className="flex justify-end mt-4">
                  <div className="flex space-x-4 items-center">
                    <p>Order Total:</p>
                    <p className="text-xl font-semibold">
                      ${order.total_price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Bill;
