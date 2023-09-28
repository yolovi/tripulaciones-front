import React, { useEffect, useState } from 'react';
import authService from '../../features/auth/authService';
import Turnstile from 'react-turnstile';

const Captcha = ({ onVerify = () => {} }) => {
  const [tunstileApiKey, setTunstileApiKey] = useState();

  useEffect(() => {
    authService.turnstileKey().then(key => setTunstileApiKey(key));
  }, []);

  return (
    <>
      {tunstileApiKey && (
        <Turnstile sitekey={tunstileApiKey} onVerify={() => onVerify()} />
      )}
    </>
  );
};

export default Captcha;
