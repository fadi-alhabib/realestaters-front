import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
} from "@chakra-ui/react";
export default function EditExtraModal({
  isOpen,
  onClose,
  formData,
  categories,
  handleFormChange,
  handleFormSubmit,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Extra</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleFormSubmit}>
            <FormControl id="name" isRequired mb={4}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name || ""}
                onChange={handleFormChange}
              />
            </FormControl>

            <FormControl id="contact_number" isRequired mb={4}>
              <FormLabel>Contact Number</FormLabel>
              <Input
                name="contact_number"
                value={formData.contact_number || ""}
                onChange={handleFormChange}
              />
            </FormControl>

            <FormControl id="address" isRequired mb={4}>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                value={formData.address || ""}
                onChange={handleFormChange}
              />
            </FormControl>

            <FormControl id="description" isRequired mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description || ""}
                onChange={handleFormChange}
              />
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Save Changes
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
