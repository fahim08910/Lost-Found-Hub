"use client";
import Chat from "app/ui/chatComponent/MessagesComponent";
import React, { useState, useEffect } from "react";
import LoadingIndicator from "app/ui/utilComponents/loading";
import { useIsLoggedIn } from "app/actions/useIsLoggedIn";

const Page = () => {
  const isLoggedIn = useIsLoggedIn();
  useEffect(() => {
    if (isLoggedIn === false) {
      window.location.href = "/lost-found-hub/logintocontinue";
    }
  }, [isLoggedIn]);

  if (isLoggedIn == null) {
    return (
      <div className="items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }
  return (
    <div className="">
      <Chat />
    </div>
  );
};

export default Page;
