import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { BsArrowDownCircle } from "react-icons/bs";

function PostCard({
  post,
  savedPosts,
  openModal,
  handleLovePost,
  postType,
  askDeletePost,
  askEditPost,
  handleRemovePost,
  savePostDeleteID,
  handleDeletePost,
}) {
  let isSaved;
  if (postType == "view") {
    isSaved = savedPosts.includes(post.id);
  }

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
        <span className="text-lg font-semibold text-gray-900">
          {post.itemName}
        </span>
        <div className="flex items-baseline justify-between">
          <p className="text-xs text-gray-500">{post.condition}</p>
          {postType != "save" && (
            <span className="text-xs text-gray-500">
              Posted on :
              {new Date(post.postTime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
        {post.lostDate ? (
          <p className="text-xs text-gray-500"> Lost Date : {post.lostDate}</p>
        ) : (
          <p className="text-xs text-gray-500">Found Date :{post.foundDate}</p>
        )}
        <div
          ref={contentRef}
          className="relative h-24 overflow-scroll scrollbar-hide"
        >
          <p className="text-xs text-gray-500">{post.userName}</p>
          <p className="text-xs text-gray-500">Category: {post.categories}</p>
          <p className="text-xs text-gray-500">Post No. {post.postNumber}</p>
          <p className="text-xs text-gray-500">{post.location}</p>
          <p className="text-xs text-gray-500">{post.description}</p>
          {showScrollIcon && (
            <BsArrowDownCircle className="absolute right-2 top-2 text-black-500 text-lg" />
          )}
        </div>
      </div>

      {postType == "view" && (
        <div className="flex items-center justify-between pb-4 pl-4 pr-4">
          <Link
            href={`/chat/${encodeURIComponent(post.userName)}`}
            className="flex bg-blue-500 text-white rounded-xl p-2 items-center space-x-2 text-sm"
          >
            Message
          </Link>
          <button
            onClick={() => handleLovePost(post)}
            disabled={isSaved}
            style={{ marginRight: "10px" }}
          >
            {isSaved ? "Saved" : "❤️ Save"}
          </button>
        </div>
      )}
      {postType == "mypost" && (
        <div className="flex items-center justify-between pb-4 pl-4 pr-4">
          <button onClick={() => askEditPost(post)}>Edit</button>
          <button onClick={() => askDeletePost(post.id)}>Delete</button>
        </div>
      )}

      {postType == "save" && (
        <div className="flex items-center justify-between pb-4 pl-4 pr-4">
          <Link
            href={`/chat/${encodeURIComponent(post.userName)}`}
            className="flex bg-blue-500 text-white rounded-xl p-2 items-center space-x-2 text-sm"
          >
            Message
          </Link>
          <button onClick={() => handleRemovePost(savePostDeleteID)}>
            Remove
          </button>
        </div>
      )}

      {postType == "admin" && (
        <div className="flex items-center justify-between pb-4 pl-4 pr-4">
          <Link
            href={`/chat/${encodeURIComponent(post.userName)}`}
            className="flex bg-blue-500 text-white rounded-xl p-2 items-center space-x-2 text-sm"
          >
            Message
          </Link>
          <button
            onClick={() => handleDeletePost(post.id)}
            style={{ marginRight: "10px" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
