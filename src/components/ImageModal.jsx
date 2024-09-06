import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
} from "@chakra-ui/react";

export default function ImageModal({ isOpen, onClose, selectedImage }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent bg="black" color="white">
        <ModalCloseButton color="white" />
        <ModalBody
          p={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Work Image"
              maxW="100%"
              maxH="100vh"
              objectFit="contain"
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
