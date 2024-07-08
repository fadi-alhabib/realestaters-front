import { Box, Divider, Text } from "@chakra-ui/react";
import bannerImage from "../assets/about-banner-image.png";
import Banner from "../components/Banner";
import OurValues from "../components/OurValues";
import AchievementsSection from "../components/Achievments";
const About = () => {
  return (
    <Box>
      <Banner
        bannerBg={""}
        bannerImage={bannerImage}
        title={
          <Text fontSize={"5xl"} width={"60%"}>
            Our Journey
          </Text>
        }
        subTitle={
          <Text fontSize={"xl"} width={"60%"}>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary. Over the years, we've
            expanded our reach, forged valuable partnerships, and gained the
            trust of countless clients.
          </Text>
        }
        haveButtons={false}
      />
      <OurValues />
      <AchievementsSection />
    </Box>
  );
};

export default About;
