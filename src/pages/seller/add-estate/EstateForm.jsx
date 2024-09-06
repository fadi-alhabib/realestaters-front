import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Select,
} from "@chakra-ui/react";
import useEstateCategories from "../../../hooks/useEstatesCategories";

const EstateForm = () => {
  const [estate, setEstate] = useState({
    category: "",
    description: "",
    city: "",
    street: "",
    latitude: "",
    longitude: "",
    space: "",
    price: "",
    number_of_rooms: "",
    bathrooms: "",
    garages: "",
    title: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEstate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/seller/add-property/select-location", { state: { estate } });
  };
  const { data: categories, error, isLoading } = useEstateCategories();
  return (
    <Box p={20} borderRadius="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="category" isRequired>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Category"
              name="category_id"
              value={estate.category_id || ""}
              onChange={handleChange}
            >
              {categories &&
                categories.data.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input name="title" value={estate.title} onChange={handleChange} />
          </FormControl>
          <FormControl id="description" isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={estate.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="city" isRequired>
            <FormLabel>City</FormLabel>
            <Input name="city" value={estate.city} onChange={handleChange} />
          </FormControl>
          <FormControl id="street" isRequired>
            <FormLabel>Street</FormLabel>
            <Input
              name="street"
              value={estate.street}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="space" isRequired>
            <FormLabel>Space</FormLabel>
            <Input name="space" value={estate.space} onChange={handleChange} />
          </FormControl>
          <FormControl id="price" isRequired>
            <FormLabel>Price</FormLabel>
            <Input name="price" value={estate.price} onChange={handleChange} />
          </FormControl>
          <FormControl id="number_of_rooms" isRequired>
            <FormLabel>Number of Rooms</FormLabel>
            <Input
              name="number_of_rooms"
              value={estate.number_of_rooms}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="bathrooms" isRequired>
            <FormLabel>Bathrooms</FormLabel>
            <Input
              name="bathrooms"
              value={estate.bathrooms}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="garages" isRequired>
            <FormLabel>Garages</FormLabel>
            <Input
              name="garages"
              value={estate.garages}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" width="full">
            Next
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EstateForm;
