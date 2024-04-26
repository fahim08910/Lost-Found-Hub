"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  listenForChatUpdates,
  sendMessageToChat,
  uploadImageToChat,
} from "../../actions/messageActions";
import { CameraIcon } from "app/ui/icons/CameraIcon";
import { AiOutlineClose } from "react-icons/ai"; // Import a close icon from react-icons
import { Button } from "@nextui-org/react";

const MessagesComponent = () => {
  const [chats, setChats] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [activeChatId, setActiveChatId] = useState("");
  const messagesEndRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const userName =
    typeof window !== "undefined" ? localStorage.getItem("userName") : "";

  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (val) => {
    setIsLoading(val);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth", // This can be 'auto' or 'smooth'.
        block: "nearest", // Vertical alignment.
        // inline: "nearest",
      });
    }
  };

  const handleChatSelection = (chatId) => {
    setActiveChatId(chatId);
    // Additional logic may be needed here to ensure that messagesEndRef has the latest messages to scroll into view.
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageName(file.name);
      setCurrentMessage(file.name); // Display image name in text input
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const sendImageHandler = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const imageUrl = await uploadImageToChat(activeChatId, userName, image);
      await sendMessageToChat(activeChatId, userName, "", imageUrl);
      setImage(null);
      setImageName("");
      setCurrentMessage("");
      setLoading(false);
      // Call scrollToBottom with a delay to ensure the image has time to render
      setTimeout(scrollToBottom, 100); // Adjust the delay as needed
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image: ", error);
    }
  };

  const ImageModal = ({ isOpen, src, onClose }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <img src={src} className="max-h-[80%] max-w-[80%]" alt="Preview" />
      </div>
    );
  };

  // Function to render the preview of the last message in the chat list
  const renderLastMessagePreview = (lastMessage) => {
    // No last message to display
    if (!lastMessage) return "";

    // Determine the prefix based on the sender
    const senderPrefix = lastMessage.sender === userName ? "You: " : "";

    // Check if the last message is an image
    if (lastMessage.imageUrl) {
      // Determine the message based on the sender
      return lastMessage.sender === userName
        ? "You sent a photo"
        : "Received a photo";
    } else {
      // For text messages, show the first 20 characters followed by '...'
      const messagePreview =
        lastMessage.text.length > 20
          ? `${lastMessage.text.substring(0, 20)}...`
          : lastMessage.text;
      // Return the combined sender prefix and message preview
      return `${senderPrefix}${messagePreview}`;
    }
  };

  useEffect(() => {
    listenForChatUpdates(userName, setChats);
  }, [userName]);

  useEffect(() => {
    scrollToBottom();
  }, [activeChatId, chats]); // Assuming 'chats' contains the messages for the active chat

  const sendMessageHandler = async () => {
    if (!currentMessage.trim()) return;
    try {
      await sendMessageToChat(activeChatId, userName, currentMessage);
      setCurrentMessage("");
      scrollToBottom(); // Scroll to bottom after sending a message
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const activeChat = chats.find((chat) => chat.chatId === activeChatId);

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const toggleMobileChat = (val) => {
    setIsMobileChatOpen(val);
  };

  return (
    <div className="p-10 mt-16 ">
      <div className="flex flex-col md:flex-row">
        {/* Chat list shown by default on mobile and hidden when a chat is active */}
        <div
          className={`w-full md:w-1/3 overflow-y-scroll border-r border-gray-300 p-2.5 ${
            isMobileChatOpen && "hidden md:block"
          }`}
        >
          <h2 className="text-2xl">Chats</h2>
          {chats.map((chat) => {
            const lastMessage = chat.messages[chat.messages.length - 1] || {};
            const isSelected = chat.chatId === activeChatId;
            return (
              <div
                key={chat.chatId}
                onClick={() => {
                  handleChatSelection(chat.chatId);
                  toggleMobileChat(true);
                }}
                className={`p-2.5 my-1.5 cursor-pointer rounded-lg shadow transition-colors duration-200 ${
                  isSelected ? "bg-gray-200" : ""
                }`}
                onMouseEnter={(e) =>
                  e.currentTarget.classList.add("bg-gray-100")
                }
                onMouseLeave={(e) =>
                  e.currentTarget.classList.remove("bg-gray-100")
                }
              >
                <div className="flex justify-between">
                  <strong>
                    {chat.chatId.replace("_", " ").replace(userName, "")}:
                  </strong>
                  {chat.unreadCount > 0 && (
                    <span className="bg-red-500 rounded-full text-white px-2">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <div>{renderLastMessagePreview(lastMessage)}</div>
                {isSelected && chat.lastSeen && <div>Seen</div>}
              </div>
            );
          })}
        </div>

        {activeChat && (
          <div
            className={`flex flex-col h-[80vh] grow   ${
              !isMobileChatOpen &&
              "hidden md:flex  md:h-20 md:items-center md:justify-center"
            }`}
          >
            <div className="flex justify-between items-center border-b border-gray-300 p-2">
              <span className="text-lg font-semibold">
                {activeChat.chatId.replace("_", " ").replace(userName, "")}:
              </span>
              <button
                onClick={() => toggleMobileChat(false)}
                className="block md:hidden text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            <div className="overflow-y-scroll flex-grow ">
              {activeChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex p-1 ${
                    message.sender === localStorage.getItem("userName")
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-2 md:px-4 py-2 max-w-[80%] md:max-w-screen-sm ${
                      message.sender === localStorage.getItem("userName")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className=" break-words">
                      {message.imageUrl ? (
                        <img
                          src={message.imageUrl}
                          alt="chat-img"
                          className="max-w-full h-40 sm:max-w-xs sm:w-auto cursor-pointer rounded-lg"
                          onClick={() => {
                            setModalImage(message.imageUrl);
                            setIsModalOpen(true);
                          }}
                        />
                      ) : (
                        message.text
                      )}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            <div className="flex items-center p-2">
              <div className="flex-grow relative">
                <input
                  className="w-full border-2 rounded-xl hover:border-gray-400 border-gray-200 focus:border-black px-3 py-2  focus:outline-none"
                  type="text"
                  value={image ? imageName : currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type a message..."
                  disabled={!!image}
                />
                <label
                  htmlFor="imageInput"
                  className="absolute right-0 top-0 bottom-0 flex items-center pr-2 cursor-pointer"
                >
                  <CameraIcon className="text-gray-500 w-6 h-6" />
                </label>
                <input
                  id="imageInput"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              <Button
                type="button"
                size="md"
                isLoading={isLoading}
                onClick={() => {
                  if (image) {
                    sendImageHandler();
                  } else {
                    sendMessageHandler();
                  }
                }}
                className={`ml-2 bg-blue-500 hover:bg-black text-white dark`}
              >
                Send
              </Button>
            </div>
          </div>
        )}
        <ImageModal
          isOpen={isModalOpen}
          src={modalImage}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default MessagesComponent;
