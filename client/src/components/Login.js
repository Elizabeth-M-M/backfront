import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({handleUser}) => {
  const navigator = useNavigate();
  const [errors, setErrors] = useState([]);

  const [loginFormData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleInputs(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({
      ...loginFormData,
      [name]: value,
    });
  }
  // This POST request creates a user on the database and logs in a user to the program
  function handleSubmit(event) {
    event.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginFormData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => handleUser(user));
        setFormData({
          username: "",
          email: "",
          password: "",
          password_confirmation: "",
        });
        navigator("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="page-min-height text-center">
      <h2 className=" theme-color">Log In</h2>
      <div className="container">
        <div className="col-6 m-auto mt-5">
          <form
            className="row g-3 needs-validation"
            onSubmit={handleSubmit}
            novalidate
          >
            <div className="col-md-6">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                onChange={handleInputs}
                name="username"
                value={loginFormData.username}
                required
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleInputs}
                name="password"
                value={loginFormData.password}
                required
              />
            </div>
            <Link to="/signup">Don't have an account?</Link>
            <div className="col-12">
              <button type="submit" className="btn btn-info">
                Log in
              </button>
            </div>
            <ul>
              {errors.length > 0
                ? errors.map((err) => <li key={err}>{err}</li>)
                : null}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
