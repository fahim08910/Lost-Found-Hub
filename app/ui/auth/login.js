import React, { useState, useEffect } from "react";
import logInAction from "../../actions/logIn";
import logOut from "../../actions/logOut";
import Link from "next/link";

import { MailIcon } from "../icons/MailIcon";
import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import { Button, Input, Spacer } from "@nextui-org/react";
import PopUpInfo from "../utilComponents/popUpInfo";
import CookieBanner from "../utilComponents/cookieBanner";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [okAction, setOkAction] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCookieAccepted, setIsCookieAccepted] = useState(null);

  useEffect(() => {
    const isAccepted = localStorage.getItem("cookiesAccepted");
    if (isAccepted !== "true") {
      setIsCookieAccepted(false);
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsCookieAccepted(true);
    setIsVisible(false);
  };

  const doneAction = () => {
    setOkAction(false);
    setShowSuccessMessage(false);
    window.location.href = "/lost-found-hub/myLostPost";
  };

  useEffect(() => {
    const persistedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const persistedEmail = localStorage.getItem("currentUserEmail");
    const persistedUserRole = localStorage.getItem("userRole");

    if (persistedIsLoggedIn) {
      setIsLoggedIn(true);
      setCurrentUserEmail(persistedEmail);
      setUserRole(persistedUserRole);
      initiateLogoutTimer();
    }
  }, []);

  const initiateLogoutTimer = () => {
    setTimeout(() => {
      handleLogout();
    }, 1200000);
  };

  const showMessage = (msg) => {
    setInfoMsg(msg);
    setShowSuccessMessage(!showSuccessMessage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(isCookieAccepted !== true){
      showMessage("You must accept cookies");
      return;
    }
    setLoading(true);
    const formData = { email, password };
    const result = await logInAction(formData);

    console.log(result.userData);

    if (result.status === "LoggedIn") {
      setLoading(false);

      if (!result.emailVerified) {
        showMessage("Please verify your email.");
      } else if (result.userData.isBanned == true) {
        showMessage("You have been Banned.Please contact support.");
      } else if (result.role === "admin") {
        setIsLoggedIn(true);
        setCurrentUserEmail(result.user);
        setUserRole(result.role);
        onLoginSuccess();
        localStorage.setItem("userName", result.userData.userName);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUserEmail", result.user);
        localStorage.setItem("userRole", result.role);
        initiateLogoutTimer();
        window.location.href = "/lost-found-hub/adminpage";
      } else {
        setIsLoggedIn(true);
        setCurrentUserEmail(result.user);
        setUserRole(result.role);
        onLoginSuccess();

        localStorage.setItem("userName", result.userData.userName);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUserEmail", result.user);
        localStorage.setItem("userRole", result.role);
        initiateLogoutTimer();
        window.location.href = "/lost-found-hub/viewlostpost";
      }
    } else {
      setLoading(false);
      showMessage(result.message);
    }
  };

  const handleLogout = async () => {
    await logOut();
    setIsLoggedIn(false);
    setCurrentUserEmail("");
    setUserRole(null);
    localStorage.clear();
    window.location.reload();
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const bannedfunction = () => {
    setShowSuccessMessage(false);
    window.location.href = "/lost-found-hub/privacyandsecurity";
  };

  return (
    <div>
      <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto rounded-xl">
        <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-center">Sign In</h1>
          <form className="mt-8" onSubmit={handleSubmit}>
            <Input
              autoFocus
              label="Email"
              labelPlacement="outside"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              placeholder="Enter your email"
              variant="bordered"
              isRequired
            />

            <Spacer y={2} />

            <Input
              label="Password"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={showPassword ? "text" : "password"}
            />

            <div className="mt-2 flex items-center justify-end">
              <div className="text-sm leading-5">
                <a
                  href="/lost-found-hub/forget"
                  className="font-medium text-red-500 hover:text-black focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <Spacer y={2} />

            <div>
              <Button
                type="submit"
                size="md"
                className={`w-full bg-green-500 hover:bg-black text-white dark`}
                isLoading={loading}
              >
                Sign In
              </Button>
            </div>
          </form>
          <Spacer y={4} />
          <p className=" text-center text-sm leading-5 text-gray-600 max-w">
            {"Don't have an account?"}
            <Link
              href="/lost-found-hub/signup"
              className=" ml-2 font-medium text-blue-500 hover:text-black focus:outline-none"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <CookieBanner handleAccept={handleAccept} isVisible={isVisible} />
      <PopUpInfo
        isVisible={showSuccessMessage}
        message={infoMsg}
        onConfirm={showMessage}
      />
    </div>
  );
};
export default LoginForm;
