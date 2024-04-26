"use client";

import React, { useState } from "react";
import { signUp, checkUserNameUnique } from "../../actions/signUp";

import { EyeFilledIcon } from "../icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icons/EyeSlashFilledIcon";
import {
  Button,
  Input,
  Spacer,
  Select,
  SelectItem,
  Checkbox,
} from "@nextui-org/react";

import PopUpInfo from "../utilComponents/popUpInfo";

const SignupComponent = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryCode, setCountryCode] = useState("+44");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const doneSignUp = () => {
    setShowSuccessMessage(false);
    window.location.href = "/lost-found-hub/login";
  };

  const handleSignup = async (event) => {
    setLoading(true);
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setLoading(false);
      setInfoMsg("Passwords do not match.");
      setShowSuccessMessage(true);
      // alert("Passwords do not match.");
      return;
    }

    if (!/^(?=.*[a-z])(?=.*\d)[a-z\d]{5,}$/.test(userName)) {
      setLoading(false);
      setInfoMsg("Username must contain both lowercase letters and numbers.");
      setShowSuccessMessage(true);
      // alert("UserName must contain both lowercase letters and numbers.");
      return;
    }

    if (!isChecked) {
      setLoading(false);
      setInfoMsg("Check Privacy Policy.");
      setShowSuccessMessage(true);
      // alert("Passwords do not match.");
      return;
    }

    const isUnique = await checkUserNameUnique(userName);
    if (!isUnique) {
      setLoading(false);
      setInfoMsg("UserName already exists.");
      setShowSuccessMessage(true);
      // alert("UserName already exists.");
      return;
    }

    const response = await signUp(
      name,
      email,
      password,
      `${countryCode}${phoneNumber}`,
      userName
    ); // Updated parameter
    if (response && response.user) {
      setLoading(false);
      setSignupSuccess(true);
      // setError("Please check your email to verify your account.");
      setInfoMsg(
        "Signup successful! Verification email sent.\nPlease check your email to verify your account."
      );
      setShowSuccessMessage(true);
      // alert('Signup successful! Verification email sent.\nPlease check your email to verify your account.');
    } else {
      setLoading(false);
      // console.error('Signup error:', response.error);
      setInfoMsg(response.error);
      setShowSuccessMessage(true);
      // alert(response.error);
      setSignupSuccess(false);
    }
  };

  return (
    <div>
      <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto rounded-xl ">
        <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <form onSubmit={handleSignup} className="mt-8">
            <Input
              autoFocus
              label="Name"
              labelPlacement="outside"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              variant="bordered"
              isRequired
            />

            <Spacer y={2} />

            <Input
              autoFocus
              label="User Name"
              labelPlacement="outside"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your username"
              variant="bordered"
              isRequired
            />

            <Spacer y={2} />

            <Input
              autoFocus
              label="Email"
              labelPlacement="outside"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <Spacer y={2} />

            <Input
              label="Confirm Password"
              labelPlacement="outside"
              variant="bordered"
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

            <Spacer y={2} />

            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium leading-5 text-gray-700"
            >
              Phone Number
            </label>
            <Spacer y={1} />
            <div className="flex flex-col sm:flex-row items-center">
              <Select
                className="w-full sm:w-1/5 mb-2 sm:mb-0 sm:mr-2 "
                variant="bordered"
                selectedKeys={[countryCode]}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                }}
              >
                {/* <SelectItem key={"+1"} value="+1"> +1 </SelectItem> */}
                <SelectItem key={"+44"} value="+44">
                  +44
                </SelectItem>
              </Select>

              <Input
                autoFocus
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your Phone Number"
                variant="bordered"
                isRequired
              />
            </div>

            <Spacer y={2} />

            <div className="flex items-center">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
                <label
                  htmlFor="checked-checkbox"
                  className=" text-sm font-medium text-gray-900 "
                >
                  I agree to
                  <a
                    href="/lost-found-hub/privacyandsecurity"
                    className="ml-1 font-medium text-blue-500 hover:text-black focus:outline-none"
                  >
                    privacy and security policy.
                  </a>
                </label>
              </Checkbox>
            </div>

            <Spacer y={2} />

            <div>
              <Button
                type="submit"
                size="md"
                className={`w-full bg-green-500 hover:bg-black text-white dark`}
                isLoading={loading}
              >
                Sign Up
              </Button>
            </div>
          </form>

          <Spacer y={4} />

          <p className=" text-center text-sm leading-5 text-gray-600 max-w">
            Already have an account?
            <a
              href="/lost-found-hub/login"
              className="ml-2 font-medium text-blue-500 hover:text-black focus:outline-none"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>

      <PopUpInfo
        isVisible={showSuccessMessage}
        message={infoMsg}
        onConfirm={() => {
          if (signupSuccess) {
            doneSignUp();
          } else {
            setShowSuccessMessage(false);
          }
        }}
      />
    </div>
  );
};

export default SignupComponent;
