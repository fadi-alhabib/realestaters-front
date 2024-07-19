import apiService from "./api-service";

export const getOrCreateChat = (userId, token) => {
  return apiService.get(`/chat/${userId}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const fetchMessages = (chatId, token) => {
  return apiService.get(`/messages/${chatId}`, {
    headers: {
      Authorization: token,
    },
  });
};

export const sendMessage = (chatId, senderId, message, token) => {
  return apiService.post(
    "/send-message",
    {
      chat_id: chatId,
      sender_id: senderId,
      message: message,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const fetchUserChats = (token) => {
  return apiService.get("/user-chats", {
    headers: {
      Authorization: token,
    },
  });
};
