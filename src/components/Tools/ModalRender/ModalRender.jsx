import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

const ModalRender = ({
  onCloseButtonVisible = false,
  secondaryButtonVisible = false,
  text = 'I am a modal',
  textBtn = 'Click',
  modalTitle = 'Modal Title',
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        style={{
          borderRadius: '50%',
          display: 'inline-block',
          background: 'white',
          height: '40px',
          width: ' 20px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
        onClick={onOpen}
      >
        {textBtn}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{text}</ModalBody>

          <ModalFooter>
            {onCloseButtonVisible && (
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            )}

            {secondaryButtonVisible && (
              <Button variant="ghost">Secondary Action</Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRender;
