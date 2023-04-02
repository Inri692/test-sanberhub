import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Navbar = ({}) => {
  const [user, setUser] = useState({});
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`https://cms-admin.ihsansolusi.co.id/testapi/auth/me`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          showCancelButton: false,
        });
      });
  };

  return (
    <div className="flex flex-col flex-auto hidden md:table-cell flex-shrink-0 antialiased bg-white bg-gray-50 text-white">
      <div className="fixed flex flex-col top-0 left-0 w-64 bg-[#312e81] h-full border-r">
        <div className="flex items-center justify-center h-14 border-b">
          <div className="text-2xl font-bold">Super Admin</div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden py-4 space-y-1 px-5">
          <div className="w-[150px] h-[150px] mx-auto mt-3 rounded-full bg-white border-none">
            <img
              src={"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              className="rounded-full w-[150px] h-[150px]"
            />
          </div>
          <div className="pt-5">
            <h1 className="text-xl font-bold">Hello, {user.name}</h1>
            <p className="text-md font-normal">{user.email}</p>
            <p className="text-md font-normal">{user.status}</p>
          </div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow pt-3">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-2xl font-bold tracking-wide text-white">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-red hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </span>
                <span className="ml-2 text-xl font-bold text-white hover:text-gray-800">
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-red hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                </span>

                <span className="ml-2 text-xl font-bold text-white hover:text-gray-800">
                  <Link to="/">Logout</Link>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
