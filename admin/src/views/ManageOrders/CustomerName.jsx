import React, {useEffect, useState} from 'react'
import { getCustomerById } from './ManageOrdersServices';


const CustomerName = ({customerId}) => {
    const [customerName, setCustomerName] = useState('')

    const getCustomerName = async () => {
        try {
            const res = await getCustomerById(customerId);
            setCustomerName(res?.data?.user?.first_name +  ' ' + res?.data?.user?.last_name)
            console.log(res.data.user.first_name)
        } catch (error) {
            console.error(`Failed to get customer name by id: ${error}`);
            return null;
        }
    }

    useEffect(() => {
        getCustomerName();
    }, [])

  return (
    <p>
        {customerName !== "null null" &&  customerName }
    </p>
  )
}

export default CustomerName