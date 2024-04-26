import React, { useState, useEffect } from "react";
import { fetchFoundPosts } from "app/actions/fetchFoundPosts";
import Link from "next/link";
import { db } from "app/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingIndicator from "../utilComponents/loading";
import NoItemFound from "../utilComponents/noItemFound";
import SearchForm from "../utilComponents/searchConponent";
import ImageModal from "../utilComponents/imageModel";
import PostCard from "../utilComponents/postCard";
import ConfirmDialog from "../utilComponents/confirmDialog";

const AdminFoundPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCategory, setSearchCategory] = useState("itemName");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAndSetPosts(searchCategory, searchTerm);
  }, [searchCategory, searchTerm]);

  const openModal = (url) => setSelectedImage(url);
  const closeModal = () => setSelectedImage(null);

  const handleSearch = async () => {
    setIsLoading(true);
    let searchValue = searchTerm;
    if (searchCategory === "foundDate") {
      searchValue = startDate.toISOString().split("T")[0]; // Format as "YYYY-MM-DD"
    } else if (searchCategory === "postNumber") {
      searchValue = Number(searchTerm); // Convert to number if postNumber is a numeric field
    }
    await fetchAndSetPosts(searchCategory, searchValue);
    setIsLoading(false);
  };

  const fetchAndSetPosts = async (category, term) => {
    const formattedTerm = category === "postNumber" ? parseInt(term, 10) : term;
    const postsData = await fetchFoundPosts(category, formattedTerm);
    setPosts(postsData);
  };

  const handleDeletePost = (postId) => {
    setShowDeleteConfirmation(true);
    setDeleteCandidate(postId);
  };

  const confirmDelete = async () => {
    setLoading(true);
    if (deleteCandidate) {
      try {
        const postRef = doc(db, "found-post", deleteCandidate);
        await deleteDoc(postRef);
        setPosts(posts.filter((post) => post.id !== deleteCandidate));
        setLoading(false);
        setShowDeleteConfirmation(false);
      } catch (error) {
        setLoading(false);
        console.error("Error deleting post: ", error);
        alert("Failed to delete the post.");
      }
    }
  };

  return (
    <div>
      <div className="p-10 ">
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

        {isLoading ? (
          <LoadingIndicator />
        ) : posts.length < 1 ? (
          <NoItemFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 h-auto">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                openModal={openModal}
                handleDeletePost={handleDeletePost}
                postType={"admin"}
              />
            ))}
          </div>
        )}

        <ConfirmDialog
          isOpen={showDeleteConfirmation}
          isLoading={loading}
          message="Are you sure you want to delete this post?"
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      </div>
    </div>
  );
};

export default AdminFoundPost;
