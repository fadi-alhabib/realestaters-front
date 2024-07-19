import {
  Box,
  Button,
  Container,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import CustomLink from "./CustomLink";
import apiService from "../services/api-service";

const SellerNavbar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    apiService
      .post("/logout", null, {
        headers: { Authorization: token },
      })
      .then((response) => {
        localStorage.clear();
        toast({
          title: "Success!",
          description: "You have been logged out successfuly",
          colorScheme: "purple",
          status: "success",
          isClosable: true,
          position: "top-right",
          duration: 4000,
        });
        navigate("/");
      });
  };
  return (
    <HStack bgColor={"black"} justify="space-between" align="center" p={"5"}>
      <Text fontSize="xl" fontWeight="bold">
        Real Estaters
      </Text>
      <HStack>
        <CustomLink to={"/seller/"}>
          <Text>My Properties</Text>
        </CustomLink>
        <CustomLink to={"/seller/add-property"}>
          <Text>Add Property</Text>
        </CustomLink>
        <CustomLink to={"/seller/inbox"}>
          <Text>Inbox</Text>
        </CustomLink>
      </HStack>
      <Button bgColor={"brand"} onClick={handleLogout}>
        Logout
      </Button>
    </HStack>
  );
};

export default SellerNavbar;
