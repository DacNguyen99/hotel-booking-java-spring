import React, { useContext, useState } from "react";
import { loginUser } from "../utils/ApiFunction";
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const redirectUrl = location.state?.from || "/";

  const handleInputChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(login);
    if (success) {
      const token = success.jwt;
      auth.handleLogin(token);
      navigate(redirectUrl, { replace: true });
      window.location.reload();
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            Email
          </label>

          <div>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              value={login.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            Password
          </label>

          <div>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={login.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-hotel"
            style={{ marginRight: "10px" }}
          >
            Login
          </button>
          <span style={{ marginLeft: "10px" }}>
            Don't have an account yet?{" "}
            <Link to={"/register"}>Register here!</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Login;
