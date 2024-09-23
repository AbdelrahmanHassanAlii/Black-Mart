/* eslint-disable react/prop-types */

import { useState } from "react";

/* eslint-disable no-unused-vars */
export default function SignUpForm({ handleSignInClick }) {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

    const [errors, setErrors] = useState({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });


  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const checkErrors = () => {
    const { userName, email, password, confirmPassword } = userData;
    const errors = {};

    if (!userName) {
      errors.userName = "User Name is required";
    } else if (/^\d+$/.test(userName)) {
      errors.userName = "User Name cannot contain only numbers";
    }

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userData);
  };
  return (
    <form action="#" className="sign-up-form" onSubmit={handleFormSubmit}>
      <h2 className="form-title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-signature"></i>
        <input
          type="text"
          name="userName"
          placeholder="User Name"
          onChange={handleChange}
        />
      </div>
      <div className="input-field email">
        <div className="left">
          <i className="fas fa-envelope"></i>
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="right">@blackmart.com</div>
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="btn"
        value="Sign up"
        onClick={handleFormSubmit}
      />
    </form>
  );
}
