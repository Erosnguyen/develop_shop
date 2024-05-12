import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { getVariantPrice } from "../../lib/utils";
import { DeleteIcon } from "../../assets/DeleteIcon";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Tooltip,
  Button
} from "@nextui-org/react";

const Cart = ({ product }) => {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useContext(StoreContext);

  const columns = [
    {
      key: "product",
      label: "Sản phẩm",
    },
    {
      key: "image",
      label: "Hình ảnh",
    },
    {
      key: "quantity",
      label: "Số lượng",
    },
    {
      key: "price",
      label: "Giá tiền",
    },
    {
      key: "remove",
      label: "Xóa",
    },
  ];

  const handleDeleteProductInCart = (data) => {
    removeFromCart(data);
  };

  console.log("Cart Items: ", cartItems);

  return (
    <div className="cart mt-10 w-full">
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={cartItems} emptyContent={"Giỏ hàng trống"}>
          {cartItems?.map((item) => (
            <TableRow key={item.data.product_id}>
              <TableCell>{item.data.product_name}</TableCell>
              <TableCell>
                <Image width={100} height={100} src={item.data.media ? item.data.media[0].src : ""} />
              </TableCell>
              <TableCell>
              <div className="relative flex items-center">
                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                    </svg>
                </button>
                <input type="text" id="counter-input" data-input-counter className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center" placeholder="" value={item.quantity} required />
                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                    </svg>
                </button>
               </div>  
              </TableCell>
              <TableCell>
                {getVariantPrice(
                  item?.data?.variants,
                  item?.data?.checkedVariant.color,
                  item?.data?.checkedVariant.material,
                  item?.data?.checkedVariant.size,
                  item?.quantity
                )}
              </TableCell>
              <TableCell>
                <Tooltip color="danger" content="Xoá sản phẩm này?">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <Button isIconOnly color="light" onClick={() => handleDeleteProductInCart(item.data)}>
                      <DeleteIcon />
                    </Button>
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-10">
        <Link to="/Bill">
          <Button color="warning">
            Thanh Toán
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
