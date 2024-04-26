import { db, storage } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const fetchEditProfile = async (userName) => {
  const q = query(
    collection(db, "users"),
    where("userName", "==", userName)
  );
  const querySnapshot = await getDocs(q);
  const postsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return postsData;
};

export const deletePost = async (postId) => {
  await deleteDoc(doc(db, "found-post", postId));
};
// Add this function to your Firebase actions file

export const updatePost = async (userName, updatedData, file) => {
  const postRef = doc(db, "users", userName);

  const randomFolderName = `edited_${Date.now()}_${Math.floor(
    Math.random() * 1000
  )}`;

  if (file) {
    const storageRef = ref(
      storage,
      `found-posts/${randomFolderName}/${file.name}`
    );
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    updatedData = {
      ...updatedData,
      pictures: [photoURL],
      imgPath: `found-posts/${randomFolderName}/`,
    }; // Assuming you want to store the image URL in the `pictures` field
  }
  await updateDoc(postRef, updatedData);
};

export default fetchEditProfile;
