import React from "react";

const ImageModal = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <img
        src={imageUrl}
        alt="Enlarged item"
        className="max-h-[90%] max-w-[90%]"
      />
    </div>
  );
};

export default ImageModal;
