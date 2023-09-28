import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import BtnTop from "../Tools/BtnTop/BtnTop";
import logoDrawer from "../../assets/svg/logo-drawer.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getUserConnected } from "../../features/auth/authSlice";
import {
  faArrowRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import logoHeader from "../../assets/svg/logo-header.svg";
import LoginForm from "./LoginForm";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userConnected } = useSelector((state) => state.auth);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  useEffect(() => {
    dispatch(getUserConnected());
  }, []);


  const location = useLocation();
  const isProfileView = location.pathname === "/profile";

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
    onClose();
  };

  return (
    <>
      <nav className="nav-container">
        <div className="container-drawer">
          <>
            <Link className="btn-drawer-header" onClick={onOpen}>
              <span>MENÚ</span>
            </Link>
            <div className="menu-center">
              <Link to="/">
                <img src={logoHeader} alt="Logo" className="logo" />
              </Link>
            </div>
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
                    onClick={() => setLoginModalIsOpen(true)}
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
                  <div className="links-container">
                    <Link to={"/"} onClick={onClose}>
                      {" "}
                      Eventos
                    </Link>
                    <span className="line" />
                    <Link
                      to={"/requestevent"}
                      onClick={() => {
                        onClose();
                        setLoginModalIsOpen(true);
                      }}
                    >
                      {" "}
                      Solicitud Eventos
                    </Link>
                    <span className="line" />
                    {userConnected ? (
                      <>
                        <span>
                          <Link to={`/profile`} onClick={onClose}>
                            Mi cuenta
                          </Link>
                        </span>
                        <span className="line" />
                        <span className="logout" onClick={onLogout}>Logout</span>
                        <span className="line" />
                      </>
                    ) : (
                      <>
                        <span className="logout">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              setLoginModalIsOpen(true);
                            }}
                          >
                            Login
                          </button>
                        </span>
                        <span className="line" />
                        <span>
                          <Link to={"/register"} onClick={onClose}>
                            Register{" "}
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
      <Modal isOpen={loginModalIsOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent w="90%" minH="60%">
          <ModalHeader>
            <div className="menu-center">
              <img src={logoHeader} alt="Logo" className="logo" />
            </div>
            <ModalCloseButton onClick={() => setLoginModalIsOpen(false)} />
          </ModalHeader>

          <ModalBody>
            <LoginForm close={() => setLoginModalIsOpen(false)} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Header;
