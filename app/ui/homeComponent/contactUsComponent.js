import React, { useState } from "react";
import { db } from "app/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button, Input, Textarea } from "@nextui-org/react";

function ContactUsSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
 
    try {
      await addDoc(collection(db, "contact-us"), {
        name: name,
        email: email,
        message: message,
        timeStamp: serverTimestamp(),
      });
      setIsLoading(false);
      alert("Message sent! We will get back to you shortly.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending message: ", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="body-font relative bg-gray-900 text-gray-400">
      <div className="container mx-auto px-5 py-24">
        <div className="mb-12 flex w-full flex-col text-center">
          <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">
            Contact Us
          </h1>
          <p className="mx-auto text-base leading-relaxed lg:w-2/3">
            Feel free to reach out to us! Whether you have a question, feedback,
            or a collaboration proposal, we&apos;d love to hear from you.
          </p>
        </div>
        <form className="mx-auto md:w-2/3 lg:w-1/2" onSubmit={handleSubmit}>
          <div className="-m-2 flex flex-wrap">
            <div className="w-1/2 p-2">
              <div className="relative">
                <Input
                  id="name"
                  size="md"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  isRequired
                />
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="relative">
                <Input
                  size="md"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired
                />
              </div>
            </div>
            <div className=" w-full p-2">
              <div className="relative">
                <Textarea
                  placeholder="Message"
                  name="message"
                  type="text"
                  className=" w-full"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  isRequired
                />
              </div>
            </div>
            <div className="w-full p-2">
              <Button
                type="submit"
                size="md"
                className={`bg-indigo-500 text-white mx-auto flex dark`}
                isLoading={isLoading}
              >
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactUsSection;
