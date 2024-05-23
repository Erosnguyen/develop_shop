import React, {useEffect, useState} from 'react'
import { getUserInfo, handleUpdateUserInfo } from './userInfomationServices';
import { Button, Chip, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const UserInfo = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserInfo().then((res) => {
            setUserInfo(res.data.user);
        });
    }, []);

    const handleUpdateUserInfomation = async() => {
        try {
            await handleUpdateUserInfo(
                {
                    first_name: userInfo.first_name,
                    last_name: userInfo.last_name
                }
            );
            toast.success('Update user info successfully!');
        } catch (error) {
            toast.error('Update user information failed!');
        }
    }

    const handleChange = (e) => {
        setUserInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }

    console.log(userInfo);

  return (
    <div className="flex items-center justify-center">
      <div className="flex w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
        <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
          <h2 className="text-2xl font-semibold">User Information</h2>
          <form className="flex flex-col gap-4">
            <Input name='first_name' onChange={handleChange} value={userInfo?.first_name} type="text" label="First Name" />
            <Input name='last_name' onChange={handleChange} value={userInfo?.last_name} type="text" label="Last Name" />
            <div className='flex gap-4 items-center'>
                <Input isDisabled className='cursor-not-allowed' value={userInfo?.email} type="email" label="Email" size='sm' />
                <Button size='lg' className='text-sm text-white' color='warning' onClick={() => navigate("change-email")}>Change Email</Button>
            </div>
            <div className='flex gap-4 items-center'>
                <Input isDisabled className='cursor-not-allowed' value="*************" type="password" label="Password" size='sm' />
                <Button size='lg' className='text-sm text-white' color='warning' onClick={() => navigate("change-password")}>Change Password</Button>
            </div>
            <Button onClick={() => handleUpdateUserInfomation()} color='warning' className='text-white'>Save</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
