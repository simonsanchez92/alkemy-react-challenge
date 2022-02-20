import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react/cjs/react.development";
import Spinner from "../components/Spinner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSign, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const setAuth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const login = async (e) => {
    e.preventDefault();

    if (formEmail === "") {
      setEmailError(true);
    }

    if (formPassword === "") {
      setPasswordError(true);
    }

    if (formEmail !== "" && formPassword !== "") {
      setIsLoading(true);

      try {
        const res = await axios.post("http://challenge-react.alkemy.org/", {
          email: formEmail,
          password: formPassword,
        });

        const token = res?.data?.token;
        localStorage.setItem("alkemyToken", JSON.stringify(token));

        navigate(from, { replace: true });
      } catch (err) {
        if (err.response) {
          swal("Invalid credentials", err.response?.data?.error, "error");
        }
        setIsLoading(false);
      }
    }
  };

  const handleEmailChange = (e) => {
    setFormEmail(e.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (e) => {
    setFormPassword(e.target.value);
    setPasswordError(false);
  };

  useEffect(() => {
    if (localStorage.getItem("alkemyToken")) {
      navigate(from, { replace: true });
    }
  }, []);

  return (
    <div className="login-container w-100  mb-5 p-3 my-5 d-flex flex-column justify-content-center">
      <h2 className="align-self-center pb-5">Welcome</h2>

      <form className="login-form align-self-center d-flex flex-column">
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className={
              emailError ? "form-control is-invalid " : "form-control "
            }
            id="emailInput"
            aria-describedby="emailHelp"
            value={formEmail}
            onChange={(e) => handleEmailChange(e)}
          />

          <div className="invalid-feedback">Please provide a valid email.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="passwordInput" className="form-label">
            Password
          </label>
          <input
            type="password"
            className={
              passwordError ? "form-control is-invalid" : "form-control"
            }
            id="passwordInput"
            value={formPassword}
            onChange={(e) => handlePasswordChange(e)}
          />
          <div className="invalid-feedback">Please provide a password.</div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="btn w-75 my-3 "
          onClick={(e) => login(e)}
        >
          <span className="px-2">Log In</span>
          <FontAwesomeIcon icon={faArrowCircleRight} />
        </button>
      </form>
      <div className="spinner-container mt-4">
        <Spinner loading={isLoading} />
      </div>
    </div>
  );
};

export default Login;
