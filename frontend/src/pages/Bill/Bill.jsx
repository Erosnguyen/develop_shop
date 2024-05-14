import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { getVariantPrice } from "../../lib/utils";
import { getUserOrder, handleAddOrder } from "./billServices";
import MessagePopup from "../../components/MessagePopup/MessagePopup";

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

  const handleDeleteProductInCart = (data) => {
    removeFromCart(data);
  };

  const [checkedVariant, setCheckedVariant] = useState({
    color: variants?.[0]?.option1,
    material: variants?.[0]?.option2,
    size: variants?.[0]?.option3,
  });

  useEffect(() => {
    setCheckedVariant({
      color: variants?.[0]?.option1,
      material: variants?.[0]?.option2,
      size: variants?.[0]?.option3,
    });
  }, [product]);

  const updateVariant = (optionName, itemId) => {
    setCheckedVariant((prevVariant) => ({
      ...prevVariant,
      [optionName]: itemId,
    }));
  };

  const handleChecked = (itemId, optionName) => {
    updateVariant(optionName, itemId);
  };

  //lấy giá tiền của variant theo màu, hình thức, kiểu

  const priceProduct = (data) => {
    let currentVari = data?.data?.checkedVariant;
    let exitItem = data?.data?.variants?.find(i => (i.option1 === currentVari?.color) && (i.option2 === currentVari?.material) && (i.option3 === currentVari?.size));
    if (exitItem) {
      return (exitItem?.price * data?.quantity) + "$";
    } else {
      return "0$";
    }
  };

  const convertDataSubmit = (data = []) => {
    return {
      items: data?.map(i => {
        return {
          variant_product_id: i?.data?.variants?.length ? i?.data?.variants[0]?.variant_id : null,
          quantity: i?.quantity
        }
      })
    }
  }
  const handleAddBill = async (e) => {
    e.preventDefault();
    try {
      let dataSubmit = convertDataSubmit(cartItems);
      const data = await handleAddOrder(dataSubmit);
      if (data?.status === 201) {
        cartItems?.forEach(i => {
          handleDeleteProductInCart(i)
        })
        handleGetUserOrder();
      }
      setShowMessage((pre) => ({ ...pre, open: true, text: "Đặt hàng thành công!" }))

      setTimeout(() => {
        setShowMessage((pre) => ({ ...pre, open: false, text: "" }))
      }, 2000)
    } catch (error) {

    }
  }

  const handleGetUserOrder = async () => {
    try {
      const data = await getUserOrder();
      setListYourOrders(data?.data || [])
    } catch (error) {

    }
  }

  useEffect(() => {
    handleGetUserOrder()
  }, [])
  return (
    <>
      {showMessage?.open && <MessagePopup showMessage={showMessage} />}
      <div className="bill mt-10 grid grid-cols-2 gap-20">

        <div className="bill-left">
          <h2 className="bill-title font-semibold text-[40px] mb-5">
            Billing Information
          </h2>
          <form action="">
            <div className="">
              <input
                type="text"
                className="border divide-solid border-gray-500 leading-10 w-full"
                placeholder="Name"
              />
            </div>

            <div className=" mt-8">
              <input
                type="text"
                className="border divide-solid border-gray-500 leading-10 w-full"
                placeholder="Address"
              />
            </div>

            <div className=" mt-8">
              <input
                type="text"
                className="border divide-solid border-gray-500 leading-10 w-full"
                placeholder="Enter your phone number"
              />
            </div>

            <div className=" mt-8">
              <input
                type="text"
                className="border divide-solid border-gray-500 leading-10 w-full"
                placeholder="Enter your email address"
              />
            </div>

            <div className=" mt-8">
              <textarea
                className="border divide-solid border-gray-500 leading-10 w-full"
                name="Notes about orders"
                id=""
                placeholder="Notes about orders"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="bill-right">
          <h2 className="font-semibold text-[40px] mb-5">Your order</h2>
          <div>
            {cartItems?.map((item) => (
              <div>
                <div className="flex justify-between mt-10">
                  <div>
                    <p className="font-semibold">PRODUCT</p>
                    <div>
                      {item.data.product_name} x {item.quantity}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">PROVISIONAL</p>
                    <div className="font-semibold">{priceProduct(item)}</div>
                  </div>
                </div>
                <div className="flex justify-between mt-10">
                  <div>
                    <p className="font-semibold">Total</p>
                  </div>
                  <div className="font-semibold">{priceProduct(item)}</div>
                </div>
                <div>
                  <div class="flex items-center mb-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="mr-3"
                    />
                    <label for="default-radio-1" class="">
                      Bank transfer
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      checked
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      class="mr-3"
                    />
                    <label for="default-radio-2" class="">
                      Pay cash upon delivery
                    </label>
                  </div>
                </div>
                <button className="bg-amber-700 px-6 py-4 text-white mt-10" onClick={handleAddBill}>
                  Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cart mt-10 w-full">
        <h2 className="bill-title font-semibold text-[40px] mb-5">
          List your orders
        </h2>
        <table className="table-fixed w-full">
          <thead>
            <tr className="text-[#49557e]">
              <th className="border divide-solid border-amber-700" style={{ width: 100 }}>ORDER ID</th>
              <th className="border divide-solid border-amber-700">STATUS</th>
              <th className="border divide-solid border-amber-700">CREATED AT</th>
              <th className="border divide-solid border-amber-700">TOTAL PRICE</th>
            </tr>
          </thead>

          <tbody className="">
            {listYourOrders?.map((i, x) => {
              return (
                <tr key={x} className="text-center">
                  <td className="border divide-solid border-amber-700" style={{ width: 100 }} >
                    {i?.id}
                  </td>

                  <td className="border divide-solid border-amber-700">
                    {i?.status}
                  </td>
                  <td className="border divide-solid border-amber-700">
                    {i?.created_at}
                  </td>
                  <td className="border divide-solid border-amber-700">
                    {i?.total_price || 0}$
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bill;