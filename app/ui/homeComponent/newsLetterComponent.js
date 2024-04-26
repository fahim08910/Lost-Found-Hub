import React, { useState } from "react";
import { db } from "app/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button, Input } from "@nextui-org/react";

function NewsLetterSection() {
  const [email, setEmail] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    setIsLoading(true);
    if (email == "") {
      alert("Enter a email");
      return;
    }
    try {
      await addDoc(collection(db, "newsletter"), {
        email: email,
        timeStamp: serverTimestamp(),
      });
      setIsLoading(false);
      alert("Thank you for subscribing!"); // Feedback to user
      setEmail(""); // Reset email input after submission
    } catch (error) {
      setIsLoading(false);
      console.error("Error adding document: ", error);
      alert("Error subscribing. Please try again."); // Error feedback
    }
  };

  return (
    <section>
      <div className="bg-gray-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <div className="max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:col-span-7">
            <p className="inline sm:block lg:inline xl:block">
              Sign up for our newsletter.
            </p>
          </div>
          <form
            className="w-full max-w-md lg:col-span-5 lg:pt-2"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-x-4">
              <Input
                id="email-address"
                size="md"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              />

              <Button
                type="submit"
                size="md"
                className={`bg-indigo-500 text-white dark`}
                isLoading ={isLoading}
              >
                Subscribe
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default NewsLetterSection;
