import React from 'react'
import { handleAddOrder } from '../pages/Bill/billServices';
import { toast } from 'react-toastify';

const getVariant = (data, checkedVariant) => {
    return data.variants.find(
        (variant) =>
            variant.option1 === checkedVariant.option1 &&
            variant.option2 === checkedVariant.option2 &&
            variant.option3 === checkedVariant.option3
    );
}

const ConvertData = (data, checkedVariant, quantity) => {
    const variant = getVariant(data, checkedVariant);
    return {
        items: [
            {
                "variant_product_id": variant.variant_id,
                "quantity": quantity
            }
        ]
    }
}

 export async function AddCart(data, checkedVariant, quantity) {
    try {
        const res = await handleAddOrder(ConvertData(data, checkedVariant, quantity))
        // console.log(ConvertData(data, checkedVariant, quantity))
        // console.log(checkedVariant)
        console.log(res)
        toast.success("Add to cart successfully!")
    } catch (error) {
     console.log(error)   
    }
 }


 