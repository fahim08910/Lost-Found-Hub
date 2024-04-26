import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "app/firebase/config";
import ListTile from "./listTile";
import LoadingIndicator from "../utilComponents/loading";
import {Button,Input} from "@nextui-org/react";


function UserList() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true); // Start loading

      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
      setLoading(false); // Stop loading after fetching data
    }

    fetchUsers();
  }, []);

  const updateRole = async (userId, newRole) => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: newRole })
      .then(() => {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      })
      .catch((error) => console.error("Error updating document: ", error));
  };

  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleRoleFilterChange = (e) => setRoleFilter(e.target.value);

  const filteredUsers = users.filter((user) => {
    const searchCondition =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase());
    if (roleFilter === "all") {
      return searchCondition;
    }
    return searchCondition && user.role === roleFilter;
  });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p>Loading users...</p>
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-4xl">User List</h2>
      <div className="my-5 flex flex-col md:flex-row">
        <input
          type="text"
          placeholder="Search by email or username"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input w-full sm:w-96 border-2 hover:border-gray-400 border-gray-200 rounded-xl mb-2 md:mb-0 p-1.5"
        />
        <select
          value={roleFilter}
          onChange={handleRoleFilterChange}
          className=" p-1.5 border-2 hover:border-gray-400 border-gray-200 rounded-xl cursor-pointer ml-0 md:ml-2 w-full sm:w-auto"
        >
          <option value="all">All Users</option>
          <option value="admin">Admins</option>
          <option value="regular">Regular Users</option>
        </select>
      </div>
      <ul className="w-full">
        {filteredUsers.map((user) => (
          <ListTile
            key={user.id}
            title={user.name}
            subtitle={user.userName}
            subtitle2={user.email}
            additionalInfo={`Role: ${user.role}`}
            trailing={
              user.role === "admin" ? (
                <Button
                className="bg-red-500 hover:bg-black text-white"
                onClick={() => updateRole(user.id, "regular")}
                >
                  Remove as Admin
                </Button>
              ) : (
                <Button
                className="bg-green-500 hover:bg-black text-white"
                onClick={() => updateRole(user.id, "admin")}
                >
                  Add as Admin
                </Button>
              )
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default UserList;
