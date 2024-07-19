import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Container,
  Heading,
  CircularProgress,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useData from "../../hooks/useData";
import apiService from "../../services/api-service";

const EditPropertyForm = () => {
  const { id } = useParams();
  const { data, isLoading } = useData(`estates/${id}`);
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    description: "",
    city: "",
    street: "",
    space: "",
    price: "",
    number_of_rooms: "",
    bathrooms: "",
    garages: "",
    category: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        description: data.estate.description,
        city: data.estate.city,
        street: data.estate.street,
        space: data.estate.space,
        price: data.estate.price,
        number_of_rooms: data.estate.number_of_rooms,
        bathrooms: data.estate.bathrooms,
        garages: data.estate.garages,
        category: data.estate.category,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService
      .put(`/estates/${id}`, formData, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => {
        toast({
          title: "Property updated.",
          description: "The property has been updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate(`/property/${id}`);
      })
      .catch((error) => {
        console.error("Error updating property:", error);
        toast({
          title: "Error updating property.",
          description: "There was an error updating the property.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  if (isLoading) return <CircularProgress />;

  return (
    <Container maxW="container.md" py={12}>
      <Heading as="h2" mb={6}>
        Edit Property
      </Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>City</FormLabel>
          <Input
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Street</FormLabel>
          <Input
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Space (in sq meters)</FormLabel>
          <Input
            name="space"
            value={formData.space}
            onChange={handleChange}
            required
            type="number"
            step="0.01"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Price</FormLabel>
          <Input
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            type="number"
            step="0.01"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Number of Rooms</FormLabel>
          <Input
            name="number_of_rooms"
            value={formData.number_of_rooms}
            onChange={handleChange}
            required
            type="number"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Bathrooms</FormLabel>
          <Input
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            type="number"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Garages</FormLabel>
          <Input
            name="garages"
            value={formData.garages}
            onChange={handleChange}
            required
            type="number"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option value="Farm">Farm</option>
            <option value="Appartment">Apartment</option>
            <option value="House">House</option>
          </Select>
        </FormControl>
        <Button colorScheme="teal" type="submit">
          Save Changes
        </Button>
      </Box>
    </Container>
  );
};

export default EditPropertyForm;
