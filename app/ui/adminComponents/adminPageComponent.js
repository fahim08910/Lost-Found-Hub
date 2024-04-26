"use client";
import { useState, useEffect } from "react";
import ScreenContent from "./screenComponent";
import LoadingIndicator from "../utilComponents/loading";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";

const AdminPage = () => {
  const [activeScreen, setActiveScreen] = useState("Dash Board");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(null);

  const screens = [
    "Dash Board",
    "Reported Post",
    "Lost Post",
    "Found Post",
    "News Letter List",
    "Contact Us",
    "Add Admin",
  ];

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log("Sidebar toggle clicked", isSidebarOpen);
  };

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    console.log("Component mounted, button should be visible");
  }, []);

  useEffect(() => {
    const persistedIsLoggedIn = localStorage.getItem("userRole") === "admin";
    if (persistedIsLoggedIn) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin == null) {
    return (
      <div className="items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="pt-2">
      <div className="md:hidden ">
        <button
          className="p-2 m-2 bg-gray-800 text-white rounded-lg"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <AiOutlineClose size={25}/> : <FaBars size={25}/>}
        </button>
      </div>
      {isAdmin ? (
        <div className="flex min-h-screen">
          <div
            className={`bg-gray-800 text-white ${
              isSidebarOpen ? "block rounded-r-2xl" : "hidden"
            } md:block w-48`}
          >
            <ul className="space-y-4 p-4">
              {screens.map((screen, index) => (
                <li key={index}>
                  <button
                    className="w-full p-2 bg-gray-700 hover:bg-gray-600 rounded-xl"
                    onClick={() => handleScreenChange(screen)}
                  >
                    {screen}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative">
            <ScreenContent screen={activeScreen} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center text-center h-screen">
          <p>Unauthorized</p>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
