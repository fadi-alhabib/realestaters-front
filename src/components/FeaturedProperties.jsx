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
    <VStack p={20} justify={"center"} alignItems={"start"} spacing={10}>
      <Text fontSize={"5xl"} fontWeight={"bold"}>
        Featured Properties
      </Text>
      <HStack justify={"space-between"}>
        <Text width={"60%"}>
          Explore our handpicked selection of featured properties. Each listing
          offers a glimpse into exceptional homes and investments available
          through Estatein. Click "View Details" for more information.
        </Text>
        <Link to={"/properties"}>
          <Button bgColor={"brand"}>View More</Button>
        </Link>
      </HStack>
      <SimpleGrid
        alignSelf={"center"}
        width={"100%"}
        columns={[1, 2, 4]}
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
