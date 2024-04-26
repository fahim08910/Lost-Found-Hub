import React from "react";
import { Button } from "@nextui-org/react";

function PopUpInfo({ isVisible, message, onConfirm }) {
  if (!isVisible) return null;

  return (
    <div className="z-50 items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col items-center p-5 rounded-lg shadow-lg m-auto bg-white w-full max-w-xl">
          <h2 className="text-xl font-bold mb-4">{message}</h2>
          <Button
            size="md"
            onClick={onConfirm}
            className="bg-green-500 hover:bg-black text-white"
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PopUpInfo;
