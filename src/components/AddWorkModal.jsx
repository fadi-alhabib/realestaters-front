import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  Box,
} from "@chakra-ui/react";
import apiService from "../services/api-service";

export default function AddWorkModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State to store image preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set image preview when file is loaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const response = await apiService.post("/extras/add_work", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.status === 201) {
        onAdd(response.data.work); // Add the new work to the gallery
        onClose();
      }
    } catch (error) {
      console.error("Error adding work:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Work</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </FormControl>

          {/* Image Preview */}
          {imagePreview && (
            <Box mt={4}>
              <Image src={imagePreview} alt="Image Preview" />
            </Box>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleAdd}>
            Add Work
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
