"use client";
import React, { useState, useEffect, useRef } from "react";
import { addFoundPost } from "../../actions/addFoundPost"; // Change import to 'addFoundPost'
import LoadingIndicator from "../utilComponents/loading";

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

const AddFoundPostComponent = () => {
  // Change component name
  const [itemName, setItemName] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("New");
  const [privacyAgreement, setPrivacyAgreement] = useState(true);
  const [foundDate, setFoundDate] = useState("");
  const [message, setMessage] = useState({ text: "", isError: false });
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pictures, setPictures] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  const fileInputRef = useRef(null);

  const [location, setLocation] = useState("");
  const [postcode, setPostcode] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [adminWard, setAdminWard] = useState(""); // State for administrative ward
  const [adminDistrict, setAdminDistrict] = useState(""); // State for administrative district
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [pfa, setPfa] = useState(""); // State for administrative ward
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [okAction, setOkAction] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(null);

  // useEffect(() => {
  //   const persistedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   if (persistedIsLoggedIn) {
  //     setisLoggedIn(true);
  //   } else {
  //     setisLoggedIn(false);
  //   }
  // }, []);

  useEffect(() => {
    const persistedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setisLoggedIn(persistedIsLoggedIn);

    if (persistedIsLoggedIn) {
      const storedEmail = localStorage.getItem("currentUserEmail");
      const storedUserName = localStorage.getItem("userName");
      if (storedEmail && storedUserName) {
        setUserEmail(storedEmail);
        setUserName(storedUserName);
      }
    }
  }, []);

  if (isLoggedIn == null) {
    return (
      <div className="items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isLoggedIn == false) {
    window.location.href = "/lost-found-hub/logintocontinue";
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const doneAction = () => {
    setOkAction(false);
    setShowSuccessMessage(false);
    window.location.href = "/lost-found-hub/myFoundPostEdit";
  };

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

    setPrivacyAgreement(isChecked);

    if (!adminWard) {
      setLoading(false);
      setInfoMsg("Enter a valid post code");
      setShowSuccessMessage(true);
      // alert("enter a valid post code");
      return;
    }

    const lostPostData = {
      itemName,
      categories,
      location,
      description,
      condition,
      privacyAgreement,
      foundDate,
      userEmail,
      userName,
      postTime: new Date().toISOString(),
    };

    const response = await addFoundPost(lostPostData, pictures);
    if (response.success) {
      setLoading(false);
      setOkAction(true);
      setInfoMsg("Successfully Uploaded");
      setShowSuccessMessage(true);
      // alert("Successfully Uploaded");
    } else {
      setLoading(false);
      setInfoMsg("Failed to upload");
      setShowSuccessMessage(true);
      // alert("Failed to upload");
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

  const validatePostcode = async () => {
    if (!postcode) {
      setIsLoading(false); // Stop loading if input is empty
      return;
    }
    setIsLoading(true); // Start loading before the API request
    const cleanPostcode = postcode.replace(/\s+/g, "");
    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(
          cleanPostcode
        )}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setIsValid(true);
        setAdminWard(data.result.parliamentary_constituency_2024); // Set the administrative ward from the response
        setAdminDistrict(data.result.ced); // Set the administrative district from the response
        setPfa(data.result.pfa);
        const l1 = data.result.parliamentary_constituency_2024 || "";
        const l2 = data.result.ced || "";
        const l3 = data.result.pfa || "";
        const cleanPostcode = data.result.postcode || ""; // Assuming you have a postcode or similar variable.

        // Construct the location string
        const locationParts = [l1, l2, l3, cleanPostcode].filter(
          (part) => part !== ""
        );
        const locationString = locationParts.join(", ");
        setLocation(locationString);
      } else {
        setIsValid(false);
        setLocation("");
      }
    } catch (error) {
      console.error("Failed to validate postcode:", error);
      setIsValid(false);
      setLocation("");
    }
    setIsLoading(false); // End loading after the API request is completed
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto rounded-xl">
            <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto">
              <h1 className="text-2xl font-bold text-center">
                Add Found Post{" "}
              </h1>
              <form onSubmit={handleSubmit} className="mt-8">
                <Input
                  autoFocus
                  label="Item Name"
                  labelPlacement="outside"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Enter Item Name"
                  className="w-full"
                  variant="bordered"
                  isRequired
                />

                <Spacer y={2} />

                <Input
                  autoFocus
                  label="Category"
                  labelPlacement="outside"
                  type="text"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  placeholder="Enter a Category"
                  className="w-full"
                  variant="bordered"
                  isRequired
                />

                <Spacer y={2} />

                <div>
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Location <span class="text-red-500">*</span>
                  </label>
                  <Spacer y={1} />
                  <div className="flex items-center space-x-2">
                    <Input
                      autoFocus
                      type="text"
                      value={postcode.toUpperCase()}
                      onChange={(e) => {
                        setPostcode(e.target.value.toUpperCase());
                      }}
                      placeholder="Enter a valid post code"
                      className="w-full"
                      variant="bordered"
                      isRequired
                    />
                    <Button
                      type="button"
                      size="md"
                      onClick={() => {
                        setIsLoading(true);
                        clearTimeout(window.validateTimeout);
                        window.validateTimeout = setTimeout(
                          validatePostcode,
                          500
                        );
                      }}
                      className={` bg-blue-500 hover:bg-black text-white dark`}
                      isLoading={isLoading}
                    >
                      Check
                    </Button>
                  </div>

                  {isLoading ? (
                    <p></p>
                  ) : (
                    <div>
                      {isValid !== null && (
                        <p className="block text-sm font-medium leading-5 text-gray-700">
                          {isValid ? "" : " Postcode  Invalid"}
                          {isValid && adminWard ? `${adminWard},` : ""}
                          {isValid && adminDistrict ? ` ${adminDistrict},` : ""}
                          {isValid && adminDistrict && pfa ? ` ${pfa}` : ""}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <Spacer y={2} />

                <Select
                  label="Condition"
                  labelPlacement="outside"
                  placeholder="Select Condition"
                  className="w-full"
                  variant="bordered"
                  selectedKeys={[condition]}
                  onChange={(e) => {
                    setCondition(e.target.value);
                  }}
                  isRequired
                >
                  <SelectItem key={"New"} value="New">
                    New
                  </SelectItem>
                  <SelectItem key={"Used"} value="Used">
                    Used
                  </SelectItem>
                  <SelectItem key={"Damaged"} value="Damaged">
                    Damaged
                  </SelectItem>
                </Select>

                <Spacer y={2} />

                <label
                  htmlFor="Name"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Date <span class="text-red-500">*</span>
                </label>
                <Spacer y={1} />
                <input
                  type="date"
                  value={foundDate}
                  onChange={(e) => setFoundDate(e.target.value)}
                  className="w-full border-2 hover:border-gray-400 border-gray-200 rounded-xl focus:outline-none focus:border-black px-3 py-1.5 "
                  required
                />

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
                          className="relative  border-2 hover:border-gray-400 border-gray-200 focus:outline-none focus:border-black px-3 py-2 rounded-md mt-1"
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
                    Post
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
      ) : (
        <div>
          <p></p>
        </div>
      )}
    </div>
  );
};

export default AddFoundPostComponent; // Change export default
