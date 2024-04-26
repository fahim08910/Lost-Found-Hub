"use client";

import AdminPage from "app/ui/adminComponents/adminPageComponent";
import LoadingIndicator from "app/ui/utilComponents/loading";
import React, { useState, useEffect } from "react";
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
    <div className="mt-16">
      <AdminPage />
    </div>
  );
};

export default Page;
