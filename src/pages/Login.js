import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { login } from "../API/actions";
import AnimatedPage from "../components/AnimatedPage";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const handleLogin = async (e) => {
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
        await login(formEmail, formPassword);
        navigate(from, { replace: true });
      } catch (err) {
        swal("Invalid credentials", err.response?.data?.error, "error");
      }
    }

    setIsLoading(false);
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
  }, [from, navigate]);

  return (
    <AnimatedPage>
      <div className="login-container w-100  mb-5 p-3 my-5 d-flex flex-column justify-content-center">
        <h2 className="align-self-center pb-5">Welcome</h2>

        <form className="login-form align-self-center d-flex flex-column">
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className={
                emailError ? "form-control is-invalid " : "form-control "
              }
              id="emailInput"
              aria-describedby="emailHelp"
              value={formEmail}
              onChange={(e) => handleEmailChange(e)}
            />

            {emailError && (
              <div className="invalid-feedback">
                Please provide a valid email.
              </div>
            )}
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
            {passwordError && (
              <div className="invalid-feedback">Please provide a password.</div>
            )}
          </div>

          <button
            title="login-btn"
            disabled={isLoading}
            type="submit"
            className="btn w-75 my-3 "
            onClick={(e) => handleLogin(e)}
          >
            <span className="px-2">Log In</span>
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        </form>
        <div className="spinner-container mt-4">
          <Spinner loading={isLoading} />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Login;
