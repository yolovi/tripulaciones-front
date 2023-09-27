import React, { useEffect } from "react";
import "./CartEvents.scss";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../../features/events/eventsSlice";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../../utils/utils";
import { useDisclosure } from "@chakra-ui/hooks";
import { Button } from "@chakra-ui/button";
import { getUserConnected } from "../../../features/auth/authSlice";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { WrapItem } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";

const CartEvents = () => {
  const { event, isLoading } = useSelector((state) => state.events);
  const { userConnected } = useSelector((state) => state.auth);
  const { _id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getById(_id));
    dispatch(getUserConnected());
  }, [_id, dispatch]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <h2 className="carrito-h2">
        Carrito{" "}
        <span className="flecha-izq">
          <FontAwesomeIcon icon={faChevronLeft} />
        </span>
      </h2>
      <div key={_id}>
        <div className="tarjeta-evento-carrito">
          <div className="evento-carrito">
            <div className="contenido-evento-carrito">
              <div className="img-evento-carrito">
                <img src={event.image_url} alt="imagen del evento" />
              </div>
              <div className="info-evento-carrito">
                <h3>{event.title}</h3>
                <div className="datos-evento-carrito">
                  <div>{event.organization}</div>
                  <div>{formatDate(event.date)}</div>
                  <div>
                    {event.time}-{event.timeEnd}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="aviso-evento-carrito">
            <p>Solo quedan 2 entradas</p>
          </div>
        </div>
      </div>
      <div className="entradas">
        <h2>Entradas</h2>
        <div className="cantidad">
          <span className="numero">x1</span>{" "}
          <span className="titulo">"{event.title}"</span>
        </div>
      </div>
      <div className="confirmar">
        <hr />
        <p className="total">Total a pagar</p>
        <div className="boton-confirmar">
          <Button onClick={onOpen}>Open Modal</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <WrapItem className="wrap">
                  <Avatar
                    size="2xl"
                    name={userConnected.name}
                    src={userConnected.avatar_url}
                    alt="avatar-profile-image"
                  />
                  <h3>
                    ¡Enhorabuena! <br />
                    {userConnected.name}
                  </h3>
                </WrapItem>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <h3>AQUI VA EL QR</h3>
              </ModalBody>

              <ModalFooter>
                <h3>
                  *Podrás encontrarlo en tu perfil y en tu correo electrónico
                </h3>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CartEvents;
