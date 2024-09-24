/* eslint-disable react/prop-types */
import { useState } from "react";
import { signup } from "../../../Helper/Apis/User/Auth/Signup";
import { Navigate } from "react-router-dom";

/* eslint-disable no-unused-vars */
export default function SignUpForm({ handleSignInClick }) {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const checkErrors = () => {
    const { username, email, password, confirmPassword } = userData;
    const errors = {};

    if (!username) {
      errors.username = "User Name is required";
    } else if (/^\d+$/.test(username)) {
      errors.username = "User Name cannot contain only numbers";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (/^\d+$/.test(email)) {
      errors.email = "Email cannot contain only numbers";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/.test(
        password
      )
    ) {
      errors.password =
        "more than 8 characters, contain uppercase, lowercase, numbers and special character";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleEmailRoute = (email) => {
    if (!email.includes("@blackmart.com")) {
      return email + "@blackmart.com";
    }
    return email;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formErrors = checkErrors();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const updatedUserData = {
        ...userData,
        email: handleEmailRoute(userData.email),
      };

      console.log(updatedUserData);

      try {
        const response = await signup(updatedUserData);
        console.log(response);
        Navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form action="#" className="sign-up-form" onSubmit={handleFormSubmit}>
      <h2 className="form-title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-signature"></i>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          onChange={handleChange}
        />
      </div>
      {errors.username && <p className="error">{errors.username}</p>}
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
      {errors.email && <p className="error">{errors.email}</p>}
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      {errors.password && <p className="error">{errors.password}</p>}
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
      </div>
      {errors.confirmPassword && (
        <p className="error">{errors.confirmPassword}</p>
      )}
      <input
        type="submit"
        className="btn"
        value="Sign up"
        onClick={handleFormSubmit}
      />
    </form>
  );
}
