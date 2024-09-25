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
import ServiceCard from "../components/ServiceCard";

const Services = () => {
  const { data, error, isLoading } = useServices();

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={6} align="stretch">
        {isLoading && <Text>Loading....</Text>}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {data &&
            data.extras.map((extra) => (
              <ServiceCard key={extra.id} service={extra} />
            ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Services;
