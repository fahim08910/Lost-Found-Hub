import React, { useState, useEffect, useRef } from "react";
import { BsArrowDownCircle } from "react-icons/bs"; // Scroll indicator icon
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Button } from "@nextui-org/react";

function ReportPostCard({
  post,
  openModal,
  postType,
  handleDeletePost,
  showUpdateStatusForm,
  key
}) {
  const [showScrollIcon, setShowScrollIcon] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      const current = contentRef.current;
      const isOverflowing = current.scrollHeight > current.clientHeight;
      setShowScrollIcon(isOverflowing);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow); // Recheck on window resize

    return () => window.removeEventListener("resize", checkOverflow);
  }, [post]);

  return (
    <div
      key={post.id}
      className="border h-full border-gray-300 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        {post.pictures?.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Found item"
            onClick={() => openModal(url)}
            className="w-full h-48 object-cover"
          />
        ))}
      </div>
      <div className="p-4">
        <div
          ref={contentRef}
          className="relative h-24 overflow-scroll scrollbar-hide"
        >
          <span className="text-lg font-semibold text-gray-900">
            {post.reportStatus}
          </span>
          <p className="text-xs text-gray-500">Reported by : {post.userName}</p>
          <span className="text-xs text-gray-500">
            Posted on :
            {new Date(post.postTime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          {post.reportType == "Post" ? (
            <div>
              <p className="text-xs text-gray-500">
                Reported Type: {post.postType} || ID: {post.postId}
              </p>
              <p className="text-xs text-gray-500">
                Reported ID: {post.postId}
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-500">
              Reported Type: {post.reportType}
            </p>
          )}

          <p className="text-xs text-gray-500">
            Reported User: {post.reportedUserName}
          </p>
          <p className="text-xs text-gray-500">{post.description}</p>
          {showScrollIcon && (
            <BsArrowDownCircle className="absolute right-2 top-2 text-black-500 text-lg" />
          )}
        </div>
      </div>

      {postType == "myReportPost" && (
        <div className="flex items-center justify-between pb-4 pl-4 pr-4">
          <button
            onClick={() => handleDeletePost(post.id)}
            className="flex items-center space-x-2"
          >
            <span className="flex-shrink-0">
              <MdOutlineDeleteOutline size={25} />
            </span>
            <span className="flex-grow">Delete</span> {/* Text */}{" "}
          </button>
        </div>
      )}
      {postType == "admin" && (
        <div className="items-center justify-center pb-4 pl-4 pr-4">
          <Button
            className="bg-green-500 hover:bg-black text-white"
            onClick={() => showUpdateStatusForm(post)}
          >
            Update Status
          </Button>
        </div>
      )}
    </div>
  );
}

export default ReportPostCard;
