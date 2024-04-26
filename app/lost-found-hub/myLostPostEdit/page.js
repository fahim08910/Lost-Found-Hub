"use client";
import EditPostComponent from "app/ui/editPost/EditLostPostComponent";
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
    <div className="p-10 mt-16">
      <EditPostComponent />
    </div>
  );
}

export default Page;
