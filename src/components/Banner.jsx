import { Box, Button, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Banner = ({
  bannerBg,
  bannerImage,
  title,
  subTitle,
  haveButtons = true,
}) => {
  return (
    <Box textAlign="start" width="100%">
      <HStack
        justify="space-between"
        flexDirection={{ base: "column", md: "row" }}
        spacing={{ base: 5, md: 0 }}
      >
        <VStack
          alignItems="start"
          spacing={10}
          p={{ base: 5, md: 20 }}
          width={{ base: "100%", md: "50vw" }}
        >
          <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="bold">
            {title}
          </Text>
          <Text fontSize={{ base: "md", md: "xl" }}>{subTitle}</Text>
          {haveButtons ? (
            <HStack spacing={4}>
              <Link to="/about">
                <Button
                  color="white"
                  bgColor="brand"
                  _hover={{ bg: "brandHover" }}
                >
                  Learn More
                </Button>
              </Link>
              <Link to="/properties">
                <Button
                  bgColor="brand"
                  color="white"
                  _hover={{ bg: "brandHover" }}
                >
                  Browse Properties
                </Button>
              </Link>
            </HStack>
          ) : null}
          <HStack spacing={4}>
            <Box
              backgroundColor="black"
              color="white"
              padding="4"
              borderRadius="20px"
              textAlign="center"
            >
              <Text fontSize="4xl" fontWeight="bold">
                200+
              </Text>
              <Text>Happy Customers</Text>
            </Box>
            <Box
              backgroundColor="black"
              color="white"
              padding="4"
              borderRadius="20px"
              textAlign="center"
            >
              <Text fontSize="4xl" fontWeight="bold">
                10K+
              </Text>
              <Text>Properties For Clients</Text>
            </Box>
            <Box
              backgroundColor="black"
              color="white"
              padding="4"
              borderRadius="20px"
              textAlign="center"
            >
              <Text fontSize="4xl" fontWeight="bold">
                10+
              </Text>
              <Text>Years of Experience</Text>
            </Box>
          </HStack>
        </VStack>
        <Box
          bgImage={bannerBg}
          bgSize="cover"
          width={{ base: "100%", md: "50vw" }}
          height={{ base: "40vh", md: "100vh" }}
        >
          <Image
            src={bannerImage}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </Box>
      </HStack>
    </Box>
  );
};

export default Banner;
