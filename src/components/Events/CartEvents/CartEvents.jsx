import React, { useEffect } from 'react';
import './CartEvents.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getById } from '../../../features/events/eventsSlice';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../../utils/utils';
import { useDisclosure } from '@chakra-ui/hooks';
import { Button } from '@chakra-ui/button';
import { getUserConnected } from '../../../features/auth/authSlice';
import { QRCodeSVG } from 'qrcode.react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { VStack, Text, Box } from '@chakra-ui/react';
import { Avatar } from '@chakra-ui/avatar';

const CartEvents = () => {
  const { event, isLoading } = useSelector(state => state.events);
  const { userConnected } = useSelector(state => state.auth);
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
        Carrito{' '}
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
          <span className="numero">x1</span>{' '}
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
            <ModalContent w="90%" minH="60%" borderRadius="20px">
              <ModalHeader>
                <ModalCloseButton color="#10628e" />
              </ModalHeader>

              <ModalBody>
                <VStack className="wrap" gap="0">
                  <Avatar
                    size="2xl"
                    name={userConnected.name}
                    src={userConnected.avatar_url}
                    alt="avatar-profile-image"
                  />
                  <Text align="center" color="#10628e" fontSize="28px">
                    ¡Enhorabuena!
                  </Text>
                  <Text
                    align="center"
                    color="#10628e"
                    fontSize="28px"
                    mb="30px"
                  >
                    {userConnected.name}
                  </Text>
                  <Box mb="15px">
                    <QRCodeSVG size="150" />
                  </Box>
                  <Text align="center" color="#10628e" fontSize="24px">
                    Aquí tienes tu QR de
                  </Text>
                  <Text align="center" color="#10628e" fontSize="24px">
                    acceso al evento
                  </Text>
                </VStack>
              </ModalBody>

              <ModalFooter>
                <Text align="center" color="#10628e" fontSize="18px">
                  *Podrás encontrarlo en tu perfil y en tu correo electrónico
                </Text>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CartEvents;
