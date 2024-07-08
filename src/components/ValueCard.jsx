import { Box, Icon, Text } from "@chakra-ui/react";

const ValueCard = ({ icon, title, text }) => {
  return (
    <Box bg="black" borderRadius="md" p={5} textAlign="center">
      <Icon as={icon} w={10} h={10} color="brand" />
      <Text fontSize="xl" fontWeight="bold" color="brand" mt={3}>
        {title}
      </Text>
      <Text color="grey" mt={2}>
        {text}
      </Text>
    </Box>
  );
};

export default ValueCard;
