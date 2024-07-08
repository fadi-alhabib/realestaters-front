import { Box, Text } from "@chakra-ui/react";
import bannerBg from "../assets/banner-background.png";
import bannerImage from "../assets/banner-image.png";
import Banner from "../components/Banner";
import FeaturedProperties from "../components/FeaturedProperties";
import HomeServices from "../components/HomeServices";

const Home = () => {
  return (
    <Box>
      <Banner
        bannerBg={bannerBg}
        bannerImage={bannerImage}
        title={
          <Text fontSize={"5xl"} width={"60%"}>
            Discover Your Dream <br /> Property with Real Estaters
          </Text>
        }
        subTitle={
          <Text fontSize={"xl"} width={"60%"}>
            Your journey to finding the perfect property begins here. Explore
            our listings to find the home that matches your dreams.
          </Text>
        }
      />
      <HomeServices />
      <FeaturedProperties />
    </Box>
  );
};

export default Home;
