import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { db } from "../../app/firebase/config";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import Footer from "app/ui/utilComponents/footer";
import Header from "app/ui/utilComponents/header";
import { IoMdCloseCircle } from "react-icons/io";
import LoadingIndicator from "app/ui/utilComponents/loading";
import { AiOutlineClose } from "react-icons/ai"; // Import a close icon from react-icons

import "pages/globals.css";

const ChatPage = () => {
  const router = useRouter();
  const { userName: receiverUserName } = router.query; // Receiver's userName from URL
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatDocumentId, setChatDocumentId] = useState("");
  const messagesEndRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(null);

  useEffect(() => {
    const persistedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setisLoggedIn(persistedIsLoggedIn);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!receiverUserName || !isLoggedIn) {
      setLoading(false);
      return;
    }

    const senderUserName = localStorage.getItem("userName");
    if (!senderUserName) {
      setLoading(false);
      return;
    }

    const chatId = [senderUserName, receiverUserName].sort().join("_");
    setChatDocumentId(chatId);
    const unsubscribe = listenToMessages(chatId);
    return () => unsubscribe(); // Cleanup function to unsubscribe from Firestore updates
  }, [receiverUserName, isLoggedIn]); // Added isLoggedIn as a dependency

  const listenToMessages = (chatId) => {
    const chatDocRef = doc(db, "chats", chatId);
    return onSnapshot(chatDocRef, (docSnapshot) => {
      setLoading(false);
      if (docSnapshot.exists()) {
        setMessages(docSnapshot.data().messages || []);
      }
    });
  };

  if (isLoggedIn === null) {
    return (
      <div className="items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isLoggedIn === false) {
    window.location.href = "/lost-found-hub/logintocontinue";
    return null; // Ensure React has a return value even though the page is redirecting
  }

  // Function to handle sending messages
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatDocumentId) return;

    const senderUserName = localStorage.getItem("userName");
    const chatDocRef = doc(db, "chats", chatDocumentId);

    const msg = newMessage;
    setNewMessage("");
    try {
      const docSnapshot = await getDoc(chatDocRef);
      let messages = [];

      if (docSnapshot.exists()) {
        // Fetch current messages and append the new one
        const data = docSnapshot.data();
        messages = data.messages ? [...data.messages] : [];
      }

      // Append new message with client-side timestamp
      const newMessageData = {
        sender: senderUserName,
        text: msg,
        timestamp: new Date(), // Use client-side timestamp for consistency
      };
      messages.push(newMessageData);

      // Update or set the document with the new messages array
      await setDoc(chatDocRef, { messages }, { merge: true });

      // setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const ImageModal = ({ isOpen, src, onClose }) => {
    if (!isOpen) return null;

    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <img
          src={src}
          style={{ maxHeight: "80%", maxWidth: "80%" }}
          alt="Preview"
        />
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleChat = () => {
    window.location.href = "/lost-and-found-hub-chat/chat";
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow bg-slate-400 text-black ">
        <div className="p-4 mt-16 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="relative p-2 md:p-4 flex flex-col w-full md:w-auto md:max-w-[60%] h-full md:h-auto md:max-h-[60%] bg-white mx-auto my-auto rounded-lg">
            <div className="flex justify-between items-center border-b border-gray-300 p-2">
              <span className="text-lg font-semibold">
                Chat with {receiverUserName}
              </span>
              <button
                onClick={toggleChat}
                className="block  text-gray-500 hover:text-gray-700"
              >
                <AiOutlineClose size={40} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto mt-8">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex p-1 ${
                    message.sender === localStorage.getItem("userName")
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg px-2 md:px-4 py-2 max-w-[80%] ${
                      message.sender === localStorage.getItem("userName")
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
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
                      <>
                        <p className="break-words">{message.text}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />{" "}
              {/* Empty div to mark the end of messages */}
            </div>
            <form onSubmit={sendMessage}>
              <div className="flex justify-center items-center h-16">
                <input
                  type="text"
                  className="w-full border-2 rounded-xl hover:border-gray-400 border-gray-200 focus:border-black px-3 py-2  focus:outline-none"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-2 rounded-xl py-2 px-2 md:px-4 "
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <ImageModal
          isOpen={isModalOpen}
          src={modalImage}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ChatPage;
