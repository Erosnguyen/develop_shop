import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React, {useEffect, useState, useContext} from "react";
import { getOptionName } from "../../lib/utils";
import { fetchApiConfig } from "../../config";
import { StoreContext } from "../../context/StoreContext";

export const SelectVariant = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [variants, setVariants] = useState(item?.product?.variants);
    const [checkedVariant, setCheckedVariant] = useState({
        option1: item?.product?.variants[0]?.option1,
        option2: item?.product?.variants[0]?.option2,
        option3: item?.product?.variants[0]?.option3,
    })

    const {
      updateOption,
    } = useContext(StoreContext);

    useEffect(() => {
        getProductDetail(item?.product.product_id);
    }, []);
    
    const getProductDetail = async(product_id) => {
      try {
        const res = await fetchApiConfig(`products/${product_id}`)
        setVariants(res.product.variants);
        // console.log(res.product.variants)
      } catch (error) {
        console.log(error)
      }
        
    }

    const handleCancel = () => {
        setIsOpen(false);
        setCheckedVariant({
            option1: item?.product?.variants[0]?.option1,
            option2: item?.product?.variants[0]?.option2,
            option3: item?.product?.variants[0]?.option3,
        })
    }

    const handleApply = () => {
        updateOption(variants, checkedVariant, item?.variant_product_id);
        setIsOpen(false);
    }

    const updateVariant = (optionName, itemId) => {
        setCheckedVariant((prevVariant) => ({
          ...prevVariant,
          [optionName]: itemId,
        }));
      };
    
      const handleChecked = (itemId, optionName) => {
        updateVariant(optionName, itemId);
      };


  // console.log(variants);
  return (
    <>
      <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} placement="bottom">
        <PopoverTrigger>
          <Button variant="light" size="sm" color="default">
            {getOptionName(item?.product?.options, item?.product?.variants)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4">
          {item?.product?.options?.map((option, index) => (
            <div
              className="flex gap-4 flex-wrap space-y-2 w-full items-center"
              key={option.options_id}
            >
              <div>{option.option_name}:</div>
              <div className="flex items-center gap-4 flex-wrap">
                {option.items.map((item_option, idx) => (
                  <Button
                    size="sm"
                    variant="flat"
                    key={item_option.item_id}
                    onClick={() =>
                        handleChecked(item_option.item_id, "option" + (index + 1))
                      }
                    color={
                      item_option.item_id === checkedVariant.option1 ||
                        item_option.item_id === checkedVariant.option2 ||
                        item_option.item_id === checkedVariant.option3
                        ? "warning"
                        : "default"
                    }
                  >
                    {item_option.item_name}
                  </Button>
                ))}
              </div>
            </div>
          ))}
          <div className="pt-8 space-x-2 flex justify-end w-full">
            <Button variant="flat" size="sm" onClick={() => handleCancel()}>
              Cancle
            </Button>
            <Button
              onClick={() => handleApply()}
              variant="solid"
              size="sm"
              color="warning"
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
