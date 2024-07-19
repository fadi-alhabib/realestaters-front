import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiService from "../services/api-service";

function BuyerTabPanel() {
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("type", "Customer");
    formData.append("fullname", fullnameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);

    apiService
      .post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast({
          title: `Welcome on board ${response.data.user.fullname}.`,
          description: "Please login to your account",
          status: "success",
          duration: 4000,
          isClosable: true,
          colorScheme: "purple",
          position: "top-right",
        });
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            title: "Wrong Email!",
            description: error.response.data.message,
            duration: 4000,
            isClosable: true,
            position: "top-right",
            status: "error",
          });
          return;
        }
        toast({
          title: "Something Wrong happend.",
          description: "Pleas Try again",
          duration: 4000,
          isClosable: true,
          position: "top-right",
          status: "error",
        });
      });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <FormLabel fontWeight={"bold"}>Full Name</FormLabel>
        <Input
          ref={fullnameRef}
          borderColor={"grey"}
          focusBorderColor="brand"
          type="text"
          placeholder="Enter your Full Name"
          required
        />
      </FormControl>
      <FormControl mt={5}>
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
          Register
        </Button>
      </Center>
    </form>
  );
}

function SellerTabPanel() {
  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [idImagePreview, setIdImagePreview] = useState(null);
  const [idImage, setIdImage] = useState(null);
  const idImageRef = useRef(null);

  const [profilePreview, setProfilePreview] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const profileImageRef = useRef(null);
  const handleImageChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const toast = useToast();
  const navigate = useNavigate();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("type", "Seller");
    formData.append("fullname", fullnameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    formData.append("id_image", idImage);
    formData.append("profileImage", profileImage);

    apiService
      .post("/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast({
          title: `Welcome on board ${response.data.user.fullname}.`,
          description: "Please login to your account",
          status: "success",
          duration: 4000,
          isClosable: true,
          colorScheme: "purple",
          position: "top-right",
        });
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            title: "Wrong Email!",
            description: error.response.data.message,
            duration: 4000,
            isClosable: true,
            position: "top-right",
            status: "error",
          });
          return;
        }
        toast({
          title: "Something Wrong happend.",
          description: "Pleas Try again",
          duration: 4000,
          isClosable: true,
          position: "top-right",
          status: "error",
        });
      });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl>
        <Center>
          <FormLabel fontWeight={"bold"}>Profile Picture</FormLabel>
        </Center>
        <Input
          type="file"
          hidden
          ref={profileImageRef}
          onChange={(e) =>
            handleImageChange(e, setProfileImage, setProfilePreview)
          }
          required
        />
        <Center>
          <Avatar
            width={"140px"}
            height={"140px"}
            cursor={"pointer"}
            onClick={() => {
              profileImageRef.current.click();
            }}
            size="xl"
            src={profilePreview}
            bg={profilePreview ? "transparent" : "gray.200"}
          />
        </Center>
      </FormControl>

      <FormControl mt={5}>
        <FormLabel fontWeight={"bold"}>Full Name</FormLabel>
        <Input
          ref={fullnameRef}
          borderColor={"grey"}
          focusBorderColor="brand"
          type="text"
          placeholder="Enter your Full Name"
          required
        />
      </FormControl>
      <FormControl mt={5}>
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
      <FormControl mt={5}>
        <Input
          type="file"
          hidden
          ref={idImageRef}
          onChange={(e) => handleImageChange(e, setIdImage, setIdImagePreview)}
          required
        />
        <Box
          border="1px"
          borderColor="grey"
          borderRadius="md"
          p={4}
          cursor="pointer"
          onClick={() => idImageRef.current.click()}
          _hover={{ borderColor: "brand" }}
        >
          <Center>
            <Text>Upload ID Image</Text>
          </Center>
          {idImagePreview && (
            <Image
              src={idImagePreview}
              alt="Image preview"
              mt={4}
              fit={"fill"}
              width={"full"}
              height={"25vh"}
            />
          )}
        </Box>
      </FormControl>
      <Center mt={6}>
        <Button type="submit" width={"full"} bgColor={"brand"}>
          Register
        </Button>
      </Center>
    </form>
  );
}

function RegisterForm() {
  return (
    <>
      <Tabs isFitted variant={"unstyled"}>
        <TabList>
          <Tab>Customer</Tab>
          <Tab>Seller</Tab>
        </TabList>
        <TabIndicator mt="-1.5px" height="2px" bg="brand" borderRadius="1px" />
        <TabPanels mt={10}>
          <TabPanel minWidth={"35vw"}>
            <BuyerTabPanel />
          </TabPanel>
          <TabPanel minWidth={"35vw"}>
            <SellerTabPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function RegisterHeader() {
  return (
    <Box textAlign={"center"} mb={15}>
      <Heading>Register</Heading>
    </Box>
  );
}

function LoginSection() {
  return (
    <Box mt={7} alignContent={"start"}>
      <Text>
        Already have and Account?{" "}
        <Link to={"/login"} color={"brand"}>
          <Button variant={"link"} color={"brand"} fontSize={"lg"}>
            Login
          </Button>
        </Link>
      </Text>
    </Box>
  );
}
const Register = () => {
  return (
    <Flex
      minHeight={"100vh"}
      width={"full"}
      align={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <Box bgColor={"black"} borderRadius={"20"} p={20}>
        <RegisterHeader />
        <RegisterForm />
        <LoginSection />
      </Box>
    </Flex>
  );
};

export default Register;
