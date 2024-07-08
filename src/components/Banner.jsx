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
    <Box textAlign={"start"}>
      <HStack justify={"space-between"}>
        <VStack alignItems={"start"} spacing={10} p={20} width={"50vw"}>
          {title}
          {subTitle}
          {haveButtons ? (
            <HStack>
              <Link to={"/about"}>
                <Button color={"white"}>Learn More</Button>
              </Link>
              <Link to={"/properties"}>
                <Button bgColor={"brand"} color={"white"}>
                  Browse Properties
                </Button>
              </Link>
            </HStack>
          ) : null}
          <HStack>
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
        <Box bgImage={bannerBg}>
          <Image src={bannerImage}></Image>
        </Box>
      </HStack>
    </Box>
  );
};

export default Banner;
