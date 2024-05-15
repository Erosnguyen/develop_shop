import React, { useState, useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import FoodItem from "../../components/FoodItem/FoodItem";
import { useNavigate } from "react-router-dom";
import { getVariantPrice } from "../../lib/utils";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Button,
  Slider,
  Input,
  Select,
  SelectItem,
  Chip,
} from "@nextui-org/react";

const Shop = () => {
  const { products } = useContext(StoreContext);
  const navigate = useNavigate();

  const [productList, setProductList] = useState(products);
  const [price, setPrice] = useState([0, 1000]);
  const [sort, setSort] = useState(1);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleClick = (path) => {
    navigate(`/product/${path}`);
  };

  const getPriceProduct = (item) => {
    return getVariantPrice(
      item?.variants,
      item?.options ? item?.options[0]?.items[0]?.item_id : "",
      item?.options ? item?.options[1]?.items[0]?.item_id : "",
      item?.options ? item?.options[2]?.items[0]?.item_id : ""
    );
  };

  const handleOnClose = (filterToClose) => {
    setFilter(filter.filter((item) => item !== filterToClose));
    if (filterToClose === "Price") {
      setPrice([0, 1000]);
      setProductList(products);
    }
  };

  const handlePricingRange = () => {
    setProductList(
      products.filter(
        (item) => getPriceProduct(item) >= price[0] && getPriceProduct(item) <= price[1]
      )
    );
    const newFilter = {
      name: "Giá từ ",
      value: [price[0], price[1]], 
    };
    setFilter(prev => {
      const existingFilter = prev.find(item => item.name === newFilter.name);
      
    })
    setFilter([...filter, "Price"]);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    if (e.target.value === 1) {
      setProductList(
        [...productList].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    }
    if (e.target.value === 2) {
      setProductList([...productList].sort((a, b) => a.price - b.price));
    }
    if (e.target.value === 3) {
      setProductList([...productList].sort((a, b) => b.price - a.price));
    }
    setFilter([...filter, "Sort"]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-center bg-slate-100 py-10">
        <h1 className="text-3xl font-semibold">Sản phẩm mới</h1>
      </div>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Trang chủ</BreadcrumbItem>
        <BreadcrumbItem>Cửa Hàng</BreadcrumbItem>
      </Breadcrumbs>
      {/* Filter  */}
      <div className="flex items-center justify-between bg-slate-50 px-4 py-4 rounded-xl">
        <div>
          <h3 className="text-lg font-semibold">
            Cửa Hàng
            <span className="text-gray-400">({productList.length})</span>
          </h3>
        </div>
        <div className="flex items-center space-x-2 ">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">Giá tiền</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem isReadOnly key="new">
                Pricing Range
              </DropdownItem>
              <DropdownItem isReadOnly key="copy">
                <Slider
                  size="sm"
                  value={price}
                  onChange={setPrice}
                  maxValue={1000}
                  minValue={0}
                />
              </DropdownItem>
              <DropdownItem isReadOnly key="edit">
                <div className="flex items-center space-x-2">
                  <Input
                    value={price[0]}
                    onChange={(e) => setPrice([e.target.value, price[1]])}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    min={0}
                    className="w-28"
                    type="number"
                  />
                  <span>-</span>
                  <Input
                    value={price[1]}
                    onChange={(e) => setPrice([price[0], e.target.value])}
                    startContent={
                      <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">$</span>
                      </div>
                    }
                    min={0}
                    className="w-28"
                    type="number"
                  />
                </div>
              </DropdownItem>
              <DropdownItem
                isReadOnly
                key="delete"
                className="text-danger"
                color="danger"
              >
                <div className="flex space-x-2 justify-end">
                  <Button variant="flat" size="small">
                    Cancle
                  </Button>
                  <Button
                    onClick={() => handlePricingRange()}
                    variant="flat"
                    size="small"
                    color="primary"
                  >
                    Apply
                  </Button>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Select
            value={sort}
            onChange={handleSortChange}
            className="w-40"
            variant="bordered"
            defaultSelectedKeys={["1"]}
            placeholder="Sắp xếp"
          >
            <SelectItem key={1}>Mới nhất</SelectItem>
            <SelectItem key={2}>Giá từ thấp đến cao</SelectItem>
            <SelectItem key={3}>Giá từ cao đến thấp</SelectItem>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        {filter.map((item, index) => (
          <Chip key={index} variant="flat" onClose={() => handleOnClose(item)}>
            {item}
          </Chip>
        ))}
      </div>
      {/* Product List  */}
      <div className="food-display-list grid grid-cols-4 mt-[30px] gap-[30px] gap-y-[50px] max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3">
        {productList.map((item, index) => (
          <FoodItem key={index} {...item} handleClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
