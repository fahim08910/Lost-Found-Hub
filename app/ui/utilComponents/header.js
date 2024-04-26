import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose, AiOutlineMessage } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import LoadingIndicator from "./loading";
import logOut from "../../actions/logOut";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef(); // Reference to the menu div
  const [isOpen, setIsOpen] = useState(false);
  const [isPostMenuOpen, setIsPostMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const clearSession = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUserEmail");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logOut();
    clearSession();
    setLoading(false);
    window.location.href = "/lost-found-hub/login";
  };

  useEffect(() => {
    const persistedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const persistedIsAdmin = localStorage.getItem("userRole") === "admin";
    if (persistedIsLoggedIn) {
      setIsLoggedIn(true);
    }
    if (persistedIsAdmin) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const logoutTimer = setTimeout(() => {
        handleLogout();
      }, 1200000); // Auto logout after 20 minutes
      return () => clearTimeout(logoutTimer);
    }
  }, [isLoggedIn]);

  // Handler for clicking outside of the menu
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setIsOpen(false);
      setIsPostMenuOpen(false);
    }
  };

  useEffect(() => {
    // Add when the menu is open and remove when it is closed
    if (isMenuOpen || isOpen || isPostMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isOpen, isPostMenuOpen]);

  const profileMenuToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsPostMenuOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const postMenuToggle = () => {
    if (!isPostMenuOpen) {
      setIsPostMenuOpen(true);
      setIsOpen(false);
    } else {
      setIsPostMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 px-6 py-4 border-b border-gray-600 bg-slate-900 text-white">
      <div className="mx-auto flex flex-row items-center justify-between">
        <div>
          <Link href="/">
            <Image src="/logo.png" width={150} height={40} alt="Lost & Found" />
          </Link>
        </div>
        <button className="md:hidden px-3 py-2 ml-auto" onClick={toggleMenu}>
          {isMenuOpen ? <AiOutlineClose size={25}/> : <FaBars size={25}/>}
        </button>
        <div
          ref={menuRef}
          className={
            isMenuOpen
              ? "flex flex-col absolute top-16 right-0 w-full bg-slate-900 md:static md:w-auto md:flex-row"
              : "hidden md:flex"
          }
        >
          <nav className="flex flex-col md:flex-row items-center gap-2">
            <Link
              href="/"
              className="px-2 py-2 rounded-md bg-transparent hover:bg-gray-700"
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/lost-found-hub/viewlostpost"
                  className="px-2 py-2 rounded-md bg-transparent hover:bg-gray-700"
                >
                  Lost Post
                </Link>
                <Link
                  href="/lost-found-hub/viewfoundpost"
                  className="px-2 py-2 rounded-md bg-transparent hover:bg-gray-700"
                >
                  Found Post
                </Link>
                <div className="relative">
                  <button
                    onClick={postMenuToggle}
                    className="px-2 py-2 rounded-md bg-transparent hover:bg-gray-700"
                  >
                    Create Post
                  </button>
                  {isPostMenuOpen && (
                    <div
                      ref={menuRef}
                      className="absolute z-50 right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg"
                    >
                      <ul className="py-1 text-gray-700">
                        <li>
                          <a
                            href="/lost-found-hub/Lostpost"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Create Lost Post
                          </a>
                        </li>
                        <li>
                          <a
                            href="/lost-found-hub/Foundpost"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Create Found Post
                          </a>
                        </li>
                        <li>
                          <a
                            href="/lost-found-hub/report"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Report a post or user
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Link
                  href="/lost-and-found-hub-chat/chat"
                  className="px-2 py-2 rounded-md bg-transparent hover:bg-gray-700 flex items-center"
                >
                  <AiOutlineMessage size={25} />
                  <span className="ml-2 text-sm block md:hidden">Chat</span>
                </Link>

                <div className="relative">
                  <button
                    onClick={profileMenuToggle}
                    className="px-2 py-2 rounded-md bg-transparent hover:bg-gray-700 flex items-center"
                  >
                    <CgProfile size={25} />
                    <span className="ml-2 text-sm block md:hidden">
                      Profile
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg"
                    >
                      <ul className="py-1 text-gray-700">
                        <li>
                          <a
                            href="/lost-found-hub/myAccount"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Account
                          </a>
                        </li>
                        <li></li>
                        {isAdmin && (
                          <li>
                            <a
                              href="/lost-found-hub/adminpage"
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Admin Dashboard
                            </a>
                          </li>
                        )}
                        <li>
                          <a
                            href="/lost-found-hub/myLostPostEdit"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Lost Post
                          </a>
                        </li>
                        <li>
                          <a
                            href="/lost-found-hub/myFoundPostEdit"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Found Post
                          </a>
                        </li>
                        <li>
                          <a
                            href="/lost-found-hub/myreportedpost"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            My Reported post
                          </a>
                        </li>
                        <li>
                          <a
                            href="/lost-found-hub/save"
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Saved Post
                          </a>
                        </li>
                        {loading ? (
                          <LoadingIndicator />
                        ) : (
                          <li>
                            <button
                              onClick={handleLogout}
                              className="block w-full px-4 py-2 hover:bg-gray-100 text-left"
                            >
                              Log Out
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/lost-found-hub/login"
                className="px-2 py-2 rounded-md bg-transparent hover:bg-gray-700"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
