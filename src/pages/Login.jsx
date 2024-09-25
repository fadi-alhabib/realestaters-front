import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/api-service";

function LoginForm() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toast = useToast();
  const navigate = useNavigate();
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    apiService
      .post("/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast({
          title: `Welcome back ${response.data.user.fullname}.`,
          status: "success",
          duration: 4000,
          isClosable: true,
          colorScheme: "purple",
          position: "top-right",
        });
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log(response.data.user);
        if (response.data.user.type === "Seller") {
          navigate("/seller");
        } else if (response.data.user.type === "Admin") {
          navigate("/admin");
        } else if (response.data.user.type === "ServiceAdmin") {
          navigate("/service");
        } else if (response.data.user.type === "Manager") {
          navigate("/manager");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {});
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel fontWeight={"bold"}>Email Address</FormLabel>
        <Input
          ref={emailRef}
          borderColor={"grey"}
          focusBorderColor="brand"
          type="email"
          placeholder="Enter your Email Address"
          required
        />
      </FormControl>

      <FormControl mt={5}>
        <FormLabel fontWeight={"bold"}>Password</FormLabel>
        <Input
          ref={passwordRef}
          focusBorderColor="brand"
          borderColor={"grey"}
          type="password"
          placeholder="Enter your Password"
          required
        />
      </FormControl>

      <Center mt={6}>
        <Button type="submit" width={"full"} bgColor={"brand"}>
          Login
        </Button>
      </Center>
    </form>
  );
}

function LoginHeader() {
  return (
    <Box textAlign={"center"}>
      <Heading>Login</Heading>
    </Box>
  );
}

function RegisterSection() {
  return (
    <Box mt={7} alignContent={"start"}>
      <Text>
        Don't have and Account?{" "}
        <Link to={"/register"} color={"brand"}>
          <Button variant={"link"} color={"brand"} fontSize={"lg"}>
            Register
          </Button>
        </Link>
      </Text>
    </Box>
  );
}

const Login = () => {
  return (
    <Flex
      minHeight={"100vh"}
      width={"full"}
      align={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Box bgColor={"black"} borderRadius={"20"} p={20} minWidth={"35vw"}>
        <LoginHeader />
        <LoginForm />
        <RegisterSection />
      </Box>
    </Flex>
  );
};

export default Login;
