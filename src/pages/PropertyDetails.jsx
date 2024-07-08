import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Stack,
  HStack,
  VStack,
  Heading,
  Divider,
  Container,
  Icon,
  List,
  ListItem,
  CircularProgress,
  Avatar,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCar,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import useData from "../hooks/useData";
import { BiChat } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import ShowMapLocation from "../components/ShowMapLocation";

const PropertyDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useData(`estates/${id}`);
  const token = localStorage.getItem("token");
  return (
    <Container maxW="70vw" minH="100vh" py={12}>
      {isLoading && <CircularProgress />}
      {data && (
        <>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h6" fontWeight={"300"} color="white">
              {data.estate.title}
            </Heading>

            <Box>
              <Text color={"grey"}>price</Text>
              <Text fontSize="2xl" color="white">
                ${data.estate.price.toLocaleString()}
              </Text>
            </Box>
          </Flex>
          <Box bg="black" p={6} borderRadius="md" boxShadow="xl">
            <Box mb={8}>
              <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
              >
                {data.estate.estate_images.map((image) => (
                  <Image
                    height={"50vh"}
                    fit={"fill"}
                    key={image.id}
                    src={image.image_path}
                    alt={`Property image ${image.id}`}
                    borderRadius="md"
                  />
                ))}
              </Carousel>
            </Box>
            <Flex direction={{ base: "column", lg: "row" }} gap={8} mb={8}>
              <Box flex="1" bg="appGray" p={6} borderRadius="md">
                <Heading as="h2" size="lg" mb={4} color="white">
                  Description
                </Heading>
                <Text fontSize="lg" color="gray.400">
                  {data.estate.description}
                </Text>
                <Divider my={4} borderColor="gray.600" />
                <HStack color="white" justify={"space-between"}>
                  <Badge
                    color={"white"}
                    p={5}
                    bgColor={"brand"}
                    borderRadius="xl"
                  >
                    <HStack>
                      <Icon as={FaMapMarkerAlt} />
                      <Text fontSize={"14px"}>
                        {`${data.estate.city}, ${data.estate.street}`}
                      </Text>
                    </HStack>
                  </Badge>
                  <Badge
                    color={"white"}
                    bgColor={"black"}
                    p={5}
                    borderRadius="xl"
                  >
                    <HStack>
                      <Icon as={FaBed} />
                      <Text fontSize={"16px"}>
                        {data.estate.number_of_rooms} Bedrooms
                      </Text>
                    </HStack>
                  </Badge>

                  <Badge
                    color={"white"}
                    bgColor={"black"}
                    p={5}
                    borderRadius="xl"
                  >
                    <HStack>
                      <Icon as={FaCar} />
                      <Text fontSize={"16px"}>
                        {data.estate.garages} Garages
                      </Text>
                    </HStack>
                  </Badge>

                  <Badge
                    color={"white"}
                    bgColor={"black"}
                    p={5}
                    borderRadius="xl"
                  >
                    <HStack>
                      <Icon as={FaBath} />
                      <Text fontSize={"16px"}>
                        {data.estate.bathrooms} Bathrooms
                      </Text>
                    </HStack>
                  </Badge>

                  <Badge
                    color={"white"}
                    bgColor={"black"}
                    p={5}
                    borderRadius="xl"
                  >
                    <HStack>
                      <Icon as={FaRulerCombined} />
                      <Text fontSize={"16px"}>{data.estate.space} m</Text>
                    </HStack>
                  </Badge>
                </HStack>
              </Box>
            </Flex>

            <HStack
              bg="appGray"
              p={6}
              borderRadius="md"
              justify={"space-between"}
              mb={8}
            >
              <HStack>
                <Avatar
                  src={data.estate.user.profile_image}
                  size={"xl"}
                  mr={3}
                />
                <Text fontSize={"3xl"}>{data.estate.user.fullname}</Text>
              </HStack>

              <Link to={token ? "/chat" : "/login"}>
                <Icon as={BsChat} fontSize={"4xl"} color={"brand"} />
              </Link>
            </HStack>
            <ShowMapLocation
              latitude={data.estate.latitude}
              longitude={data.estate.longitude}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default PropertyDetails;
