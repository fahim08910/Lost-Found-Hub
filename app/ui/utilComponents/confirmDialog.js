import React from "react";
import { Button } from "@nextui-org/react";
import LoadingIndicator from "./loading";

const ConfirmDialog = ({ isOpen, isLoading, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-5 rounded-lg shadow-lg m-auto bg-white">
        <p>{message}</p>

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <div className="flex space-x-4 mt-4">
            <Button
              className="bg-blue-500 hover:bg-black text-white"
              onClick={onConfirm}
            >
              Yes
            </Button>
            <Button
              className="bg-red-500 hover:bg-black text-white"
              onClick={onCancel}
            >
              No
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmDialog;
