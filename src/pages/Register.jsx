import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { Input } from "../components/Input";
import { Btn } from "../components/Button";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (name && email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("https://cms-admin.ihsansolusi.co.id/testapi/auth/register", body)
      .then((res) => {
        console.log(res.data.token);
        Swal.fire({
          title: "Success",
          text: res.data.detail,
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Failed",
          text: err.response.data.message,
          showCancelButton: false,
        });
      });
  };

  return (
    <div className="flex w-full h-screen bg-white">
      <div
        className="w-1/2 h-full bg-no-repeat bg-cover opacity-95 hidden lg:block"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-vector/man-look-graphic-chart-business-analytics-concept-big-data-processing-icon_39422-761.jpg)`,
        }}
      ></div>
      <div className="m-5 lg:mx-auto bg-[#e2e8f0] w-full max-w-md rounded-3xl p-5 my-5 shadow-lg">
        <h1 id="register-page" className="text-3xl text-center mb-10">
          Register
        </h1>
        <form onSubmit={handleSubmit} encType="application/json">
          <Input
            id="input-name"
            title="Name"
            placeholder="Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            id="input-email"
            title="Email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="input-password"
            title="Password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm pt-2">
            Already have an account?
            <Link
              id="direct-login"
              className="text-blue-700 font-bold ml-1"
              to="/login"
            >
              login
            </Link>
          </p>
          <Btn
            id="btn-register"
            disabled={disabled}
            className="my-10 "
            label="Register"
          />
        </form>
      </div>
    </div>
  );
};
export default Register;
