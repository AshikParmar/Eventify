import React from "react";
import { useSelector } from "react-redux";
import Loading from "../../ui/Loading";

const UsersList = () => {

  const { users, loading, error } = useSelector((state)=> state.userList);
  // console.log("users",users)

  if (loading) return <Loading title="Loading Users..."/>
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Users List</h3>
      <table className="w-full text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="w-5 p-3"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,i) => {
            return <tr key={user._id} className="border-b">
              <td className="p-3">{i+1}</td>
              <td className="p-3">{user.username}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">View</td>
            </tr>

          })}
        </tbody>
      </table>
    </div>
  )
}


export default UsersList
