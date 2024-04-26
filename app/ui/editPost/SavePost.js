"use client";
import React, { useState, useEffect } from "react";
import { fetchSavedPosts } from "../../actions/savePost";
import Link from "next/link";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import LoadingIndicator from "../utilComponents/loading";
import PostCard from "../utilComponents/postCard";
import ImageModal from "../utilComponents/imageModel";


const SavePostComponent = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setLoading(true);
    const persistedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (persistedIsLoggedIn) {
      setIsLoggedIn(true);
    }
    const getSavedPosts = async () => {
      setLoading(true);
      const posts = await fetchSavedPosts();
      setSavedPosts(posts);
      setLoading(false);
    };

    getSavedPosts();
  }, [isLoggedIn]);

  const handleRemovePost = async (postId) => {
    console.log(postId);
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("User not found. Please log in.");
      return;
    }

    const userLikesRef = doc(db, "savePosts", userName);

    // Filter out the post to be removed
    const updatedPosts = savedPosts.filter((post) => post.postId !== postId);

    // Update the document with the filtered posts
    await updateDoc(userLikesRef, {
      likedPosts: updatedPosts,
    });

    // Update local state
    setSavedPosts(updatedPosts);
  };

  // Function to format Firestore timestamp to readable date
  const formatDate = (timestamp) => {
    let date;

    if (timestamp?.toDate) {
      // If timestamp is a Firestore Timestamp object
      date = timestamp.toDate();
    } else if (timestamp?.seconds) {
      // If timestamp is a serialized Firestore Timestamp object (e.g., from JSON)
      date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
    } else {
      // If timestamp is already a JavaScript Date object or undefined/null
      date = timestamp ? new Date(timestamp) : new Date();
    }

    return date.toLocaleDateString("en-US"); // Format date as MM/DD/YYYY
  };

  // if(!isLoggedIn){
  //   window.location.href = '/lost-found-hub/login';
  // }

  const openModal = (url) => setSelectedImage(url);
  const closeModal = () => setSelectedImage(null);

  return (
    <div>
      <h2 className="text-4xl text-center mx-auto pb-5">Saved Posts</h2>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div>
          {savedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 h-auto">
              {savedPosts.map((post, index) => (
                <PostCard
                  key={post.postDetails.id}
                  post={post.postDetails}
                  openModal={openModal}
                  handleRemovePost={handleRemovePost}
                  savePostDeleteID={post.postId}
                  postType={"save"}
                />
              ))}
            </div>
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      )}
      <ImageModal imageUrl={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default SavePostComponent;
