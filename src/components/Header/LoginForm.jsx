import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import Captcha from '../Captcha/Captcha';
import { useNavigate } from 'react-router-dom';
import Turnstile from 'react-turnstile';
import PasswordEye from '../Tools/PasswordEye/PasswordEye';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  Text,
  Input,
  Button,
} from '@chakra-ui/react';
import './LoginForm.scss';

const Login = ({ close = () => {} }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const { isSuccess, isError, message } = useSelector(state => state.auth);
  const [captchaValid, setCaptchaValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Renderizar el Alert
    if (isSuccess) {
      setTimeout(() => {
        close();
        dispatch(reset());
        navigate('/profile');
      }, 1500);
    }

    if (isError) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [isSuccess, isError, message, navigate, dispatch]);

  const onChange = e =>
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const onSubmit = async e => {
    e.preventDefault();
    if (captchaValid) {
      dispatch(login(formData));
    }
  };

  return (
    <>
      <div className="alert-container">
        {isError && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error login user</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {isSuccess && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>User logged successfully</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
      </div>

      <form onSubmit={onSubmit} className="login-form">
        <VStack spacing="3" align="left">
          <Text color="#3c5b90" fontSize="1.2em">
            Correo electrónico
          </Text>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder="Ej: name@domain.com"
            onChange={onChange}
            variant="unstyled"
            required
          />
          <PasswordEye
            label="Contraseña*"
            placeholder="Indica tu contraseña"
            name="password"
            value={password}
            onChange={onChange}
            isRequired
          />
          <a href="./">¿Olvidaste la contraseña?</a>
          <Captcha onVerify={() => setCaptchaValid(true)} />
          <Button mt="8%" className="login-button" type="submit">
            Acceder
          </Button>
          <a href="/register" className="link-register">
            No tengo cuenta
          </a>
        </VStack>
      </form>
    </>
  );
};

export default Login;
//https://chakra-ui.com/docs/components/input
