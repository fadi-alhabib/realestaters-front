import {
  Badge,
  Box,
  Container,
  Divider,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import useServices from "../hooks/useServices";

const Services = () => {
  const { data, error, isLoading } = useServices("extras/");

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={6} align="stretch">
        {isLoading && <Text>Loading....</Text>}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {data &&
            data.extras.map((extra) => (
              <Box
                key={extra.id}
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
                    src={extra.image}
                    alt={extra.name}
                    objectFit="cover"
                  />
                  <Badge colorScheme="purple">{extra.category}</Badge>
                  <Text fontSize="2xl" fontWeight="bold">
                    {extra.name}
                  </Text>
                  <HStack spacing={2}>
                    <Icon as={FaPhone} />
                    <Text>{extra.contact_number}</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Icon as={FaMapMarkerAlt} />
                    <Text>{extra.address}</Text>
                  </HStack>
                  <Divider my={4} />
                  <Text>{extra.description}</Text>
                </VStack>
              </Box>
            ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Services;
