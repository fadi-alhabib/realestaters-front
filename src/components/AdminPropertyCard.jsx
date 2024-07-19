import {
  Badge,
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { FaBath, FaBed, FaCar, FaHome, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminPropertyCard = ({ estate }) => {
  return (
    <Box
      maxW={{ base: "100%", sm: "sm" }}
      borderWidth="1px"
      borderRadius="xl"
      borderColor="grey"
      overflow="hidden"
      bg="appGray"
      color="white"
      boxShadow="2xl"
    >
      <Image
        src={estate.estate_images[0].image_path}
        alt="Seaside Serenity Villa"
        height={{ base: "20vh", sm: "30vh" }}
        width="100%"
      />

      <Box p="6">
        <Stack spacing={3}>
          <Box>
            <Text
              fontWeight="bold"
              fontSize={{ base: "lg", sm: "xl" }}
              noOfLines={1}
            >
              {estate.title}
            </Text>
            <Text
              fontSize={{ base: "sm", sm: "md" }}
              color="gray.400"
              noOfLines={2}
            >
              {estate.description}
            </Text>
          </Box>
          <Badge color="white" p={5} bgColor="brand" borderRadius="xl">
            <HStack>
              <Icon as={FaMapMarkerAlt} />
              <Text fontSize="14px">{`${estate.city}, ${estate.street}`}</Text>
            </HStack>
          </Badge>
          <Wrap spacing={4}>
            <Badge color="white" bgColor="black" p={3} borderRadius="xl">
              <HStack spacing={1}>
                <Icon as={FaBed} />
                <Text>{estate.number_of_rooms}-Bedroom</Text>
              </HStack>
            </Badge>

            <Badge color="white" bgColor="black" p={3} borderRadius="xl">
              <HStack spacing={1}>
                <Icon as={FaBath} />
                <Text>{estate.bathrooms}-Bathroom</Text>
              </HStack>
            </Badge>
            <Badge color="white" bgColor="black" p={3} borderRadius="xl">
              <HStack spacing={1}>
                <Icon as={FaCar} />
                <Text>{estate.garages}-Garages</Text>
              </HStack>
            </Badge>
            <Badge color="white" bgColor="black" p={3} borderRadius="xl">
              <HStack spacing={1}>
                <Icon as={FaHome} />
                <Text>{estate.category}</Text>
              </HStack>
            </Badge>
          </Wrap>

          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              ${estate.price}
            </Text>
          </Box>

          <Link to={`/admin/property/${estate.id}`}>
            <Button colorScheme="purple" w="full">
              View Property Details
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default AdminPropertyCard;
