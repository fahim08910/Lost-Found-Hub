import React, { useState, useEffect } from "react";
import { fetchReportedPost } from "../../actions/fetchReportedPost";
import { db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import LoadingIndicator from "../utilComponents/loading";
import NoItemFound from "../utilComponents/noItemFound";

import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import ImageModal from "../utilComponents/imageModel";
import ReportPostCard from "../utilComponents/reportPostCard";


const ReportedPostAdminComponent = () => {
  const [posts, setPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    fetchAndSetPosts();
  }, []);

  const fetchAndSetPosts = async () => {
    const postsData = await fetchReportedPost();
    setPosts(postsData);
  };

  const handleUpdateStatus = async () => {
    if (currentPost && newStatus) {
      const postRef = doc(db, "report-post", currentPost.id); // Make sure "reportedPosts" is your correct collection name
      try {
        await updateDoc(postRef, {
          reportStatus: newStatus,
        });
        const updatedPosts = posts.map((post) =>
          post.id === currentPost.id
            ? { ...post, reportStatus: newStatus }
            : post
        );
        setPosts(updatedPosts);
        setShowUpdateStatus(false);
        alert("Status updated successfully!");
      } catch (error) {
        console.error("Error updating post status: ", error);
        alert("Failed to update post status.");
      }
    } else {
      alert("No changes made or post not selected.");
    }
  };

  const showUpdateStatusForm = (post) => {
    setCurrentPost(post);
    setNewStatus(post.reportStatus);
    setShowUpdateStatus(true);
  };

  const hideUpdateStatusForm = () => {
    setShowUpdateStatus(false);
    setCurrentPost(null);
    setNewStatus("");
  };

  const openModal = (url) => setSelectedImage(url);
  const closeModal = () => setSelectedImage(null);

  return (
    <div>
      <div className="p-2">
        <h2 className="text-4xl text-center mx-auto pb-5">
        Reported Post
        </h2>
        {isLoading ? (
          <LoadingIndicator />
        ) : posts.length === 0 ? (
          <NoItemFound />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 h-auto">
          {posts.map((post) => (
              
              <ReportPostCard
              key={post.id}
              postType={"admin"}
              openModal={openModal}
              post={post}
              showUpdateStatusForm = {showUpdateStatusForm}
              />
            ))}
          </div>
        )}
        {showUpdateStatus && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="p-5 rounded-lg shadow-lg m-auto md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto">
              <h4 className="text-lg">Update Status</h4>

              <Spacer y={2} />
              <Textarea
                variant="bordered"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                labelPlacement="outside"
                className="w-full "
                isRequired
              />
              <Spacer y={2} />
              <div className="flex space-x-4">
                <Button
                  className="bg-green-500 hover:bg-black text-white"
                  onClick={handleUpdateStatus}
                >
                  Save
                </Button>
                <Button
                  className="bg-red-500 hover:bg-black text-white"
                  onClick={hideUpdateStatusForm}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      </div>
    </div>
  );
};

export default ReportedPostAdminComponent;
