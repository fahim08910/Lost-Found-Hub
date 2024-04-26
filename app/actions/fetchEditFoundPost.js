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

const fetchEditFoundPosts = async (userName) => {
  const q = query(
    collection(db, "found-post"),
    where("userName", "==", userName)
  );
  const querySnapshot = await getDocs(q);
  const postsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    postTime: doc.data().postTime?.toDate?.() || new Date(doc.data().postTime),
  }));
  return postsData;
};

export const deletePost = async (postId) => {
  await deleteDoc(doc(db, "found-post", postId));
};
// Add this function to your Firebase actions file

export const updatePost = async (postId, updatedData, file) => {
  const postRef = doc(db, "found-post", postId);

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

export default fetchEditFoundPosts;
