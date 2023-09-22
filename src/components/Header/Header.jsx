import React, { useState } from "react";
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
import "./Header.scss";
import logoImg from "../../assets/svg/logo-risky.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBars,
  faHouse,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logoHeader from "../../assets/svg/logo-header.svg";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { userConnected } = useSelector((state) => state.auth);

  // Determina si la vista actual es la de perfil
  const location = useLocation();
  const isProfileView = location.pathname === "/profile";

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
    onClose();
  };

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);

    if (e.key === "Enter") {
      navigate("/search/" + text);
    }
  };

  return (
    <nav className="nav-container">
      <div className="container-drawer">
        <>
          {/* Elemento de la izquierda */}
          <Link className="btn-drawer-header" onClick={onOpen}>
            <span>MENÚ</span>
          </Link>

          {/* Elemento central: Logo */}
          <div className="menu-center">
            <img src={logoHeader} alt="Logo" className="logo" />
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
    <span>
      <FontAwesomeIcon
        className="color-salmon"
        icon={faUser}
        size="xl"
      />
    </span>
  )}
</div>
        </>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <div className="drawerHeader-logo">
                <img alt="image logo" src={logoImg} />
              </div>
            </DrawerHeader>
            <DrawerBody>
              <nav className="nav-container">
                <div className="search-container">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <input
                    className="search"
                    type="text"
                    onKeyUp={handleChange}
                    placeholder="Search"
                    name="text"
                  />
                </div>
                <div className="links-container">
                  <Link to={"/"} onClick={onClose}>
                    <img
                      className="icon"
                      src={<FontAwesomeIcon icon={faHouse} />}
                      alt="birdHouseIcon"
                    />
                  </Link>
                  {userConnected ? (
                    <>
                      <span>
                        <Link to={`/profile`} onClick={onClose}>
                          Profile{" "}
                        </Link>
                      </span>
                      <span>
                        <Link to={"/addpost"} onClick={onClose}>
                          Add Post{" "}
                        </Link>
                      </span>
                      <span onClick={onLogout}>Logout</span>
                    </>
                  ) : (
                    <>
                      <span>
                        <Link to={"/login"} onClick={onClose}>
                          Login{" "}
                        </Link>
                      </span>
                      <span>
                        <Link to={"/register"} onClick={onClose}>
                          Register{" "}
                        </Link>
                      </span>
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
  );
};

export default Header;
