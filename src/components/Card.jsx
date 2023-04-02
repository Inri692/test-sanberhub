import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SiCodereview } from "react-icons/si";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { DotWave } from "@uiball/loaders";
import moment from "moment/moment";
import Swal from "sweetalert2";
import axios from "axios";

import { Btn } from "./Button";

const Card = ({}) => {
  const [cookie, setCookie] = useCookies();
  const [datas, setDatas] = useState([]);
  const [view, setView] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddres] = useState("");
  const [born_date, setBorn] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`https://cms-admin.ihsansolusi.co.id/testapi/user`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setDatas(res.data.data);
      })
      .catch(() => {
        Swal.fire("something error");
      })
      .finally(() => setLoading(false));
  };

  const handleView = (id) => {
    axios
      .get(`https://cms-admin.ihsansolusi.co.id/testapi/user/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setView(res.data.data);
      })
      .catch(() => {
        Swal.fire("something error");
      });
  };

  const handleEdit = (id) => {
    setLoading(true);
    const body = {
      name: name,
      gender: gender,
      born_date: born_date,
      address: address,
    };
    axios
      .put(`https://cms-admin.ihsansolusi.co.id/testapi/user/${id}`, body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        fetchData();
        Swal.fire({
          title: "Success",
          text: "successful update data",
          showCancelButton: false,
        });
      })
      .catch(() => {
        Swal.fire("something error");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://cms-admin.ihsansolusi.co.id/testapi/user/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        setDatas(datas && datas.filter((item) => item.id !== id));
        Swal.fire({
          title: "Success",
          text: res.data.detail,
          showCancelButton: false,
          confirmButtonText: "Ok",
        });
      })
      .catch(() => {
        Swal.fire("something error");
      });
  };

  return (
    <>
      <div className="flex justify-start min-h-screen ">
        <div className="overflow-auto lg:overflow-visible w-full ">
          <table className="table  table-auto divide-y bg-black text-gray-900 border-separate space-y-6 text-sm w-full">
            <thead className="bg-gray-800 text-black">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left hidden md:table-cell">Alamat</th>
                <th className="p-3 text-left hidden md:table-cell">P/L</th>
                <th className="p-3 text-left hidden md:table-cell">
                  Tanggal Lahir
                </th>
                <th className="p-3 text-left hidden md:table-cell">
                  Tanggal Input
                </th>
                <th className="p-3 text-left ">Action</th>
              </tr>
            </thead>
            {loading ? (
              <div className="w-full flex items-center justify-center">
                <DotWave size={100} color={"#f8fafc"} />
              </div>
            ) : (
              <tbody>
                {datas &&
                  datas.map((item) => (
                    <tr className="bg-gray-950" key={item.id}>
                      <td className="p-3 ">
                        <div className="flex align-items-center">
                          <img
                            className="rounded-full h-12 w-12  object-cover"
                            src={
                              "https://images.unsplash.com/photo-1613588718956-c2e80305bf61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80"
                            }
                            alt="unsplash image"
                          />
                          <div className="ml-3">
                            <div className="text-black font-bold text-lg">
                              {item.name}
                            </div>
                            <div className="text-black">
                              Input by :{item.user_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        {item.address}
                      </td>
                      <td className="p-3 font-bold hidden md:table-cell">
                        {item.gender}
                      </td>
                      <td className="p-3 font-bold hidden md:table-cell">
                        {moment(item.born_date).format("DD MMMM YYYY")}
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <span className="bg-[#312e81] text-white rounded-md px-2 ">
                          {moment(item.created_at).format("DD MMMM YYYY h:mm")}
                        </span>
                      </td>
                      <td className="p-8 flex flex-row h-20 ">
                        <a
                          href="#my-modal-2"
                          className="text-gray-900 hover:text-gray-100 mr-2"
                        >
                          <i className="material-icons-outlined text-base">
                            <SiCodereview onClick={() => handleView(item.id)} />
                          </i>
                        </a>
                        <div className="modal" id="my-modal-2">
                          <div className="modal-box bg-[#e2e8f0]">
                            <h3 className="font-bold text-3xl">Data User</h3>
                            <div className="flex flex-row justify-start gap-24 pt-3">
                              <h1 className="text-xl font-bold">Nama:</h1>
                              <p className="text-xl font-bold">{view.name}</p>
                            </div>
                            <div className="flex flex-row justify-start gap-20 pt-3">
                              <h1 className="text-xl font-bold">Gender:</h1>
                              <p className="text-xl font-bold">{view.gender}</p>
                            </div>
                            <div className="flex flex-row justify-start gap-5 pt-3">
                              <h1 className="text-xl font-bold">
                                Tanggal Lahir:
                              </h1>
                              <p className="text-xl font-bold">
                                {moment(view.born_date).format("DD MMMM YYYY")}
                              </p>
                            </div>
                            <div className="flex flex-row justify-start gap-5 pt-3">
                              <h1 className="text-xl font-bold">
                                Tanggal Input:
                              </h1>
                              <p className="text-xl font-bold">
                                {moment(view.created_at).format(
                                  "DD MMMM YYYY h:mm"
                                )}
                              </p>
                            </div>
                            <div className="flex flex-row justify-start gap-14 pt-3">
                              <h1 className="text-xl font-bold">Username:</h1>
                              <p className="text-xl font-bold">
                                {view.user_name}
                              </p>
                            </div>
                            <div className="modal-action">
                              <a href="#" className="btn rounded-full">
                                Close
                              </a>
                            </div>
                          </div>
                        </div>

                        <a
                          href="#my-modal-1"
                          className="text-blue hover:text-gray-100  mx-2"
                        >
                          <i className="material-icons-outlined text-base">
                            <FaRegEdit />
                          </i>
                        </a>
                        <div
                          className="modal modal-middle sm:modal-middle"
                          id="my-modal-1"
                        >
                          <div className="modal-box bg-[#e2e8f0] ">
                            <h3 className="font-bold lg:text-2xl  text-base text-black text-center  ">
                              Update User
                            </h3>
                            {loading ? (
                              <div className="w-full flex items-center justify-center">
                                <DotWave size={100} color={"#f8fafc"} />
                              </div>
                            ) : (
                              <form
                                onSubmit={() => handleEdit(item.id)}
                                encType="application/json"
                              >
                                <div className="flex py-2 flex-col">
                                  <label className="font-bold text-black text-xl flex items-start justify-start w-1/2 text-start">
                                    Name
                                  </label>
                                  <input
                                    id="name"
                                    className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>

                                <div className="flex py-2 flex-col">
                                  <label className="font-bold text-black text-xl flex items-start justify-start w-1/2 text-start">
                                    Address
                                  </label>
                                  <input
                                    id="email-profil"
                                    className="rounded-lg bg-white border-[#e5e5e5] px-5 p-2 border-2 focus:outline-none text-black w-full"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddres(e.target.value)}
                                  />
                                </div>
                                <p className="my-1 font-bold text-black text-xl">
                                  Jenis Kelamin
                                </p>
                                <div className="flex flex-row items-center gap-3">
                                  <label className="gap-3">
                                    <input
                                      type="radio"
                                      value="l"
                                      checked={gender === "l"}
                                      onChange={handleGenderChange}
                                    />
                                    Laki-laki
                                    <input
                                      type="radio"
                                      value="p"
                                      checked={gender === "p"}
                                      onChange={handleGenderChange}
                                    />
                                    Perempuan
                                  </label>
                                </div>
                                <p className="my-3 font-bold text-black text-xl">
                                  Tanggal Lahir
                                </p>
                                <input
                                  className="w-[30%]"
                                  id="born-date"
                                  type={"date"}
                                  name="datemax"
                                  onChange={(e) => setBorn(e.target.value)}
                                />

                                <div className="grid grid-cols-2 w-2/3 md:w-full lg:w-full max-w-md mt-3 gap-3">
                                  <Btn
                                    id="btn-addUser"
                                    className="my-6 bg-[#312e81] text-white "
                                    label="Save"
                                  />
                                  <div className="modal-action">
                                    <a
                                      href="#"
                                      className="btn rounded-full w-full"
                                    >
                                      Close
                                    </a>
                                  </div>
                                </div>
                              </form>
                            )}
                          </div>
                        </div>

                        <a
                          href="#"
                          className="text-red hover:text-gray-100  ml-2"
                        >
                          <i className="material-icons-round text-base">
                            <MdDelete onClick={() => handleDelete(item.id)} />
                          </i>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default Card;
