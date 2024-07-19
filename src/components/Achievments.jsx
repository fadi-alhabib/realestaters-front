import { Box, Flex, Text, VStack, Stack } from "@chakra-ui/react";
import { FaAward, FaHandshake, FaSmile } from "react-icons/fa"; // Example icons
import AchievementCard from "./AchievmentCard";

const AchievementsSection = () => {
  return (
    <Box p={{ base: 5, md: 10 }} textAlign="center">
      <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" mb={2}>
        Our Achievements
      </Text>
      <Text fontSize={{ base: "md", md: "lg" }} color="grey" mb={10}>
        Our story is one of continuous growth and evolution. We started as a
        small team with big dreams, determined to create a real estate platform
        that transcended the ordinary.
      </Text>
      <Stack
        direction={{ base: "column", md: "row" }}
        justify="center"
        spacing={8}
      >
        <AchievementCard
          icon={FaAward}
          title="10+ Years of Excellence"
          text="With over 10 years in the industry, we've amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate."
        />
        <AchievementCard
          icon={FaSmile}
          title="Happy Clients"
          text="Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do."
        />
        <AchievementCard
          icon={FaHandshake}
          title="Industry Recognition"
          text="We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence."
        />
      </Stack>
    </Box>
  );
};

export default AchievementsSection;
