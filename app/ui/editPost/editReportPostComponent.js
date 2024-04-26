"use client";

import React, { useState, useEffect, use } from "react";
import LoadingIndicator from "../utilComponents/loading";

import fetchEditUsersReportPost, {
  deletePost,
  updatePost,
} from "../../actions/fetchEditUsersReportPost";

import PopUpInfo from "../utilComponents/popUpInfo";
import ImageModal from "../utilComponents/imageModel";
import ReportPostCard from "../utilComponents/reportPostCard";
import ConfirmDialog from "../utilComponents/confirmDialog";

const EditUsersReportPostComponent = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletePostId, setDeletePostId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPostloading, setPostloading] = useState(false);

  useEffect(() => {
    const getFilteredPosts = async () => {
      setPostloading(true);
      setUserName(localStorage.getItem("userName"));
      if (userName) {
        const filteredPosts = await fetchEditUsersReportPost(userName);
        setPosts(filteredPosts.sort((a, b) => b.postTime - a.postTime));
        setPostloading(false);
      }
      setPostloading(false);
    };
    getFilteredPosts();
  }, [userName]);

  const handleEditFormChange = (event) => {
    setEditFormData({
      ...editFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const askEditPost = (post) => {
    setEditFormData({
      ...post,
      lostDate: post.lostDate?.split("T")[0], // Assuming foundDate is in ISO format
    });
    setShowEditModal(true);
  };

  const confirmEdit = async () => {
    setLoading(true);

    await updatePost(editFormData.id, editFormData, selectedFile);

    setShowEditModal(false);
    setSelectedFile(null); // Reset file selection

    // Re-fetch posts after update
    fetchPosts(); // Call a function that fetches posts again

    setShowSuccessMessage(true);
    setLoading(false);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const openModal = (url) => setSelectedImage(url);
  const closeModal = () => setSelectedImage(null);

  const askDeletePost = (postId) => {
    setShowDeleteConfirmation(true);
    setDeletePostId(postId);
  };

  const confirmDelete = async () => {
    setLoading(true);
    await deletePost(deletePostId);
    setPosts(posts.filter((post) => post.id !== deletePostId));
    setShowDeleteConfirmation(false);
    setShowSuccessMessage(true);
    setLoading(false);
    // setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  const fetchPosts = async () => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      const filteredPosts = await fetchEditUsersReportPost(userName);
      setPosts(filteredPosts.sort((a, b) => b.postTime - a.postTime));
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div>
        {isPostloading ? (
          <div>
            <LoadingIndicator />
          </div>
        ) : (
          <div>
            <h2 className="text-4xl text-center mx-auto pb-5">
              My Reported Posts
            </h2>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 h-auto">
                {posts.map((post) => (
                  <ReportPostCard
                  key={post.id}
                    postType={"myReportPost"}
                    openModal={openModal}
                    post={post}
                    handleDeletePost={askDeletePost}
                  />
                ))}
              </div>
            ) : (
              <p>No posts found.</p>
            )}
          </div>
        )}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-5 rounded-lg shadow-lg m-auto md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>
            <form className="space-y-3">
              <div>
                <label htmlFor="itemName" className="block">
                  Name:
                </label>
                <input
                  type="text"
                  id="itemName"
                  name="itemName"
                  value={editFormData.itemName || ""}
                  onChange={handleEditFormChange}
                  placeholder="Item Name"
                  className="border p-1 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="categories" className="block">
                  Category:
                </label>
                <input
                  type="text"
                  id="categories"
                  name="categories"
                  value={editFormData.categories || ""}
                  onChange={handleEditFormChange}
                  placeholder="Category"
                  className="border p-1 rounded w-full"
                />
              </div>

              <div>
                <label htmlFor="description" className="block">
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={editFormData.description || ""}
                  onChange={handleEditFormChange}
                  placeholder="Description"
                  className="border p-1 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="condition" className="block">
                  Condition:
                </label>
                <input
                  type="text"
                  id="condition"
                  name="condition"
                  value={editFormData.condition || ""}
                  onChange={handleEditFormChange}
                  placeholder="Condition"
                  className="border p-1 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="lostDate" className="block">
                  Lost Date:
                </label>
                <input
                  type="date"
                  id="lostDate"
                  name="lostDate"
                  value={editFormData.lostDate || ""}
                  onChange={handleEditFormChange}
                  className="border p-1 rounded w-full"
                />
              </div>
              <div>
                <label htmlFor="image" className="block">
                  Image:
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={handleFileChange}
                  className="border p-1 rounded w-full"
                />
              </div>

              {loading ? (
                <LoadingIndicator />
              ) : (
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={confirmEdit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Update Post
                  </button>

                  <button
                    onClick={() => setShowEditModal(false)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showDeleteConfirmation}
        isLoading={loading}
        message="Are you sure you want to delete this post?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirmation(false)}
      />

      <PopUpInfo
        isVisible={showSuccessMessage}
        message={"Your post updated successfully!"}
        onConfirm={() => setShowSuccessMessage(false)}
      />
      <ImageModal imageUrl={selectedImage} onClose={closeModal} />
    </div>
  );
};

export default EditUsersReportPostComponent;
