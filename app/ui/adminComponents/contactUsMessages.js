import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "app/firebase/config";
import ListTile from "./listTile";
import LoadingIndicator from "../utilComponents/loading";
import {Button,Input} from "@nextui-org/react";


function ContactQueryList() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchQueries() {
      setLoading(true);
      const queryCollection = collection(db, "contact-us");
      const querySnapshot = await getDocs(queryCollection);
      const queryList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQueries(queryList);
      setLoading(false);
    }

    fetchQueries();
  }, []);

  const deleteQuery = async (queryId) => {
    if (window.confirm("Are you sure you want to delete this query?")) {
      const queryRef = doc(db, "contact-us", queryId);
      await deleteDoc(queryRef)
        .then(() => {
          setQueries(queries.filter((query) => query.id !== queryId));
        })
        .catch((error) => console.error("Error deleting document: ", error));
    }
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Update the filter condition to search by either email or message
  const filteredQueries = queries.filter((query) =>
    query.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    query.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Loading contact queries...</p>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl mb-4">Contact Queries</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search queries by message or email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input w-full sm:w-96 border-2 hover:border-gray-400 border-gray-200 rounded-xl mb-2 md:mb-0 p-1.5"
        />
      </div>
      <ul className="w-full">
        {filteredQueries.map((query) => (
          <ListTile
            key={query.id}
            title={query.name} // Assuming 'name', 'email', and 'message' fields exist
            subtitle={query.email}
            subtitle2={query.message}
            trailing={
              <Button
              className="bg-red-500 hover:bg-black text-white"
              onClick={() => deleteQuery(query.id)}
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

export default ContactQueryList;
