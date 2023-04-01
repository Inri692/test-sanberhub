import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";

import Layout from "../components/Layout";
import { Input } from "../components/Input";
import { Btn } from "../components/Button";
import Card from "../components/Card";

const Home = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddres] = useState("");
  const [born_date, setBorn] = useState("");
  const [cookie, setCookie] = useCookies();
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      name: name,
      gender: gender,
      address: address,
      born_date: born_date,
    };
    // if (gender !== "l" && gender !== "p") {
    //   return gender;
    // }
    axios
      .post("https://cms-admin.ihsansolusi.co.id/testapi/user", body, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Success",
          text: res.data.detail,
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(0);
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed",
          showCancelButton: false,
        });
      });
  };

  return (
    <Layout>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <h1>User List</h1>
          <div className="pt-5 py-4 space-y-1">
            <label htmlFor="my-modal-6" className="btn">
              Add User
            </label>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Add User</h3>
                <form onSubmit={handleSubmit} encType="application/json">
                  <Input
                    id="input-name"
                    title="Name"
                    placeholder="name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Input
                    id="input-alamat"
                    title="Alamat"
                    placeholder="alamat"
                    type="text"
                    onChange={(e) => setAddres(e.target.value)}
                  />
                  <p className="my-1 font-bold text-lg">Jenis Kelamin</p>
                  <div className="flex flex-row items-center">
                    {/* <label> */}
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
                    {/* </label> */}
                    {/* <input
                      type="radio"
                      id="radio1"
                      name="radio-group"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label
                      for="radio1"
                      className="flex items-center cursor-pointer"
                    >
                      p
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="radio2"
                      name="radio-group"
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <label
                      for="radio2"
                      className="flex items-center cursor-pointer"
                    >
                      w
                    </label> */}
                  </div>
                  <p className="my-3 font-bold text-lg">Tanggal Lahir</p>
                  <input
                    className="w-[30%]"
                    id="born-date"
                    type={"date"}
                    name="datemax"
                    onChange={(e) => setBorn(e.target.value)}
                  />

                  <Btn id="btn-addUser" className="my-10 " label="Add" />
                </form>
                <div className="modal-action">
                  <label htmlFor="my-modal-6" className="btn">
                    cancel
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Card />
      </div>
    </Layout>
  );
};

export default Home;
