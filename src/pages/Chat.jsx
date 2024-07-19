import React, { useEffect, useRef, useState, useCallback } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import apiService from "../services/api-service";
import { useLocation } from "react-router-dom";
import Pusher from "pusher-js";

const ChatScreen = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const newUser = location.state;

  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for sending messages
  const messagesRef = useRef(null);

  const fetchMessages = useCallback(
    (chatId) => {
      apiService
        .get(`/messages/${chatId}`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setMessages(response.data.messages);
        });
    },
    [token]
  );

  const handleSendMessage = useCallback(() => {
    if (inputValue.trim() === "") return;

    setLoading(true); // Set loading to true when starting to send a message

    apiService
      .post(
        "/send-message",
        {
          chat_id: selectedChat.chat_id,
          message: inputValue.trim(),
        },
        { headers: { Authorization: token } }
      )
      .then(() => {
        setInputValue("");
        setLoading(false); // Set loading to false when the message is sent
      })
      .catch(() => {
        setLoading(false); // Set loading to false in case of error
      });
  }, [inputValue, selectedChat, token]);

  const handleChatSelect = useCallback(
    (selected) => {
      setSelectedChat(selected);
      fetchMessages(selected.chat_id);
    },
    [fetchMessages]
  );

  useEffect(() => {
    apiService
      .get("/user-chats", { headers: { Authorization: token } })
      .then((response) => {
        const fetchedChats = response.data.chats;
        if (newUser) {
          const chatExist = fetchedChats.some(
            (ch) => ch.user.id === newUser.user.id
          );
          if (!chatExist) {
            setChats([newUser, ...fetchedChats]);
          } else {
            setChats(fetchedChats);
          }
          handleChatSelect(newUser);
        } else {
          setChats(fetchedChats);
          if (fetchedChats.length > 0) {
            handleChatSelect(fetchedChats[0]);
          }
        }
      });
  }, [newUser, handleChatSelect, token]);

  useEffect(() => {
    const pusher = new Pusher("b0033561c05026152189", {
      cluster: "eu",
    });

    if (selectedChat) {
      const channel = pusher.subscribe(`chat.${selectedChat.chat_id}`);
      channel.bind("message", (data) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [selectedChat]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <Grid templateColumns="300px 1fr" h="80vh">
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
          {chats.map((chat) => (
            <HStack
              key={chat.user.id}
              p={3}
              bg={
                selectedChat && selectedChat.user.id === chat.user.id
                  ? "brand"
                  : "black"
              }
              borderRadius="md"
              cursor="pointer"
              _hover={{ bgColor: "appGray" }}
              onClick={() => handleChatSelect(chat)}
            >
              <Avatar src={chat.user.profile_image} name={chat.user.fullname} />
              <Text fontWeight="bold">{chat.user.fullname}</Text>
            </HStack>
          ))}
        </VStack>
      </GridItem>
      {selectedChat && (
        <GridItem>
          <Flex direction="column" h="80vh">
            <Box
              p={4}
              bg="appGray"
              color="white"
              fontSize="lg"
              fontWeight="bold"
              textAlign="center"
            >
              Chat with {selectedChat.user.fullname}
            </Box>
            <Box flex="1" overflowY="auto" p={4}>
              <VStack spacing={4} align="stretch">
                {messages.map((msg, index) => (
                  <HStack
                    key={index}
                    align="start"
                    justify={
                      msg.sender.id === user.id ? "flex-end" : "flex-start"
                    }
                  >
                    {msg.sender.id !== user.id && (
                      <Avatar
                        src={msg.sender.profile_image}
                        name={msg.sender.fullname}
                      />
                    )}
                    <Box
                      bg={msg.sender.id === user.id ? "purple.700" : "gray.700"}
                      p={3}
                      borderRadius="md"
                      boxShadow="md"
                      maxWidth="80%"
                    >
                      <Text fontWeight="bold" color="white">
                        {msg.sender.fullname}
                      </Text>
                      <Text color="white" maxW={"60vw"}>
                        {msg.message}
                      </Text>
                      <Text fontSize="sm" color="gray.400" textAlign="right">
                        {new Date(msg.created_at).toTimeString().split(" ")[0]}
                      </Text>
                    </Box>
                    {msg.sender.id === user.id && (
                      <Avatar
                        src={msg.sender.profile_image}
                        name={msg.sender.fullname}
                      />
                    )}
                  </HStack>
                ))}
                <div ref={messagesRef}></div>
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
                isDisabled={loading}
              />
              <IconButton
                colorScheme="blue"
                aria-label="Send message"
                icon={loading ? <Spinner size="sm" /> : <FaPaperPlane />}
                borderRadius="full"
                onClick={handleSendMessage}
                isDisabled={loading}
              />
            </HStack>
          </Flex>
        </GridItem>
      )}
    </Grid>
  );
};

export default ChatScreen;
