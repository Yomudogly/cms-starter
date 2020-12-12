import React, { useState, useEffect } from "react";
import { firestore } from "../firebase/config";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userRef = firestore.collection("users");
    const unsubscribe = userRef.onSnapshot((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUsers(users);
    });
    return unsubscribe;
  }, []);

  return (
    <section className='h-screen text-gray-500 bg-gray-900 body-font'>
      <Header></Header>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-col text-center w-full mb-20'>
          <h1 className='sm:text-4xl text-3xl font-medium title-font mb-2 text-white'>
            List of users
          </h1>
        </div>
        <div className='lg:w-2/3 w-full mx-auto overflow-auto'>
          <table className='table-auto w-full text-left whitespace-no-wrap'>
            <thead>
              <tr>
                <th className='rounded-l-lg px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800'>
                  Name
                </th>
                <th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800'>
                  Specialty
                </th>
                <th className='px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800'>
                  Address
                </th>
                <th className='rounded-r-lg px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800'>
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid}>
                  <td className='border-b-2 border-gray-800 px-4 py-3 text-white focus:outline-none hover:text-indigo-600'>
                    <Link
                      to={{
                        pathname: `/profile/${user.uid}`,
                      }}
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className='border-b-2 border-gray-800 px-4 py-3'>
                    {user.specialty}
                  </td>
                  <td className='border-b-2 border-gray-800 px-4 py-3'>
                    {user.address}
                    {user.address && user.city ? "," : ""} {user.city}
                    {user.city && user.state ? "," : ""} {user.state} {user.zip}
                  </td>
                  <td className='border-b-2 border-gray-800 px-4 py-3'>
                    {user.phone}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Users;
