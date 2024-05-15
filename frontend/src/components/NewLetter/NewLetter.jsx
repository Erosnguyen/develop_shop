import { Button, Input } from '@nextui-org/react'
import React from 'react'

export const NewLetter = () => {
  return (
    <div className='flex gap-20 p-10 bg-[#050713] text-white rounded-lg mt-10 items-center'>
        <div className='w-1/2 space-y-8'>
            <h1 className='font-bold text-4xl'>
                Đăng ký nhận ưu đãi
            </h1>
            <p className='font-medium text-gray-400'>
                Đăng ký để nhận thông báo về những ưu đãi mới nhất từ chúng tôi một cách sớm nhất có thể.
            </p>
        </div>
        <div className='w-1/2 space-y-4'>
            <div className='flex items-center space-x-2'>
                <Input size='sm' type="email" label="Email"/>
                <Button size='lg' className=" text-white" color="warning">Gửi</Button>
            </div>
            <p className='text-sm text-gray-400'>Chúng tôi bảo vệ quyền riêng tư dữ liệu khách hàng!</p>
        </div>
    </div>
  )
}
