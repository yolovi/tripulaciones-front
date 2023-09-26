<<<<<<< Updated upstream
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import "./Login.scss";
=======
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
// import {
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
// } from "@chakra-ui/react";
import './Login.scss';
>>>>>>> Stashed changes
// import petsSperience from "../../assets/images/Petspierince1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAt,
  faCamera,
  faFaceSmile,
  faLock,
  faMobile,
} from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
<<<<<<< Updated upstream
 const { isSuccess, isError, message } = useSelector((state) => state.auth);
=======
  // const { isSuccess, isError, message } = useSelector((state) => state.auth);
>>>>>>> Stashed changes

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Renderizar el Alert

    if (isSuccess) {
      setTimeout(() => {
        navigate("/profile");
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

  const onSubmit = e => {
    e.preventDefault();
    dispatch(login(formData));
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

      <div className="container-login">
        <div className="card-login">
          <div className="form-data">
            <form className="form" onSubmit={onSubmit}>
              <p id="heading">Correo electrónico*</p>
              <div className="field">
                <FontAwesomeIcon icon={faAt} style={{ color: '#3c5b90' }} />
                <input
                  className="input-field"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="EJ: pepito@pepito.com"
                  onChange={onChange}
                  required
                />
              </div>
              <p id="heading">Contraseña*</p>
              <div className="field">
                <p></p>
                <FontAwesomeIcon icon={faLock} style={{ color: '#3c5b90' }} />
                <input
                  className="input-field"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Indica tu contraseña"
                  onChange={onChange}
                  required
                />
              </div>
              <a href="./">¿Olvidaste la contraseña?</a>
              <div className="container-btn">
                <button className="button1" type="submit">
                  Acceder
                </button>
                <a href="./register" className="link-register">
                  No tengo cuenta
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
