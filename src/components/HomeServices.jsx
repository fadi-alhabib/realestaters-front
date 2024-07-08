import { Box, SimpleGrid, Text, Icon } from "@chakra-ui/react";
import { FaHome, FaKey, FaBuilding, FaRocketchat } from "react-icons/fa";

const Card = ({ icon, title }) => {
  return (
    <Box
      bg="gray.900"
      as="a"
      href="#"
      borderRadius="md"
      borderWidth="1px"
      borderColor="gray.700"
      padding="4"
      textAlign="center"
      _hover={{ bg: "gray.700", transform: "scale(1.05)" }}
      transition="all 0.3s ease"
    >
      <Icon as={icon} boxSize={8} color="brand" />
      <Text mt="4" color="white" fontSize="lg" fontWeight="bold">
        {title}
      </Text>
    </Box>
  );
};

const HomeServices = () => {
  return (
    <SimpleGrid columns={[1, 2, 4]} spacing="8" p="20">
      <Card icon={FaHome} title="Find Your Dream Home" />
      <Card icon={FaBuilding} title="Find Home Services" />
      <Card icon={FaRocketchat} title="Talk directly to the owner" />
      <Card icon={FaKey} title="Sell A property" />
    </SimpleGrid>
  );
};

export default HomeServices;
