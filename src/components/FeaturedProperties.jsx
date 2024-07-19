import {
  Button,
  CircularProgress,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import useData from "../hooks/useData";
import PropertyCard from "./PropertyCard";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const { data, error, isLoading } = useData("estates/");
  console.log(localStorage.getItem("token"));

  return (
    <VStack
      p={{ base: 5, md: 20 }}
      justify="center"
      alignItems="start"
      spacing={{ base: 5, md: 10 }}
    >
      <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold">
        Featured Properties
      </Text>
      <HStack
        justify="space-between"
        width="100%"
        flexDirection={{ base: "column", md: "row" }}
        alignItems="start"
        spacing={{ base: 5, md: 10 }}
      >
        <Text width={{ base: "100%", md: "60%" }}>
          Explore our handpicked selection of featured properties. Each listing
          offers a glimpse into exceptional homes and investments available
          through Estatein. Click "View Details" for more information.
        </Text>
        <Link to="/properties">
          <Button bgColor="brand" width={{ base: "100%", md: "auto" }}>
            View More
          </Button>
        </Link>
      </HStack>
      <SimpleGrid
        alignSelf="center"
        width="100%"
        columns={{ base: 1, sm: 1, md: 3, lg: 4 }}
        spacing="40px"
      >
        {isLoading && <CircularProgress />}
        {data &&
          data.estates
            .slice(0, 4)
            .map((estate) => <PropertyCard key={estate.id} estate={estate} />)}
      </SimpleGrid>
    </VStack>
  );
};

export default FeaturedProperties;
