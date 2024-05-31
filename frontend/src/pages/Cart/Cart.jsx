import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";
import { getVariantPrice } from "../../lib/utils";
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
} from "@nextui-org/react";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useContext(StoreContext);

  const [listYourOrders, setListYourOrders] = useState([]);
  const [product, setProduct] = useState([]);
  const [productId, setProductId] = useState([]);

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
    // {
    //   key: "remove",
    //   label: "Xóa",
    // },
  ];

  const handleGetOrder = async () => {
    try {
      const res = await getUserOrder();
      setListYourOrders(res.data.filter((item) => item.status === "pending"));
    } catch (error) {
      console.log(error);
    }
  };

  const getProductDetail = async (variant_id) => {
    try {
      const response = await handleGetProductDetails(variant_id);
      return response;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error("Error occurred:", error);
      throw error; // Đưa lỗi ra ngoài để xử lý ở nơi gọi hàm
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, []);


  useEffect(() => {
    async function fetchData() {
      const details = await Promise.all(listYourOrders.map((item) => getProductDetail(item.items[0].product_id)));
      setProduct(details) 
    }
    fetchData();
  }, [listYourOrders]); 

  // console.log(product)
  console.log(listYourOrders)

  return (
    <div className="cart mt-10 w-full">
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={listYourOrders} emptyContent={"Giỏ hàng trống"}>
          {listYourOrders.map((item, idx) => {
            

            return (
              <TableRow key={idx}>
                <TableCell>{product[idx]?.product_name}</TableCell>
                <TableCell>
                  <Image
                    width={100}
                    height={100}
                    src={
                      product[idx]?.media != null
                        ? product[idx]?.media[0]?.src
                        : "src/assets/No_Image.png"
                    }
                  />
                </TableCell>
                <TableCell>{item?.items[0]?.quantity}</TableCell>
                <TableCell>${item?.total_price}</TableCell>
                {/* <TableCell>
                  <Tooltip color="danger" content="Xoá sản phẩm này?">
                    <span className="text-lg text-danger cursor-pointer active:opacity-50">
                      <Button isIconOnly color="light">
                        <DeleteIcon />
                      </Button>
                    </span>
                  </Tooltip>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="flex justify-end mt-10">
        <Link to="/Bill">
          <Button color="warning">Thanh Toán</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
