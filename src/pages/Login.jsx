import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

import axios from "axios";

import { Btn, Btns } from "../components/Button";
import { Input } from "../components/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies();

  useEffect(() => {
    if (email && password) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };

    axios
      .post("https://cms-admin.ihsansolusi.co.id/testapi/auth/login", body)
      .then((res) => {
        setCookie("token", res.data.token);
        Swal.fire({
          title: "Success",
          text: res.data.message,
          showCancelButton: false,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/home");
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
    <div className="flex min-h-screen items-center">
      <div
        className="hero w-1/2 h-screen hidden lg:block"
        style={{
          backgroundImage: `url(https://img.freepik.com/free-vector/man-look-graphic-chart-business-analytics-concept-big-data-processing-icon_39422-761.jpg)`,
        }}
      >
        <span className="hero-overlay bg-opacity-60" />
      </div>
      <div className="m-5 lg:mx-auto bg-[#e2e8f0] w-full max-w-md rounded-3xl p-5 my-5 shadow-lg">
        <h1 id="login-page" className="text-3xl text-center mb-10">
          Login
        </h1>
        <form onSubmit={handleSubmit} encType="application/json">
          <Input
            id="input-email"
            title="Email"
            placeholder="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            id="input-password"
            title="Password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Btn
            id="btn-login"
            disabled={disabled}
            className="my-3 mt-10"
            label="Login"
          />
        </form>
        <p className="text-center">Or</p>
        <Link to="/">
          <Btns id="btn-register" className="my-3" label="Register" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
