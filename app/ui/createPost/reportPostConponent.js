"use client";
import React, { useState, useEffect, useRef } from "react";
import { addReportPost } from "../../actions/addReportPost";
import {
  Button,
  Input,
  Spacer,
  Select,
  SelectItem,
  Checkbox,
  Textarea,
} from "@nextui-org/react";

import PopUpInfo from "../utilComponents/popUpInfo";

const ReportPostComponent = () => {
  const [description, setDescription] = useState("");
  const [postType, setPostType] = useState("Lost Post");
  const [reportType, setReportType] = useState("User");

  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pictures, setPictures] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const [reportedUserName, setreportedUserName] = useState("");
  const [postId, setPostId] = useState("");

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [okAction, setOkAction] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("currentUserEmail");
    const storedUserName = localStorage.getItem("userName");
    if (storedEmail && storedUserName) {
      setUserEmail(storedEmail);
      setUserName(storedUserName);
    }
  }, []);

  const handlePictureChange = (event) => {
    setPictures([...event.target.files].slice(0, 3));
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    if (!isChecked) {
      setLoading(false);
      setInfoMsg("You must agree to the privacy policy.");
      setShowSuccessMessage(true);

      return;
    }

    const lostPostData = {
      postId,
      reportedUserName,
      description,
      postType,
      userEmail,
      userName,
      postTime: new Date().toISOString(),
    };

    try {
      const response = await addReportPost(lostPostData, pictures, reportType);
      if (response.success) {
        setLoading(false);
        setOkAction(true);
        setInfoMsg("Successfully Uploaded");
        setShowSuccessMessage(true);
      } else {
        setLoading(false);
        setOkAction(true);
        setInfoMsg(response.message);
        setShowSuccessMessage(true);
      }
    } catch (e) {
      setLoading(false);
      setInfoMsg("Failed to Upload");
      setShowSuccessMessage(true);
    }
  };

  const handleFiles = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const mappedFiles = selectedFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    handlePictureChange(event);
    setFiles(mappedFiles);
  };

  const removeFile = (fileIndex) => {
    URL.revokeObjectURL(files[fileIndex].preview);

    const newFiles = files.filter((_, index) => index !== fileIndex);
    setFiles(newFiles);
    setPictures([]);

    if (newFiles.length === 0) {
      fileInputRef.current.value = "";
    }
  };

  const doneAction = () => {
    setOkAction(false);
    setShowSuccessMessage(false);
    window.location.href = "/lost-found-hub/myreportedpost";

  };

  return (
    <div>
      <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto rounded-xl">
        <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-center">
            Report a post or user
          </h1>
          <form onSubmit={handleSubmit} className="mt-8">
            <Select
              label="Report Type"
              labelPlacement="outside"
              className="w-full"
              variant="bordered"
              selectedKeys={[reportType]}
              onChange={(e) => {
                setReportType(e.target.value);
              }}
              isRequired
            >
              <SelectItem key={"User"} value="User">
                Report a user
              </SelectItem>
              <SelectItem key={"Post"} value="Post">
                Report a post
              </SelectItem>
            </Select>

            <Spacer y={2} />

            {reportType == "Post" && (
              <div>
                <Input
                  autoFocus
                  label="Post ID"
                  labelPlacement="outside"
                  type="text"
                  value={postId}
                  onChange={(e) => setPostId(e.target.value)}
                  placeholder="Enter your post id"
                  variant="bordered"
                  isRequired
                />
                <Spacer y={2} />
                <Input
                  autoFocus
                  label="Report user's username"
                  labelPlacement="outside"
                  type="text"
                  value={reportedUserName}
                  onChange={(e) => setreportedUserName(e.target.value)}
                  placeholder="Enter your username"
                  variant="bordered"
                  isRequired
                />
                <Spacer y={2} />

                <Select
                  label="Post Type"
                  labelPlacement="outside"
                  className="w-full"
                  variant="bordered"
                  selectedKeys={[postType]}
                  onChange={(e) => {
                    setPostType(e.target.value);
                  }}
                  isRequired
                >
                  <SelectItem key={"Lost Post"} value="Lost Post">
                    Lost Post
                  </SelectItem>
                  <SelectItem key={"Found Post"} value="Found Post">
                    Found Post
                  </SelectItem>
                </Select>
              </div>
            )}
            {reportType == "User" && (
              <Input
                autoFocus
                label="Report user's username"
                labelPlacement="outside"
                type="text"
                value={reportedUserName}
                onChange={(e) => setreportedUserName(e.target.value)}
                placeholder="Enter your username"
                variant="bordered"
                isRequired
              />
            )}

            <Spacer y={2} />

            <div>
              <label
                htmlFor="photo-upload"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Upload <span class="text-red-500">*</span>
              </label>
              <input
                ref={fileInputRef}
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFiles}
                className="w-full border-2 rounded-xl hover:border-gray-400 border-gray-200 focus:outline-none focus:border-black px-3 py-1  mt-1"
              />
              <Spacer y={1} />
              <div>
                {files.length > 0 ? (
                  files.map((file, index) => (
                    <div
                      key={index}
                      className="relative  border-2 rounded-xl hover:border-gray-400 border-gray-200 focus:outline-none focus:border-black px-3 py-2 mt-1"
                    >
                      <img
                        src={file.preview}
                        alt={`preview ${index}`}
                        className="h-32 rounded-md mr-2"
                      />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-0 right-0 p-1 bg-white rounded-full text-black font-bold"
                      >
                        X
                      </button>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <Spacer y={2} />

            <Textarea
              label="Description"
              variant="bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              labelPlacement="outside"
              placeholder="Enter your description"
              className="w-full"
              isRequired
            />

            <Spacer y={2} />

            <div className="flex items-center">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
                <label
                  htmlFor="checked-checkbox"
                  className=" text-sm font-medium text-gray-900 "
                >
                  I agree to
                  <a
                    href="/lost-found-hub/privacyandsecurity"
                    className="ml-1 font-medium text-blue-500 hover:text-black focus:outline-none"
                  >
                    privacy and security policy.
                  </a>
                </label>
              </Checkbox>
            </div>

            <Spacer y={2} />
            <div>
              <Button
                type="submit"
                size="md"
                className={`w-full bg-green-500 hover:bg-black text-white dark`}
                isLoading={loading}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>

      <PopUpInfo
        isVisible={showSuccessMessage}
        message={infoMsg}
        onConfirm={() => {
          if (okAction) {
            doneAction();
          } else {
            setShowSuccessMessage(false);
          }
        }}
      />
    </div>
  );
};

export default ReportPostComponent;
