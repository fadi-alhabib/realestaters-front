import React from "react";
import {
  Box,
  Badge,
  VStack,
  Heading,
  HStack,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";

export default function ServiceInfo({ service, onEditClick }) {
  return (
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
          src={service.image}
          alt={service.name}
          objectFit="cover"
        />
        <Badge colorScheme="purple">{service.category.name}</Badge>
        <Heading as="h1" size="xl">
          {service.name}
        </Heading>
        <HStack spacing={2}>
          <Text fontWeight="bold">Contact:</Text>
          <Text>{service.contact_number}</Text>
        </HStack>
        <HStack spacing={2}>
          <Text fontWeight="bold">Address:</Text>
          <Text>{service.address}</Text>
        </HStack>
        <Text>{service.description}</Text>
        <Button colorScheme="blue" onClick={onEditClick}>
          Edit Extra
        </Button>
      </VStack>
    </Box>
  );
}
