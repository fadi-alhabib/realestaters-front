import {
  Box,
  CircularProgress,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  Button,
  HStack,
  Input,
  Select,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import PropertyCard from "../components/PropertyCard";
import useEstates from "../hooks/useEstates";

const PropertiesList = ({ isSeller }) => {
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useEstates(filters, search, isSeller);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => {
      const updatedFilters = { ...prev, [name]: value };

      if (value === "") {
        delete updatedFilters[name];
      }

      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <VStack mx={"10"} mb={5}>
      <Container
        minWidth={"70vw"}
        minHeight={"40vh"}
        justifyContent={"center"}
        alignContent={"center"}
      >
        <Heading>Find Your Dream Property</Heading>
        <Text color={"grey"}>
          Welcome to RealEstaters, where your dream property awaits in every
          corner of our beautiful world. Explore our curated selection of
          properties, each offering a unique story and a chance to redefine your
          life. With categories to suit every dreamer, your journey
        </Text>
      </Container>

      <Box mb={4} width={"full"}>
        <Center>
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            mb={4}
            width={"70%"}
          />
        </Center>
        <HStack spacing={4} mb={4}>
          <Select
            placeholder="Category"
            name="category"
            value={filters.category || ""}
            onChange={handleFilterChange}
          >
            <option value="Farm">Farm</option>
            <option value="Appartment">Apartment</option>
            <option value="House">House</option>
          </Select>
          <Input
            placeholder="Min Price"
            type="number"
            name="min_price"
            value={filters.min_price || ""}
            onChange={handleFilterChange}
          />
          <Input
            placeholder="Max Price"
            type="number"
            name="max_price"
            value={filters.max_price || ""}
            onChange={handleFilterChange}
          />
          <Input
            placeholder="City"
            name="city"
            value={filters.city || ""}
            onChange={handleFilterChange}
          />
        </HStack>
        <HStack spacing={4}>
          <Input
            placeholder="Min Rooms"
            type="number"
            name="min_rooms"
            value={filters.min_rooms || ""}
            onChange={handleFilterChange}
          />
          <Input
            placeholder="Max Rooms"
            type="number"
            name="max_rooms"
            value={filters.max_rooms || ""}
            onChange={handleFilterChange}
          />
          <Input
            placeholder="Min Bathrooms"
            type="number"
            name="min_bathrooms"
            value={filters.min_bathrooms || ""}
            onChange={handleFilterChange}
          />
          <Input
            placeholder="Max Bathrooms"
            type="number"
            name="max_bathrooms"
            value={filters.max_bathrooms || ""}
            onChange={handleFilterChange}
          />
        </HStack>
        <HStack spacing={4} mt={4}>
          <Input
            placeholder="Min Space"
            type="number"
            name="min_space"
            value={filters.min_space || ""}
            onChange={handleFilterChange}
          />
          <Input
            placeholder="Max Space"
            type="number"
            name="max_space"
            value={filters.max_space || ""}
            onChange={handleFilterChange}
          />
          <Input
            placeholder="Min Garages"
            type="number"
            name="min_garages"
            value={filters.min_garages || ""}
            onChange={handleFilterChange}
          />
          <Input
            placeholder="Max Garages"
            type="number"
            name="max_garages"
            value={filters.max_garages || ""}
            onChange={handleFilterChange}
          />
        </HStack>
        <Button mt={4} onClick={clearFilters} bgColor={"brand"}>
          Clear Filters
        </Button>
      </Box>

      {isLoading && <CircularProgress />}

      {data && (
        <SimpleGrid
          alignSelf={"center"}
          width={"100%"}
          columns={[1, 2, 4]}
          spacing="40px"
        >
          {data.estates.map((estate) => (
            <PropertyCard key={estate.id} estate={estate} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default PropertiesList;
