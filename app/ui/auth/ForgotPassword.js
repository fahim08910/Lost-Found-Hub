"use client";
import React, { useState } from "react";
import sendPasswordResetEmail from "../../actions/sendPasswordResetEmail";
import { MailIcon } from "../icons/MailIcon";
import { Button, Input, Spacer } from "@nextui-org/react";
import PopUpInfo from "../utilComponents/popUpInfo";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [infoMsg, setInfoMsg] = useState("");
  const [okAction, setOkAction] = useState(false);

  const doneAction = () => {
    setOkAction(false);
    setShowSuccessMessage(false);
    // window.location.href = '/lost-found-hub/myLostPost';
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const response = await sendPasswordResetEmail(email);
    setLoading(false);
    setOkAction(true);
    setInfoMsg(response.message);
    setShowSuccessMessage(true);
    // alert(response.message);
  };

  return (
    <div>
      <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto rounded-xl">
        <div className="px-4 py-5 md:px-6 lg:p-5 bg-white w-full max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
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
            <Spacer y={4} />
            <Button
              type="submit"
              size="md"
              className={`w-full bg-green-500 hover:bg-black text-white dark`}
              isLoading={loading}
            >
              Reset Password
            </Button>
          </form>
          <Spacer y={4} />
          <p className=" mt- text-center text-sm leading-5 text-gray-600 max-w">
            {"Don't have an account?"}
            <a
              href="/lost-found-hub/signup"
              className="ml-2 font-medium text-blue-500 hover:text-black focus:outline-none"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <PopUpInfo
        isVisible={showSuccessMessage}
        message={infoMsg}
        onConfirm={() => {
          if (okAction) {
            doneAction();
          } else {
            setShowSuccessMessage(false);
          }
        }}
      />
    </div>
  );
};

export default ForgotPassword;
