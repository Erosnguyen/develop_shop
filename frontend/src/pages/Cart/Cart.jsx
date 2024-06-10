import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { getMedia, getOptionName, getVariantPrice } from "../../lib/utils";
import { DeleteIcon } from "../../assets/DeleteIcon";
import {
  getUserOrder,
  handleGetProductDetails,
} from "../../pages/Bill/billServices";
import { fetchApiConfig } from "../../config";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Tooltip,
  Button,
  Tab,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { SelectVariant } from "../../components/Cart/SelectVariant";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    updateSelectedProductinCart
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const [listYourOrders, setListYourOrders] = useState([]);
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const columns = [
    {
      key: "product",
      label: "Product",
    },
    {
      key: "image",
      label: "Image",
    },
    {
      key: "option",
      label: "Variations",
    },
    {
      key: "quantity",
      label: "Quantity",
    },
    {
      key: "price",
      label: "Price",
    },
    {
      key: "remove",
      label: "Delete",
    },
  ];

  const handleSelect = (key) => {
    setSelectedKeys(key);
  }

  const handleBill = () => {
    if (selectedKeys == "all") {
      updateSelectedProductinCart("all");
    }
    else {
      updateSelectedProductinCart([...selectedKeys]);
    }
    navigate("/Bill");
  }

  const handleDecreaseCartQuantity = (data, checkedVariant) => {
    return () => {
      decreaseCartQuantity(data, checkedVariant);
    };
  };

  const handleIncreaseCartQuantity = (data, checkedVariant) => {
    return () => {
      increaseCartQuantity(data, checkedVariant);
    };
  };

  const handleDeleteCart = (data, checkedVariant) => {
    return () => {
      removeFromCart(data, checkedVariant);
    };
  };

  console.log(selectedKeys);

  return (
    <div className="cart mt-10 w-full">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Delete
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this item?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="danger"
                  onPress={onClose}
                  onClick={handleDeleteCart()}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Table
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => handleSelect(keys)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={cartItems} emptyContent={"Giỏ hàng trống"}>
          {cartItems.map((item, idx) => {
            return (
              <TableRow key={idx}>
                <TableCell>
                  <div>
                    <a href={`/product/${item?.product?.product_id}`}>
                      {item?.product?.product_name}
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    src={
                      item?.product?.media != null
                        ? getMedia(
                            item?.product?.product_id,
                            item?.product?.media[0]?.src
                          )
                        : "src/assets/No_Image.png"
                    }
                  />
                </TableCell>
                <TableCell>
                  {item?.product?.options?.length ? (
                    <SelectVariant item={item} />
                  ) : (
                    // <Popover placement="bottom">
                    //   <PopoverTrigger>
                    //     <Button variant="light" size="sm" color="default">
                    //       {getOptionName(
                    //         item?.product?.options,
                    //         item?.product?.variants
                    //       )}
                    //       <svg
                    //         xmlns="http://www.w3.org/2000/svg"
                    //         fill="none"
                    //         viewBox="0 0 24 24"
                    //         strokeWidth="1.5"
                    //         stroke="currentColor"
                    //         className="size-3"
                    //       >
                    //         <path
                    //           strokeLinecap="round"
                    //           strokeLinejoin="round"
                    //           d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    //         />
                    //       </svg>
                    //     </Button>
                    //   </PopoverTrigger>
                    //   <PopoverContent className="p-4">
                    //     {item?.product?.options.map((option, index) => (
                    //       <div
                    //         className="flex gap-4 flex-wrap space-y-2 w-full items-center"
                    //         key={option.options_id}
                    //       >
                    //         <div>{option.option_name}:</div>
                    //         <div className="flex items-center gap-4 flex-wrap">
                    //           {option.items.map((item_option) => (
                    //             <Button
                    //               size="sm"
                    //               variant="flat"
                    //               key={item_option.item_id}
                    //               color={
                    //                 item_option.item_id === item?.product.variants[0]?.option1 || item_option.item_id === item?.product.variants[0]?.option2 || item_option.item_id === item?.product.variants[0]?.option3
                    //                   ? "warning"
                    //                   : "default"
                    //               }
                    //             >
                    //               {item_option.item_name}
                    //             </Button>
                    //           ))}
                    //         </div>
                    //       </div>
                    //     ))}
                    //     <div className="pt-4 space-x-2 flex justify-end w-full">
                    //       {/* <Button variant="flat" size="sm">
                    //         Cancle
                    //       </Button> */}
                    //       <Button
                    //         onClick={() => console.log("Apply")}
                    //         variant="solid"
                    //         size="sm"
                    //         color="warning"
                    //       >
                    //         Apply
                    //       </Button>
                    //     </div>
                    //   </PopoverContent>
                    // </Popover>
                    <></>
                  )}
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center">
                    <button
                      onClick={handleDecreaseCartQuantity(item)}
                      type="button"
                      className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      id="counter-input"
                      data-input-counter
                      className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                      placeholder=""
                      value={item.quantity}
                      required
                    />
                    <button
                      onClick={handleIncreaseCartQuantity(item)}
                      type="button"
                      className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                    >
                      <svg
                        className="w-2.5 h-2.5 text-gray-900 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </TableCell>
                <TableCell>
                  $
                  {getVariantPrice(
                    item?.product?.variants,
                    item?.variant_product_id,
                    item?.quantity
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip color="danger" content="Xoá sản phẩm này?">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Button
                        onClick={() =>
                          removeFromCart(item?.data, item?.variant_product_id)
                        }
                        // onPress={onOpen}
                        isIconOnly
                        color="light"
                      >
                        <DeleteIcon />
                      </Button>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-10">
          <Button onClick={() => handleBill()} color="warning">Thanh Toán</Button>
      </div>
    </div>
  );
};

export default Cart;
