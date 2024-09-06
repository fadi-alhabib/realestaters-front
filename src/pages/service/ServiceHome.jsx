import React, { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import useData from "../../hooks/useData";
import useServicesCategories from "../../hooks/useServicesCategories";
import apiService from "../../services/api-service";
import ServiceInfo from "../../components/ServiceInfo";
import WorksGallery from "../../components/WorksGallery";
import ImageModal from "../../components/ImageModal";
import EditExtraModal from "../../components/EditExtraModal";

export default function ServiceHome() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [refetch, setRefetch] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const { data: service, isLoading } = useData(
    "extras/me",
    {
      headers: { Authorization: localStorage.getItem("token") },
    },
    [refetch]
  );
  const { data: categories, isLoading: categoriesIsLoading } =
    useServicesCategories();

  const handleImageClick = (image) => {
    setSelectedImage(image);
    onOpen();
  };

  const handleEditClick = () => {
    setFormData({
      name: service.extras.name,
      contact_number: service.extras.contact_number,
      address: service.extras.address,
      description: service.extras.description,
      category_id: service.extras.category_id,
    });
    onEditOpen();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await apiService.post(
        `extras/${service.extras.id}`,
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        refetchData();
        onEditClose();
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while updating:", error);
    }
  };
  const refetchData = () => {
    setRefetch(refetch + 1);
  };

  if (isLoading || categoriesIsLoading) {
    return (
      <Container maxW="container.xl" p={4}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (!service) {
    return (
      <Container maxW="container.xl" p={4}>
        <Text>Service not found.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={6} align="stretch">
        <ServiceInfo service={service.extras} onEditClick={handleEditClick} />

        <WorksGallery
          works={service.extras.works}
          onImageClick={handleImageClick}
          onDelete={refetchData}
          onAdd={refetchData}
        />

        <ImageModal
          isOpen={isOpen}
          onClose={onClose}
          selectedImage={selectedImage}
        />

        <EditExtraModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          formData={formData}
          categories={categories}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </VStack>
    </Container>
  );
}
