import React from 'react'
import {CertificationIcon} from "../../assets/CertificationIcon"
import { CustomerIcon } from '../../assets/CustomerIcon'
import { RefreshIcon } from '../../assets/RefreshIcon'
import { GiftIcon } from '../../assets/GiftIcon'

export const Services = () => {

    const services = [
        {
            icon: <CertificationIcon/>,
            title: "Chất lượng tin cậy",
            content: "Chất lượng được đảm bảo, chứng chỉ giấy phép an toàn vệ sinh thực phẩm đầy đủ.",
        },
        {
            icon: <CustomerIcon/>,
            title: "Hướng đến khách hàng",
            content: "Chúng tôi luôn đặt khách hàng là trung tâm, đảm bảo sự hài lòng cao nhất của khách hàng.",
        },
        {
            icon: <RefreshIcon/>,
            title: "Chính sách đổi trả",
            content: "Chính sách đổi trả linh hoạt, giúp khách hàng dễ dàng thay đổi sản phẩm nếu cần thiết.",
        },
        {
            icon: <GiftIcon/>,
            title: "Quà tặng hấp dẫn",
            content: "Chúng tôi cung cấp những quà tặng độc đáo và hấp dẫn cho khách hàng thân yêu của chúng tôi.",
        },
    ];
    
  return (
    <div className='grid grid-cols-4 gap-4 mt-10'>
        {services.map((item, index) => (
            <div key={index} className='shadow-xl p-4 rounded-lg flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                    <div className='bg-yellow-500/20 rounded-full p-1'>
                        {item.icon}
                    </div>
                    <p className='font-semibold'>{item.title}</p>
                </div>
                <p className='text-gray-500'>{item.content}</p>
            </div>
        ))}
    </div>
  )
}
