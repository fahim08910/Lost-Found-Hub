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

const addAdmin = async (userName) => {
  const q = query(collection(db, "users"), where("userName", "==", userName));
  const querySnapshot = await getDocs(q);
  const postsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return postsData;
};

export const fetchAllAdmin = async () => {
    const q = query(
      collection(db, "users"),
      where("role", "==", "admin")
    );
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return postsData;
  };

export const updateRole = async (userName, updatedData) => {
  const postRef = doc(db, "users", userName);
  await updateDoc(postRef, updatedData);
};

export default addAdmin;
