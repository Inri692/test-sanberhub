import React from "react";
import { SiCodereview } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const Card = ({}) => {
  return (
    <>
      <div className="flex justify-start min-h-screen ">
        <div className="overflow-auto lg:overflow-visible ">
          <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
            <thead className="bg-gray-800 text-gray-500">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3 text-left">Alamat</th>
                <th className="p-3 text-left">P/W</th>
                <th className="p-3 text-left">Tanggal Lahir</th>
                <th className="p-3 text-left">Tanggal Input</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-950">
                <td className="p-3">
                  <div className="flex align-items-center">
                    <img
                      className="rounded-full h-12 w-12  object-cover"
                      src={
                        "https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                      }
                      alt="unsplash image"
                    />
                    <div className="ml-3">
                      <div className="">Appple</div>
                      <div className="text-gray-500">mail@rgmail.com</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">Technology</td>
                <td className="p-3 font-bold">200.00$</td>
                <td className="p-3 font-bold">200.00$</td>
                <td className="p-3">
                  <span className="bg-green-400 text-gray-50 rounded-md px-2">
                    available
                  </span>
                </td>
                <td className="p-3 flex flex-row">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gray-100 mr-2"
                  >
                    <i className="material-icons-outlined text-base">
                      <SiCodereview />
                    </i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gray-100  mx-2"
                  >
                    <i className="material-icons-outlined text-base">
                      <FaRegEdit />
                    </i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-gray-100  ml-2"
                  >
                    <i className="material-icons-round text-base">
                      <MdDelete />
                    </i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Card;
