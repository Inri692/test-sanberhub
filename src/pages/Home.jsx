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
  const [loading, setLoading] = useState(true);
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = (e) => {
    setLoading(true);
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
          title: "Success Add User",
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch(() => {
        Swal.fire("something error");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout>
      <div className="m-10">
        <div className="flex flex-row justify-between">
          <h1 className="font-bold text-2xl py-5">User List</h1>

          <div className="pt-5 py-4 space-y-1">
            <label htmlFor="my-modal-6" className="btn bg-[#312e81] text-xl">
              Add User
            </label>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle ">
              <div className="modal-box bg-[#e2e8f0]">
                <h3 className="font-bold text-2xl text-center">Add User</h3>
                <form onSubmit={handleSubmit} encType="application/json">
                  <Input
                    id="input-name"
                    title="Nama"
                    placeholder="nama minimal 8 karakter"
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
                  <div className="flex flex-row items-center gap-3">
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
                  </div>
                  <p className="my-3 font-bold text-lg">Tanggal Lahir</p>
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
                      label="Add"
                    />

                    <div className="modal-action">
                      <label
                        htmlFor="my-modal-6"
                        className="btn rounded-full w-full"
                      >
                        Cancel
                      </label>
                    </div>
                  </div>
                </form>
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
