import React, { useState, useEffect } from "react";
import { fetchLostPosts } from "app/actions/fetchLostPosts";
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

const AdminLostPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchCategory, setSearchCategory] = useState("itemName");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
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
    const searchValue =
      searchCategory === "lostDate"
        ? startDate.toISOString().split("T")[0]
        : searchTerm;
    await fetchAndSetPosts(searchCategory, searchValue);
    setIsLoading(false);
  };

  const fetchAndSetPosts = async (category, term) => {
    const formattedTerm = category === "postNumber" ? parseInt(term, 10) : term;
    const postsData = await fetchLostPosts(category, formattedTerm);
    setPosts(postsData);
  };

  const handleDeletePost = (postId) => {
    setShowDeleteConfirmation(true);
    setDeleteCandidate(postId); // Set the post ID to delete if confirmed
  };

  const confirmDelete = async () => {
    setLoading(true);
    if (deleteCandidate) {
      try {
        const postRef = doc(db, "lost-post", deleteCandidate);
        await deleteDoc(postRef);
        setPosts(posts.filter((post) => post.id !== deleteCandidate));
        setShowDeleteConfirmation(false); // Hide confirmation after deletion
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error deleting post: ", error);
        alert("Failed to delete the post.");
      }
    }
  };

  return (
    <div className="p-10">
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
                  openModal={openModal}
                  handleDeletePost={handleDeletePost}
                  postType={"admin"}
                />
              ))}
            </div>
          )}
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
  );
};

export default AdminLostPost;
