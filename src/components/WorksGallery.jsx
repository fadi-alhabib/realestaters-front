import React, { useState } from "react";
import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  Text,
  IconButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { TbTrash } from "react-icons/tb";
import { FiPlus } from "react-icons/fi"; // Plus icon for adding a work
import apiService from "../services/api-service";
import AddWorkModal from "./AddWorkModal"; // Import the AddWorkModal component

export default function WorksGallery({ works, onImageClick, onDelete, onAdd }) {
  const { isOpen, onOpen, onClose } = useDisclosure(); // For modal control

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`/extras/work/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      onDelete(id); // Call the onDelete callback to update the state
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading as="h2" size="lg">
          Works
        </Heading>
        <IconButton
          aria-label="Add work"
          icon={<FiPlus />}
          colorScheme="teal"
          onClick={onOpen}
        />
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {works.map((work) => (
          <Box
            key={work.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={0}
            bg="white"
            shadow="md"
            _hover={{ transform: "scale(1.1)" }}
            position="relative"
          >
            <IconButton
              aria-label="Delete work"
              icon={<TbTrash />}
              _hover={{ backgroundColor: "red" }}
              size="sm"
              colorScheme="red"
              position="absolute"
              top="5px"
              right="5px"
              zIndex={1}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click from triggering the image click event
                handleDelete(work.id);
              }}
            />
            <Image
              borderRadius="md"
              w="100%"
              maxH="200px"
              src={work.image}
              alt={work.title}
              objectFit="cover"
              onClick={() => onImageClick(work.image)}
              cursor="pointer"
            />
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              bg="rgba(0, 0, 0, 0.7)"
              color="white"
              p={4}
            >
              <Heading as="h3" size="md">
                {work.title}
              </Heading>
              <Text>{work.description}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <AddWorkModal isOpen={isOpen} onClose={onClose} onAdd={onAdd} />
    </Box>
  );
}
