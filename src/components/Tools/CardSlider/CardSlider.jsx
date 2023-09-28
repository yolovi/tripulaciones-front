import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router';
import { formatDate } from '../../../../utils/utils';
import { Circle, Box } from '@chakra-ui/react';
import { QRCodeSVG } from 'qrcode.react';
import QR from '../QR/QR';
import { useDisclosure } from '@chakra-ui/hooks';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const CardSlider = ({
  _id = '',
  image = '',
  category = '',
  date = '',
  time = '',
  place = '',
  likes = [],
  userForQR = '',
}) => {
  const navigate = useNavigate();

  const handleDivClick = eventId => {
    navigate(`/eventdetail/${eventId}`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div
        className="evento-individual"
        onClick={() => {
          handleDivClick(_id);
        }}
      >
        <div className="container-img-profile">
          <div className="img-profile">
            <img src={image} alt="" />
          </div>
        </div>
        <div className="info-evento">
          <div className="category">
            <div className="texto">{category}</div>{' '}
            <span className="place">{place}</span>
            <div className="flecha">
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div>
          </div>
          <div className="fecha">
            {formatDate(date)} <span className="hora">{time}</span>
          </div>
          <div className="likes">{likes?.map(elem => elem.likes)}</div>
        </div>
        <Box
          position="relative"
          bottom="140px"
          right="110px"
          onClick={e => {
            e.stopPropagation();
            onOpen();
          }}
          h="fit-content"
        >
          <Circle size="80px" bg="white" color="white" shadow="dark-lg">
            <QRCodeSVG size="50" />
          </Circle>
        </Box>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="90%" borderRadius="20px">
          <ModalHeader>
            <ModalCloseButton color="#10628e" />
          </ModalHeader>
          <ModalBody justifyContent="center" display="inline-flex" pb="40px">
            <QR user={userForQR} event={_id} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardSlider;
