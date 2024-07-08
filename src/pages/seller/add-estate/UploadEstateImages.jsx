import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../../../services/api-service";

const EstateImageUpload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [propertyImages, setPropertyImages] = useState([]);
  const [validationPapers, setValidationPapers] = useState([]);
  const toast = useToast();
  const estate = location.state?.estate;

  const handleFilesChange = (e, setFiles) => {
    const newFiles = Array.from(e.target.files);
    const imageFiles = newFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Only image files are allowed.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    const newFilesWithPreview = imageFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFilesWithPreview]);
  };

  const handleRemoveFile = (index, setFiles) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    propertyImages.forEach((fileObj, index) => {
      formData.append(`property[${index}]`, fileObj.file);
    });

    validationPapers.forEach((fileObj, index) => {
      formData.append(`images[${index}]`, fileObj.file);
    });

    Object.keys(estate).forEach((key) => {
      formData.append(key, estate[key]);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await apiService.post("estates/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: token,
        },
      });
      toast({
        title: "Estate added successfully.",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/"); // Navigate to home or another page
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.response?.data?.message || "Unable to add estate.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" borderColor="gray.300">
      <form onSubmit={handleSubmit}>
        <FormControl id="property-images" mb={4}>
          <FormLabel>Upload Property Images</FormLabel>
          <Button
            as="label"
            htmlFor="property-upload"
            cursor="pointer"
            size="lg"
            colorScheme="brand"
            color="white"
            leftIcon={<FiUpload />}
          >
            Click To Upload Property Images
          </Button>
          <Input
            id="property-upload"
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleFilesChange(e, setPropertyImages)}
          />
        </FormControl>
        <VStack align="stretch" spacing={3} mb={4}>
          {propertyImages.map((fileObj, index) => (
            <HStack
              key={index}
              justify="space-between"
              p={2}
              borderWidth={1}
              borderRadius="md"
            >
              <HStack>
                <Image
                  boxSize="50px"
                  objectFit="cover"
                  src={fileObj.preview}
                  alt={`preview-property-${index}`}
                  borderRadius="md"
                />
                <Text>{fileObj.file.name}</Text>
              </HStack>
              <IconButton
                icon={<Icon as={FaDeleteLeft} />}
                size="sm"
                colorScheme="red"
                onClick={() => handleRemoveFile(index, setPropertyImages)}
              />
            </HStack>
          ))}
        </VStack>

        <FormControl id="validation-papers" mb={4}>
          <FormLabel>Upload Validation Papers</FormLabel>
          <Button
            as="label"
            htmlFor="validation-upload"
            cursor="pointer"
            size="lg"
            colorScheme="brand"
            color="white"
            leftIcon={<FiUpload />}
          >
            Click To Upload Validation Papers
          </Button>
          <Input
            id="validation-upload"
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(e) => handleFilesChange(e, setValidationPapers)}
          />
        </FormControl>
        <VStack align="stretch" spacing={3}>
          {validationPapers.map((fileObj, index) => (
            <HStack
              key={index}
              justify="space-between"
              p={2}
              borderWidth={1}
              borderRadius="md"
            >
              <HStack>
                <Image
                  boxSize="50px"
                  objectFit="cover"
                  src={fileObj.preview}
                  alt={`preview-validation-${index}`}
                  borderRadius="md"
                />
                <Text>{fileObj.file.name}</Text>
              </HStack>
              <IconButton
                icon={<Icon as={FaDeleteLeft} />}
                size="sm"
                colorScheme="red"
                onClick={() => handleRemoveFile(index, setValidationPapers)}
              />
            </HStack>
          ))}
        </VStack>

        <Button type="submit" mt={4} colorScheme="teal" size="lg" width="full">
          Add Estate
        </Button>
      </form>
    </Box>
  );
};

export default EstateImageUpload;
