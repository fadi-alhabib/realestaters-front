import { Box, Button, Flex, HStack, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import navBg from "../assets/nav-background.png";
import apiService from "../services/api-service";
import CustomLink from "./CustomLink";
const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const toast = useToast();
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
    <Box bgColor={"appGray"}>
      <Box bgImage={navBg} textAlign="center" mt={2}>
        <Text fontSize="lg" fontWeight={"bold"}>
          ✨Discover Your Dream Property with Real Estaters
        </Text>
      </Box>
      <Flex justify="space-between" align="center" p={"5"}>
        <Text fontSize="xl" fontWeight="bold">
          Real Estaters
        </Text>
        <HStack spacing={5}>
          <CustomLink to={"/"}>
            <Text>Home</Text>
          </CustomLink>
          <CustomLink to={"/about"}>
            <Text>About</Text>
          </CustomLink>
          <CustomLink to={"/services"}>
            <Text>Services</Text>
          </CustomLink>
          <CustomLink to={"/properties"}>
            <Text>Properties</Text>
          </CustomLink>
        </HStack>
        {token ? (
          <Button bgColor={"brand"} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link to={"/login"}>
            <Button
              ml={4}
              bg="brand"
              color="white"
              _hover={{ bg: "blackAlpha.700" }}
            >
              Login
            </Button>
          </Link>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
