"use client";

import React, { useState, useEffect } from "react";
import LoadingIndicator from "../utilComponents/loading";
import fetchEditProfile, { updatePost } from "app/actions/fetchProfileInfo";

import { Button } from "@nextui-org/react";
import PopUpInfo from "../utilComponents/popUpInfo";

const EditProfileComponent = () => {
  const [posts, setPosts] = useState([]);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const userName = localStorage.getItem("userName");
      if (userName) {
        const filteredPosts = await fetchEditProfile(userName);
        if (filteredPosts.length > 0) {
          setPosts(filteredPosts);
          setEditFormData(filteredPosts[0]); // Assuming we're editing the first post
        }
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    setValidationError("");
  };

  const validateForm = () => {
    // Check for empty values in required fields
    if (!editFormData.name || !editFormData.phoneNumber) {
      setInfoMsg("Empty Input");
      setShowSuccessMessage(true);
      return false;
    }
    return true;
  };

  const confirmEdit = async () => {
    if (!validateForm()) {
      return; // Stop the update if validation fails
    }
    setLoading(true);
    try {
      const result = await updatePost(editFormData.id, editFormData);
      setLoading(false);
      setInfoMsg("Profile Updated successfully");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (e) {
      setLoading(false);
      setInfoMsg("Profile Updated Failed");
      setShowSuccessMessage(true);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center px-4">
        <div className="p-5 rounded-lg shadow-lg bg-white w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto overflow-hidden">
          {loading ? (
            <LoadingIndicator />
          ) : (
            posts.length > 0 && (
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <h2 className="text-4xl text-center mx-auto pb-5">
                  My Profile
                </h2>
                <div className="bg-white border-2 rounded-xl hover:border-gray-400 border-gray-200 focus:border-black p-1.5 shadow-sm flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={"/user-avatar.png"}
                      alt="Profile Avatar"
                      className="h-16 w-16 rounded-full mr-4"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {editFormData.name}
                    </h2>
                    <p className="text-gray-700">{editFormData.userName}</p>
                    <p className="text-gray-700">{editFormData.phoneNumber}</p>
                    <p className="text-gray-700">{editFormData.email}</p>
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editFormData.name || ""}
                    onChange={handleEditFormChange}
                    placeholder="Full Name"
                    className="w-full border-2 rounded-xl hover:border-gray-400 border-gray-200 focus:border-black p-1.5"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    // id="phoneNumber"
                    name="phoneNumber"
                    value={editFormData.phoneNumber || ""}
                    onChange={handleEditFormChange}
                    placeholder="Phone Number"
                    className="w-full border-2 rounded-xl hover:border-gray-400 border-gray-200 focus:border-black p-1.5"
                  />
                </div>

                {validationError && (
                  <p className="text-red-500">{validationError}</p>
                )}

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={confirmEdit}
                    className="bg-blue-500 hover:bg-black text-white"
                  >
                    Update Profile
                  </Button>
                </div>
              </form>
            )
          )}
        </div>
      </div>

      <PopUpInfo
        isVisible={showSuccessMessage}
        message={infoMsg}
        onConfirm={() => setShowSuccessMessage(false)}
      />
    </div>
  );
};

export default EditProfileComponent;
