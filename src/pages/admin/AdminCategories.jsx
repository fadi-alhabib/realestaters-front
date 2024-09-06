import {
  Badge,
  Box,
  Button,
  HStack,
  IconButton,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";
// Use your provided axios instance
import useData from "../../hooks/useData";
import { BiEdit } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";
import apiService from "../../services/api-service";

export default function AdminCategories() {
  const [refetch, setRefetch] = useState(0);
  const {
    data: categories,
    isLoading,
    error,
  } = useData("/categories", null, [refetch]);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false); // To track add/edit mode
  const [selectedCategory, setSelectedCategory] = useState(null); // For editing a category

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryType(category.cat_type);
    setEditMode(true); // Set to edit mode
    onOpen();
  };

  const handleDelete = async (category) => {
    try {
      await apiService.delete(`/categories/${category.id}`);

      toast({
        title: `Category ${category.name} deleted`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Trigger refetch after deletion
      setRefetch(refetch + 1);
    } catch (error) {
      toast({
        title: "Failed to delete category",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleAddCategory = async () => {
    if (!categoryName || !categoryType) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiService.post("/categories", {
        name: categoryName,
        cat_type: categoryType,
      });

      toast({
        title: `Category ${response.data.name} added`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Re-fetch categories after successful addition
      setRefetch(refetch + 1);
      onClose();
    } catch (error) {
      toast({
        title: "Failed to add category",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!categoryName || !categoryType) {
      toast({
        title: "Please fill in all fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiService.put(
        `/categories/${selectedCategory.id}`,
        {
          name: categoryName,
          cat_type: categoryType,
        }
      );

      toast({
        title: `Category ${response.data.name} updated`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      // Re-fetch categories after successful update
      setRefetch(refetch + 1);
      onClose();
    } catch (error) {
      toast({
        title: "Failed to update category",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
      setEditMode(false);
      setSelectedCategory(null);
    }
  };

  const handleCloseModal = () => {
    setCategoryName("");
    setCategoryType("");
    setEditMode(false);
    setSelectedCategory(null);
    onClose();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <VStack spacing={4} align="stretch" p={4} minHeight={"80vh"}>
      <HStack justify="space-between" w="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Categories
        </Text>
        <Button
          colorScheme="blue"
          leftIcon={<IoAddCircleOutline />}
          onClick={() => {
            setEditMode(false);
            onOpen();
          }}
        >
          Add Category
        </Button>
      </HStack>

      <SimpleGrid columns={[1, 2, 3]} spacing={6} w="100%">
        {categories &&
          categories.data.map((category) => (
            <Box
              key={category.id}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              boxShadow="md"
            >
              <HStack justify="space-between">
                <VStack align="start">
                  <Text fontSize="lg" fontWeight="semibold">
                    {category.name}
                  </Text>
                  <Badge colorScheme="purple">{category.cat_type}</Badge>
                  <Text fontSize="sm" color="gray.500">
                    ID: {category.id}
                  </Text>
                </VStack>
                <HStack spacing={2}>
                  <IconButton
                    icon={<BiEdit />}
                    aria-label="Edit category"
                    onClick={() => handleEdit(category)}
                  />
                  <IconButton
                    icon={<TbTrash />}
                    aria-label="Delete category"
                    onClick={() => handleDelete(category)}
                    colorScheme="red"
                  />
                </HStack>
              </HStack>
            </Box>
          ))}
      </SimpleGrid>

      {/* Modal for Adding/Editing Category */}
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader backgroundColor={"brand"}>
            {editMode ? "Edit Category" : "Add New Category"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody backgroundColor={"appGray"}>
            <FormControl id="categoryName" isRequired>
              <FormLabel>Category Name</FormLabel>
              <Input
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </FormControl>

            <FormControl id="categoryType" isRequired mt={4}>
              <FormLabel>Category Type</FormLabel>
              <Select
                placeholder="Select category type"
                value={categoryType}
                onChange={(e) => setCategoryType(e.target.value)}
              >
                <option value="Estates">Estates</option>
                <option value="Services">Services</option>
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter backgroundColor={"appGray"}>
            <Button
              colorScheme="blue"
              onClick={editMode ? handleUpdateCategory : handleAddCategory}
              isLoading={isSubmitting}
            >
              {editMode ? "Update Category" : "Add Category"}
            </Button>
            <Button variant="ghost" ml={3} onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
