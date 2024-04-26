import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; // Adjust import for deleteDoc
import { db } from "app/firebase/config";
import ListTile from "./listTile";
import LoadingIndicator from "../utilComponents/loading";
import { Button, Input } from "@nextui-org/react";

function NewsletterList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchEmails() {
      setLoading(true);
      const emailsCollection = collection(db, "newsletter");
      const emailSnapshot = await getDocs(emailsCollection);
      const emailList = emailSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmails(emailList);
      setLoading(false);
    }

    fetchEmails();
  }, []);

  const deleteEmail = async (emailId) => {
    if (window.confirm("Are you sure you want to delete this email?")) {
      const emailRef = doc(db, "newsletter", emailId);
      await deleteDoc(emailRef)
        .then(() => {
          setEmails(emails.filter((email) => email.id !== emailId));
        })
        .catch((error) => console.error("Error deleting document: ", error));
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredEmails = emails.filter((email) =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Loading emails...</p>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl mb-4">Newsletter Emails</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input w-full sm:w-96 border-2 hover:border-gray-400 border-gray-200 rounded-xl mb-2 md:mb-0 p-1.5"
        />
      </div>
      <ul className="w-full">
        {filteredEmails.map((email) => (
          <ListTile
            key={email.id}
            title={email.email}
            trailing={
              <Button
                className="bg-red-500 hover:bg-black text-white"
                onClick={() => deleteEmail(email.id)}
              >
                Delete
              </Button>
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default NewsletterList;
