import React, { useState, useEffect } from "react";
import Link from "next/link";

function CookieBanner({
    handleAccept,
    isVisible
}) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-10 flex flex-col justify-between gap-x-8 gap-y-4 bg-white p-6 ring-1 ring-gray-900/10 md:flex-row md:items-center lg:px-8">
      <p className="max-w-4xl text-sm leading-6 text-gray-900">
        This website uses cookies to enhance your browsing experience. By continuing to use
        this site, you consent to our use of cookies. Learn more in our{" "}
        <Link className="font-semibold text-blue-500" href="/lost-found-hub/privacyandsecurity">
        Privacy & Security Policy
        </Link>
        .
      </p>
      <div className="mr-16 flex flex-none items-center gap-x-5">
        <button
          type="button"
          className="rounded-xl bg-green-500 px-3 py-2 text-sm  text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          onClick={handleAccept}
        >
          Accept All
        </button>
        <button
          type="button"
          className="text-sm  leading-6 text-gray-900"
          onClick={handleAccept}
        >
          Accept Necessary
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;
