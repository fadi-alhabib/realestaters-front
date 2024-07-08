import { Flex, Icon, Text } from "@chakra-ui/react";

const AchievementCard = ({ icon, title, text }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      bg="black"
      p={5}
      borderRadius="md"
      boxShadow="xl"
      m={2}
    >
      <Icon as={icon} w={12} h={12} color="brand" mb={4} />
      <Text fontSize="xl" fontWeight="bold" color="brand">
        {title}
      </Text>
      <Text color="gray.300" mt={2}>
        {text}
      </Text>
    </Flex>
  );
};

export default AchievementCard;
