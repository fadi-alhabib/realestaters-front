import { Box, Flex, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import ValueCard from "./ValueCard";
import { FaChartBar, FaGraduationCap, FaStar } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

const OurValues = () => {
  return (
    <VStack
      justify="space-between"
      p={{ base: 4, md: 8 }}
      textAlign="center"
      spacing={8}
    >
      <Box>
        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
          Our Values
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="grey" mb={10}>
          Our story is one of continuous growth and evolution. We started as a
          small team with big dreams, determined to create a real estate
          platform that transcended the ordinary.
        </Text>
      </Box>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={4}
        width="100%"
        justifyItems="center"
      >
        <ValueCard
          icon={FaStar}
          title="Trust"
          text="Trust is the cornerstone of every successful real estate transaction."
        />
        <ValueCard
          icon={FaGraduationCap}
          title="Excellence"
          text="We set the bar high for ourselves. From the properties we list to the services we provide."
        />
        <ValueCard
          icon={FaUserGroup}
          title="Client-centric"
          text="Your dreams and needs are at the center of our universe. We listen, understand."
        />
        <ValueCard
          icon={FaChartBar}
          title="Our Commitment"
          text="We are dedicated to providing you with the highest level of service, professionalism, and support."
        />
      </Grid>
    </VStack>
  );
};

export default OurValues;
