"use client";
import React, { useState, useEffect } from "react";
import { fetchLostPosts } from "../../actions/fetchLostPosts";
import Link from "next/link";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingIndicator from "../utilComponents/loading";
import NoItemFound from "../utilComponents/noItemFound";
import PostCard from "../utilComponents/postCard";
import SearchForm from "../utilComponents/searchConponent";
import ImageModal from "../utilComponents/imageModel";


const ViewLostPostsComponent = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [savedPosts, setSavedPosts] = useState([]);
  const [searchCategory, setSearchCategory] = useState("itemName");
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPostsAndSavedStatus = async () => {
      setIsLoading(true);
      await updateSavedPostsStatus();
      fetchAndSetPosts(searchCategory, searchTerm);
      setIsLoading(false);
    };
    getPostsAndSavedStatus();
  }, [searchCategory, searchTerm]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      updateSavedPostsStatus(userName);
    }
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
          postType: "Lost Post",
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
          postType: "Lost Post",
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

    if (searchCategory === "lostDate") {
      searchValue = startDate.toISOString().split("T")[0];
    } else if (searchCategory === "postNumber") {
      searchValue = Number(searchTerm);
    }
    console.log(searchCategory);
    console.log(searchValue);
    await fetchAndSetPosts(searchCategory, searchValue);
    setIsLoading(false);
  };

  const fetchAndSetPosts = async (category, term) => {
    const formattedTerm = category === "postNumber" ? parseInt(term, 10) : term;
    const postsData = await fetchLostPosts(category, formattedTerm);
    console.log("Posts data to set:", postsData);
    setPosts(postsData);
  };

  const getPlaceholderText = () => {
    return `Search by ${
      searchCategory.charAt(0).toUpperCase() + searchCategory.slice(1)
    }...`;
  };

  return (
    <div className="p-10 mt-16">
      <h2 className="text-4xl text-center mx-auto pb-5">Lost Post</h2>
      <SearchForm
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startDate={startDate}
        setStartDate={setStartDate}
        handleSearch={handleSearch}
        postType={"lostPost"}
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
  );
};

export default ViewLostPostsComponent;
