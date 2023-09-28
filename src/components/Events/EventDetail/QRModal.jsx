import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/modal';
import { VStack, Text, Box } from '@chakra-ui/react';
import eventsService from '../../../features/events/eventsService';
import { Spinner } from '@chakra-ui/react';

import { Avatar } from '@chakra-ui/avatar';
import QR from '../../Tools/QR/QR';

const QRModal = ({ user, event }) => {
  return (
    <ModalContent w="90%" minH="60%" borderRadius="20px">
      <ModalHeader>
        <ModalCloseButton color="#10628e" />
      </ModalHeader>

      <ModalBody>
        <VStack className="wrap" gap="0">
          <Avatar
            size="2xl"
            name={user.name}
            src={user.avatar_url}
            alt="avatar-profile-image"
          />
          <Text align="center" color="#10628e" fontSize="28px">
            ¡Enhorabuena!
          </Text>
          <Text align="center" color="#10628e" fontSize="28px" mb="30px">
            {user.name}
          </Text>
          <Box mb="15px">
            <QR user={user._id} event={event._id} />
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
  );
};

export default QRModal;
