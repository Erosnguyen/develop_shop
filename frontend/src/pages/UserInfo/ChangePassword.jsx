import { Input, Button } from '@nextui-org/react';
import React, {useState} from 'react'
import { handleUpdatePassword } from './userInfomationServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const ChangePassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async() => {
        let res
        try {
            res = await handleUpdatePassword(
                {
                    current_password: password,
                    password: newPassword,
                    password_confirm: confirmPassword
                }
            );
            toast.success('Changed password successfully!');
            navigate('/information');
        } catch (error) {
            toast.error(res?.response?.data?.detail)
            console.log(error);
        }
    }
        
    console.log(password, newPassword, confirmPassword)


  return (
    <div className="flex items-center justify-center">
      <div className="flex w-screen items-center justify-center p-2 sm:p-4 lg:p-8">
        <div className="flex w-full max-w-lg flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-large">
          <h2 className="text-2xl font-semibold">Change Password</h2>
          <form className="flex flex-col gap-4">
            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" label="Current Password" />
            <Input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" label="New Password" />
            <Input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" label="Confirm Password" />
            <Button onClick={() => handleChangePassword()} color='warning' className='text-white'>Save</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
