import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import React from "react";

export default function ServiceCard({ service }) {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleViewDetails = () => {
    navigate(`/service-details/${service.id}`); // Navigate to the service details page
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      bg="appGray"
      shadow="md"
      _hover={{ shadow: "lg" }}
    >
      <VStack align="start" spacing={4}>
        <Image
          borderRadius="md"
          boxSize="100%"
          maxH="200px"
          src={service.image}
          alt={service.name}
          objectFit="cover"
        />
        <Badge colorScheme="purple">{service.category.name}</Badge>
        <Text fontSize="2xl" fontWeight="bold">
          {service.name}
        </Text>
        <HStack spacing={2}>
          <Icon as={FaPhone} />
          <Text>{service.contact_number}</Text>
        </HStack>
        <HStack spacing={2}>
          <Icon as={FaMapMarkerAlt} />
          <Text>{service.address}</Text>
        </HStack>
        <Divider my={4} />
        <Text>{service.description}</Text>
        <Button colorScheme="blue" onClick={handleViewDetails}>
          View Details
        </Button>
      </VStack>
    </Box>
  );
}
