import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useData from "../hooks/useData";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BsChat } from "react-icons/bs";
import apiService from "../services/api-service";

export default function ServiceDetails() {
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const {
    data: service,
    error,
    isLoading,
  } = useData(
    `extras/${id}`,
    { headers: { Authorization: localStorage.getItem("token") } },
    [id]
  );
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const handleChat = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    apiService
      .get(`/chat/${service.extras.user.id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/chat", { state: response.data });
      });
  };
  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" p={4}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!service) {
    return (
      <Container maxW="container.xl" p={4}>
        <Text>Service not found.</Text>
      </Container>
    );
  }
  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={6} align="stretch">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={6}
          bg="appGray"
          shadow="md"
        >
          <VStack align="start" spacing={4}>
            <Image
              borderRadius="md"
              w="100%"
              maxH="400px"
              src={service.extras.image}
              alt={service.extras.name}
              objectFit="cover"
            />
            <Badge colorScheme="purple">{service.extras.category}</Badge>
            <Heading as="h1" size="xl">
              {service.extras.name}
            </Heading>
            <HStack spacing={2}>
              <Text fontWeight="bold">Contact:</Text>
              <Text>{service.extras.contact_number}</Text>
            </HStack>
            <HStack spacing={2}>
              <Text fontWeight="bold">Address:</Text>
              <Text>{service.extras.address}</Text>
            </HStack>
            <Text>{service.extras.description}</Text>
          </VStack>
        </Box>

        {user && user.type !== "Seller" && (
          <HStack
            bg="appGray"
            p={6}
            borderRadius="md"
            justify="space-between"
            mb={8}
            wrap="wrap"
          >
            <HStack mb={{ base: 4, md: 0 }}>
              <Avatar
                src={service.extras.user.profile_image}
                size="xl"
                mr={3}
              />
              <Text fontSize="3xl">{service.extras.user.fullname}</Text>
            </HStack>
            <Icon
              onClick={handleChat}
              as={BsChat}
              fontSize="4xl"
              color="brand"
              cursor="pointer"
            />
          </HStack>
        )}

        <Heading as="h2" size="lg" mt={10}>
          Works
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {service.extras.works.map((work) => (
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
              onClick={() => handleImageClick(work.image)} // Handle click on the image
              cursor="pointer"
            >
              <Image
                borderRadius="md"
                w="100%"
                maxH="200px"
                src={work.image} // Assuming image URLs are valid
                alt={work.title}
                objectFit="cover"
              />
              <Box
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                bg="rgba(0, 0, 0, 0.7)" // Semi-transparent black background
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
      </VStack>
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
    </Container>
  );
}
