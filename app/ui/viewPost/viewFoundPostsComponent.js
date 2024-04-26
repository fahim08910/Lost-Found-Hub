"use client";
import React, { useState, useEffect } from "react";
import { fetchFoundPosts } from "../../actions/fetchFoundPosts";
import Link from "next/link";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import "react-datepicker/dist/react-datepicker.css";
import LoadingIndicator from "../utilComponents/loading";
import NoItemFound from "../utilComponents/noItemFound";
import SearchForm from "../utilComponents/searchConponent";
import PostCard from "../utilComponents/postCard";
import ImageModal from "../utilComponents/imageModel";

const ViewFoundPostsComponent = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [searchCategory, setSearchCategory] = useState("itemName");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(true);
  const [isChatActivated, setisChatActivated] = useState(false);

  useEffect(() => {
    const getPostsAndSavedStatus = async () => {
      setIsLoading(true);
      // Fetching all posts could be a separate call if not dependent on the saved status
      await updateSavedPostsStatus(); // Ensures saved posts are fetched before posts data
      fetchAndSetPosts(searchCategory, searchTerm);
      setIsLoading(false);
    };

    getPostsAndSavedStatus();
  }, []);
  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      updateSavedPostsStatus(userName);
    }
  }, []);

  useEffect(() => {
    fetchAndSetPosts(searchCategory, searchTerm);
  }, [searchCategory, searchTerm]);

  useEffect(() => {
    setSearchCategory("itemName");
  }, []);

  const openModal = (url) => setSelectedImage(url);
  const closeModal = () => setSelectedImage(null);

  const updateSavedPostsStatus = async () => {
    const userName = localStorage.getItem("userName");
    if (!userName || typeof userName !== "string" || !userName.trim().length) {
      console.error("Invalid or missing userName");
      return;
    }

    const userLikesRef = doc(db, "savePosts", userName);
    const docSnap = await getDoc(userLikesRef);
    if (docSnap.exists()) {
      const savedPostIds = docSnap.data().likedPosts.map((post) => post.postId);
      setSavedPosts(savedPostIds);
    } else {
      setSavedPosts([]);
    }
  };

  const handleLovePost = async (post) => {
    const userName = localStorage.getItem("userName");
    if (!userName) {
      alert("User not found. Please log in.");
      return;
    }

    const userLikesRef = doc(db, "savePosts", userName);
    const docSnap = await getDoc(userLikesRef);
    if (docSnap.exists()) {
      const existingPosts = docSnap.data().likedPosts || [];
      if (!existingPosts.some((likedPost) => likedPost.postId === post.id)) {
        const newLikedPost = {
          postId: post.id,
          postDetails: { ...post },
          likedOn: new Date(),
          postType: "Found Post",
        };
        await updateDoc(userLikesRef, {
          likedPosts: [...existingPosts, newLikedPost],
        });
        setSavedPosts([...existingPosts.map((p) => p.postId), post.id]);
      }
    } else {
      const newLikedPosts = [
        {
          postId: post.id,
          postDetails: { ...post },
          likedOn: new Date(),
          postType: "Found Post",
        },
      ];
      await setDoc(userLikesRef, {
        userName,
        likedPosts: newLikedPosts,
      });
      setSavedPosts([post.id]);
    }
  };
  const handleSearch = async () => {
    setIsLoading(true);
    let searchValue = searchTerm;

    if (searchCategory === "foundDate") {
      searchValue = startDate.toISOString().split("T")[0]; // Ensure format is "YYYY-MM-DD"
    } else if (searchCategory === "postNumber") {
      searchValue = Number(searchTerm); // Convert to number if postNumber is a numeric field
    }

    await fetchAndSetPosts(searchCategory, searchValue);
    setIsLoading(false);
  };

  // Place this function outside of useEffect
  const fetchAndSetPosts = async (category, term) => {
    const formattedTerm = category === "postNumber" ? parseInt(term, 10) : term;
    const postsData = await fetchFoundPosts(category, formattedTerm);
    setPosts(postsData);
  };

  const getPlaceholderText = () => {
    return `Search by ${
      searchCategory.charAt(0).toUpperCase() + searchCategory.slice(1)
    }...`;
  };

  const toggleChat = () => {
    setisChatActivated(!isChatActivated);
  };

  return (
    <div>
      <div className="p-10 mt-16">
        <h2 className="text-4xl text-center mx-auto pb-5">Found Post</h2>
        <SearchForm
          searchCategory={searchCategory}
          setSearchCategory={setSearchCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          startDate={startDate}
          setStartDate={setStartDate}
          handleSearch={handleSearch}
          postType={"foundpost"}
        />

        <div>
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <div>
              {posts.length < 1 ? (
                <NoItemFound />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 h-auto">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      savedPosts={savedPosts}
                      openModal={openModal}
                      handleLovePost={handleLovePost}
                      postType={"view"}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      </div>
    </div>
  );
};

export default ViewFoundPostsComponent;
