// Assuming the file is at ./app/actions/fetchFoundPosts.js
import { db } from "../firebase/config";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

// Make sure the category names here match those in your database
const FOUND_POST_COLLECTION = "report-post";
const POST_TIME_FIELD = "postTime";
const FOUND_DATE_FIELD = "foundDate"; // Adjust if necessary for your Firestore field name
const POST_NUMBER_FIELD = "postNumber"; // Adjust if necessary for your Firestore field name

export const fetchReportedPost = async (searchCategory, searchTerm) => {
  let q = query(
    collection(db, FOUND_POST_COLLECTION),
    orderBy(POST_TIME_FIELD, "desc")
  );

  // Fetch all documents
  const querySnapshot = await getDocs(q);
  const allPosts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    postTime: doc.data().postTime.toDate(), // Convert Firestore Timestamp to JavaScript Date object
  }));

  if (searchTerm !== "" && searchCategory) {
    if (searchCategory === POST_NUMBER_FIELD) {
      const numericSearchTerm = parseInt(searchTerm, 10); // Ensure we convert searchTerm to a number
      return allPosts.filter(
        (post) => post[POST_NUMBER_FIELD] === numericSearchTerm
      );
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      return allPosts.filter((post) => {
        if (typeof post[searchCategory] === "string") {
          return post[searchCategory].toLowerCase().includes(searchTermLower);
        } else if (
          searchCategory === FOUND_DATE_FIELD &&
          post[searchCategory]
        ) {
          return post[searchCategory] === searchTerm;
        } else {
          return post[searchCategory] === searchTerm;
        }
      });
    }
  }

  return allPosts; // Return all posts if no search term is provided
};
