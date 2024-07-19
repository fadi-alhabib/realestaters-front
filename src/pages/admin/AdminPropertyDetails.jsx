import {
  Box,
  Flex,
  Image,
  Text,
  Badge,
  HStack,
  Heading,
  Divider,
  Container,
  Icon,
  CircularProgress,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaMapMarkerAlt,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaCar,
  FaEdit,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import { BsChat } from "react-icons/bs";
import ShowMapLocation from "../../components/ShowMapLocation";
import apiService from "../../services/api-service";

const AdminPropertyDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useData(`estates/${id}`);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleChat = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    apiService
      .get(`/chat/${data.estate.user.id}`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/chat", { state: response.data });
      });
  };

  return (
    <Container
      maxW={{ base: "95vw", md: "80vw", lg: "70vw" }}
      minH="100vh"
      py={12}
    >
      {isLoading && <CircularProgress />}
      {data && (
        <>
          <Flex
            justify="space-between"
            align="center"
            mb={4}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Heading
              as="h6"
              fontWeight="300"
              color="white"
              textAlign={{ base: "center", md: "left" }}
            >
              {data.estate.title}
            </Heading>

            <Box
              textAlign={{ base: "center", md: "right" }}
              mt={{ base: 4, md: 0 }}
            >
              <Text color="grey">price</Text>
              <Text fontSize="2xl" color="white">
                ${data.estate.price.toLocaleString()}
              </Text>
            </Box>
          </Flex>

          <Box bg="black" p={6} borderRadius="md" boxShadow="xl">
            <Box mb={8}>
              <Heading mb={3}>Seller ID:</Heading>
              <Image src={data.estate.user.id_image} width={"100%"} />
            </Box>
            <Box mb={8}>
              <Heading mb={3}>Validation Papers:</Heading>
              <Carousel showArrows showThumbs={false} infiniteLoop autoPlay>
                {data.estate.property_images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.image_path}
                    alt={`Property image ${image.id}`}
                    borderRadius="md"
                    height={{ base: "30vh", md: "40vh", lg: "50vh" }}
                    fit="fill"
                  />
                ))}
              </Carousel>
            </Box>
            <Box mb={8}>
              <Carousel showArrows showThumbs={false} infiniteLoop autoPlay>
                {data.estate.estate_images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.image_path}
                    alt={`Property image ${image.id}`}
                    borderRadius="md"
                    height={{ base: "30vh", md: "40vh", lg: "50vh" }}
                    fit="fill"
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
                <HStack color="white" justify="space-between" wrap="wrap">
                  <Badge
                    color="white"
                    p={5}
                    bgColor="brand"
                    borderRadius="xl"
                    mb={4}
                  >
                    <HStack>
                      <Icon as={FaMapMarkerAlt} />
                      <Text fontSize="14px">{`${data.estate.city}, ${data.estate.street}`}</Text>
                    </HStack>
                  </Badge>
                  <Badge
                    color="white"
                    bgColor="black"
                    p={5}
                    borderRadius="xl"
                    mb={4}
                  >
                    <HStack>
                      <Icon as={FaBed} />
                      <Text fontSize="16px">
                        {data.estate.number_of_rooms} Bedrooms
                      </Text>
                    </HStack>
                  </Badge>
                  <Badge
                    color="white"
                    bgColor="black"
                    p={5}
                    borderRadius="xl"
                    mb={4}
                  >
                    <HStack>
                      <Icon as={FaCar} />
                      <Text fontSize="16px">{data.estate.garages} Garages</Text>
                    </HStack>
                  </Badge>
                  <Badge
                    color="white"
                    bgColor="black"
                    p={5}
                    borderRadius="xl"
                    mb={4}
                  >
                    <HStack>
                      <Icon as={FaBath} />
                      <Text fontSize="16px">
                        {data.estate.bathrooms} Bathrooms
                      </Text>
                    </HStack>
                  </Badge>
                  <Badge
                    color="white"
                    bgColor="black"
                    p={5}
                    borderRadius="xl"
                    mb={4}
                  >
                    <HStack>
                      <Icon as={FaRulerCombined} />
                      <Text fontSize="16px">{data.estate.space} m</Text>
                    </HStack>
                  </Badge>
                </HStack>
              </Box>
            </Flex>

            {user.type !== "Seller" && (
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
                    src={data.estate.user.profile_image}
                    size="xl"
                    mr={3}
                  />
                  <Text fontSize="3xl">{data.estate.user.fullname}</Text>
                </HStack>
              </HStack>
            )}

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

export default AdminPropertyDetails;
