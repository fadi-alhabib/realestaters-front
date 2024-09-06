import {
  Box,
  Button,
  Center,
  CircularProgress,
  HStack,
  Input,
  Select,
  SimpleGrid,
  VStack,
  Checkbox,
} from "@chakra-ui/react";
import PropertyCard from "../../components/PropertyCard";
import useUnapprovedEstates from "../../hooks/useUnapprovedEstates";
import AdminPropertyCard from "../../components/AdminPropertyCard";
import { useState } from "react";
import useEstateCategories from "../../hooks/useEstatesCategories";

const AdminProperties = () => {
  const [filters, setFilters] = useState({});
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useUnapprovedEstates(filters, search);
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useEstateCategories();
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => {
      let updatedFilters = { ...prev };

      if (type === "checkbox") {
        updatedFilters[name] = checked | 0;
      } else {
        updatedFilters[name] = value;
      }

      if (value === "" && type !== "checkbox") {
        delete updatedFilters[name];
      }

      return updatedFilters;
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <VStack minH={"85vh"} mx={"10"} mb={5}>
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
            {categories &&
              categories.data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
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
        <HStack spacing={4} mt={4}>
          <Checkbox
            name="active"
            isChecked={filters.active}
            onChange={handleFilterChange}
          >
            Active
          </Checkbox>
          <Checkbox
            name="sold"
            isChecked={filters.sold}
            onChange={handleFilterChange}
          >
            Sold
          </Checkbox>
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
            <AdminPropertyCard key={estate.id} estate={estate} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
};

export default AdminProperties;
