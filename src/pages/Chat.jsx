// src/ChatScreen.js
import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  IconButton,
  Avatar,
  Flex,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "User 1",
    avatar: "https://bit.ly/dan-abramov",
  },
  {
    id: 2,
    name: "User 2",
    avatar: "https://bit.ly/ryan-florence",
  },
  // Add more users here
];

const initialMessages = [
  {
    id: 1,
    user: "User 1",
    avatar: "https://bit.ly/dan-abramov",
    text: "Hey there! How's it going?",
    time: "12:30 PM",
  },
  {
    id: 2,
    user: "User 2",
    avatar: "https://bit.ly/ryan-florence",
    text: "I'm good, thanks! How about you?",
    time: "12:32 PM",
  },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(users[0]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: "User 1",
        avatar: "https://bit.ly/dan-abramov",
        text: inputValue,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Fetch messages for the selected user
    // For simplicity, we're using the same initial messages
    setMessages(initialMessages);
  };

  return (
    <Grid templateColumns="300px 1fr" h="100vh">
      <GridItem
        p={4}
        color="white"
        borderRight="1px solid"
        borderColor="gray.700"
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Inbox
        </Text>
        <VStack spacing={4} align="stretch">
          {users.map((user) => (
            <HStack
              key={user.id}
              p={3}
              bg={selectedUser.id === user.id ? "brand" : "black"}
              borderRadius="md"
              cursor="pointer"
              _hover={{ bgColor: "appGray" }}
              onClick={() => handleUserSelect(user)}
            >
              <Avatar src={user.avatar} name={user.name} />
              <Text fontWeight={"bold"}>{user.name}</Text>
            </HStack>
          ))}
        </VStack>
      </GridItem>
      <GridItem>
        <Flex direction="column" h="100%">
          <Box
            p={4}
            bg="appGray"
            color="white"
            fontWeight="bold"
            fontSize="lg"
            textAlign="center"
          >
            Chat with {selectedUser.name}
          </Box>
          <Box flex="1" overflowY="auto" p={4}>
            <VStack spacing={4} align="stretch">
              {messages.map((msg) => (
                <HStack
                  key={msg.id}
                  align="start"
                  justify={msg.user === "User 1" ? "flex-end" : "flex-start"}
                >
                  {msg.user !== "User 1" && (
                    <Avatar src={msg.avatar} name={msg.user} />
                  )}
                  <Box
                    bg={msg.user === "User 1" ? "purple.900" : "appGray"}
                    p={3}
                    borderRadius="md"
                    boxShadow="md"
                    maxWidth="80%"
                  >
                    <Text fontWeight="bold" color="white">
                      {msg.user}
                    </Text>
                    <Text color="white">{msg.text}</Text>
                    <Text fontSize="sm" color="gray.400" textAlign="right">
                      {msg.time}
                    </Text>
                  </Box>
                  {msg.user === "User 1" && (
                    <Avatar src={msg.avatar} name={msg.user} />
                  )}
                </HStack>
              ))}
            </VStack>
          </Box>
          <HStack spacing={4} p={4} bg="appGray" boxShadow="sm">
            <Input
              placeholder="Type a message..."
              flex="1"
              bg="black"
              borderColor={"grey"}
              focusBorderColor="brand"
              borderRadius="full"
              px={4}
              color="white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Send message"
              icon={<FaPaperPlane />}
              borderRadius="full"
              onClick={handleSendMessage}
            />
          </HStack>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ChatScreen;
