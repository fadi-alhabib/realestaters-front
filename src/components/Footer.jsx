import { Box, Text, Link, HStack, Icon } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import footerBg from "../assets/footer-bg.png";
const Footer = () => {
  return (
    <HStack
      bgColor={"gray.800"}
      p={10}
      bgImage={footerBg}
      justify={"space-between"}
    >
      <Text fontSize={"2xl"} fontWeight={"bold"}>
        @2024 Real Estaters. All Rights Reserved.
      </Text>
      <Box color={"white"}>
        <Icon as={FaFacebook} boxSize={8} mr={5} />
        <Icon as={FaInstagram} boxSize={8} mr={5} />
        <Icon as={FaLinkedin} boxSize={8} mr={5} />
        <Icon as={FaTwitter} boxSize={8} mr={5} />
      </Box>
    </HStack>
  );
};

export default Footer;
