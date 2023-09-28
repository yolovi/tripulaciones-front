import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import eventsService from '../../../features/events/eventsService';
import { Spinner } from '@chakra-ui/react';

const QR = ({ user, event, size = '150' }) => {
  const [QRcode, setQRcode] = useState();

  useEffect(() => {
    if (user && event) {
      eventsService
        .QRcode(user, event)
        .then(response => setQRcode(response.qr_code));
    }
  }, [user, event]);

  return (
    <>
      {QRcode ? (
        <QRCodeSVG size={size} value={QRcode?.slice(48, 73)} />
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#F9CA92"
          size="xl"
        />
      )}
    </>
  );
};

export default QR;
