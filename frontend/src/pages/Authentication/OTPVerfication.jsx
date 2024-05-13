import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

const OTPVerification = ({ onVerify }) => {
  const [otp, setOtp] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onVerify(otp);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        label="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button type="submit">Verify OTP</Button>
    </form>
  );
};

export default OTPVerification;