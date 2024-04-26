import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { storage } from "../firebase/config"; // Ensure you've initialized Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImageToChat = async (chatId, userName, imageFile) => {
  const u_name = `image_${Date.now()}_${Math.floor(Math.random() * 1000)}_${
    imageFile.name
  }`;

  const storageRef = ref(storage, `chats/${chatId}/${u_name}`);
  await uploadBytes(storageRef, imageFile);
  const imageUrl = await getDownloadURL(storageRef);
  return imageUrl;
};
export const getChatsForUser = async (userName) => {
  if (!userName) return [];

  const chatsRef = collection(db, "chats");
  const snapshot = await getDocs(chatsRef);
  return snapshot.docs
    .filter((doc) => doc.id.includes(userName))
    .map((doc) => ({
      chatId: doc.id,
      messages: doc.data().messages || [],
    }));
};

export const listenForChatUpdates = (userName, setChats) => {
  if (!userName) return;

  getChatsForUser(userName).then((initialChats) => {
    setChats(initialChats);
    initialChats.forEach((chat) => {
      const chatDocRef = doc(db, "chats", chat.chatId);
      onSnapshot(chatDocRef, (docSnapshot) => {
        const updatedChat = {
          chatId: docSnapshot.id,
          messages: docSnapshot.data().messages || [],
        };
        setChats((currentChats) => {
          const index = currentChats.findIndex(
            (c) => c.chatId === updatedChat.chatId
          );
          if (index > -1) {
            return [
              ...currentChats.slice(0, index),
              updatedChat,
              ...currentChats.slice(index + 1),
            ];
          }
          return [...currentChats, updatedChat];
        });
      });
    });
  });
};

export const sendMessageToChat = async (
  chatId,
  userName,
  message,
  imageUrl = ""
) => {
  if (!message.trim() && !imageUrl) return;

  const chatDocRef = doc(db, "chats", chatId);
  const newMessage = {
    sender: userName,
    text: message,
    imageUrl,
    timestamp: new Date(),
  };

  await updateDoc(chatDocRef, {
    messages: arrayUnion(newMessage),
    lastUpdated: serverTimestamp(),
  });
};
