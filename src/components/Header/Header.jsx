import React, { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  WrapItem,
  Avatar,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import BtnTop from '../Tools/BtnTop/BtnTop';
import logoDrawer from '../../assets/svg/logo-drawer.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUserConnected } from '../../features/auth/authSlice';
import {
  faArrowRightFromBracket,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import logoHeader from '../../assets/svg/logo-header.svg';
import LoginForm from './LoginForm';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userConnected } = useSelector(state => state.auth);
  const [loginModalIsOpen, setLogoinModalIsOpen] = useState(false);
  useEffect(() => {
    dispatch(getUserConnected());
  }, []);

  // Determina si la vista actual es la de perfil
  const location = useLocation();
  const isProfileView = location.pathname === '/profile';

  const onLogout = e => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
    onClose();
  };

  //TODO: searchbar se queda o se quita del menu lateral
  // const [text, setText] = useState("");

  // const handleChange = (e) => {
  //   setText(e.target.value);

  //   if (e.key === "Enter") {
  //     navigate("/search/" + text);
  //   }
  // };

  return (
    <>
      <nav className="nav-container">
        <div className="container-drawer">
          <>
            {/* Elemento de la izquierda */}
            <Link className="btn-drawer-header" onClick={onOpen}>
              <span>MENÚ</span>
            </Link>

            {/* Elemento central: Logo */}
            <div className="menu-center">
              <Link to="/">
                <img src={logoHeader} alt="Logo" className="logo" />
              </Link>
            </div>

            {/* Elemento de la derecha */}

            {/* Elemento de la derecha */}
            <div className="menu-right">
              {userConnected ? (
                isProfileView ? (
                  <span onClick={onLogout}>
                    <FontAwesomeIcon
                      className="color-salmon"
                      icon={faArrowRightFromBracket}
                      size="xl"
                    />
                  </span>
                ) : (
                  <span>
                    <Link to={`/profile`} onClick={onClose}>
                      <WrapItem>
                        <Avatar
                          className="avatar"
                          size="md"
                          name="Avatar del usuario"
                          src={userConnected.avatar_url}
                        />
                      </WrapItem>
                    </Link>
                  </span>
                )
              ) : (
                <span className="login-header">
                  <FontAwesomeIcon
                    className="color-salmon"
                    icon={faUser}
                    size="xl"
                    onClick={() => setLogoinModalIsOpen(true)}
                  />
                </span>
              )}
            </div>
          </>

          <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                <div className="drawer-logo">
                  <img alt="image logo" src={logoDrawer} />
                </div>
              </DrawerHeader>
              <DrawerBody>
                <nav className="nav-container">
                  {/*<div className="search-container">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input
                      className="search"
                      type="text"
                      onKeyUp={handleChange}
                      placeholder="Search"
                      name="text"
                    />
              </div>*/}
                  <div className="links-container">
                    <Link to={'/'} onClick={onClose}>
                      {' '}
                      Eventos
                    </Link>
                    <span className="line" />
                    <Link
                      to={'/requestevent'}
                      onClick={() => {
                        onClose();
                        setLogoinModalIsOpen(true);
                      }}
                    >
                      {' '}
                      Solicitud Eventos
                    </Link>
                    <span className="line" />
                    {userConnected ? (
                      <>
                        <span>
                          <Link to={`/profile`} onClick={onClose}>
                            Mi cuenta
                          </Link>
                          <span className="line" />
                        </span>
                        {/* <span>
                        <Link to={"/addpost"} onClick={onClose}>
                          Add Post{" "}
                        </Link>
                      </span> */}
                        <span onClick={onLogout}>Logout</span>
                        <span className="line" />
                      </>
                    ) : (
                      <>
                        <span>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              setLogoinModalIsOpen(true);
                            }}
                          >
                            Login
                          </button>
                        </span>
                        <span className="line" />
                        <span>
                          <Link to={'/register'} onClick={onClose}>
                            Register{' '}
                          </Link>
                        </span>
                        <span className="line" />
                      </>
                    )}
                  </div>
                </nav>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
        <BtnTop />
      </nav>
      <Modal isOpen={loginModalIsOpen}>
        <ModalOverlay />
        <ModalContent w="90%" minH="60%">
          <ModalHeader>
            <div className="menu-center">
              <img src={logoHeader} alt="Logo" className="logo" />
            </div>
            <ModalCloseButton onClick={() => setLogoinModalIsOpen(false)} />
          </ModalHeader>

          <ModalBody>
            <LoginForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Header;
