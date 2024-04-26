import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";

// Function to check if a userId is unique in the Firestore database
// Function to check if a userName is unique in the Firestore database
export const checkUserNameUnique = async (userName) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userName", "==", userName));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty; // Returns true if no matching documents found, indicating userName is unique
};

// Function to sign up a new user with Firebase Authentication and Firestore
export const signUp = async (name, email, password, phoneNumber, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await sendEmailVerification(user);

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      phoneNumber,
      userName,
      role: "regular",
      login: false,
      verified: false,
    });
    return {
      user,
      error: null,
      message:
        "Verification email sent. Please check your email to verify your account.",
    };
  } catch (error) {
    console.error("Error signing up:", error.message);
    return { user: null, error: error.message };
  }
};
