import React, { useState } from "react";
import { registerUser } from "../utils/ApiFunction";
import { Link } from "react-router-dom";

const Registration = () => {
  const [registration, setRegistration] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistration({ ...registration, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await registerUser(registration);
      setSuccessMessage(result);
      setErrorMessage("");
      setRegistration({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(`Registration failed: ${error.message}!`);
      setSuccessMessage("");
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 5000);
  };

  return (
    <section className="container col-6 mt-5 mb-5">
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}

      <h2 className="text-center mb-4">Register</h2>
      <form onSubmit={handleRegister}>
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
              value={registration.email}
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
              value={registration.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <label htmlFor="firstName" className="col-sm-2 col-form-label">
            First Name
          </label>

          <div>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="form-control"
              value={registration.firstName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <label htmlFor="lastName" className="col-sm-2 col-form-label">
            Last Name
          </label>

          <div>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="form-control"
              value={registration.lastName}
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
            Register
          </button>
          <span style={{ marginLeft: "10px" }}>
            Already have an account? <Link to={"/login"}>Login here!</Link>
          </span>
        </div>
      </form>
    </section>
  );
};

export default Registration;
