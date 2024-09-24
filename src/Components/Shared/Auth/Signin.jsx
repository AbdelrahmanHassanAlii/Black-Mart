import { useState } from "react";
import { signin } from "../../../Helper/Apis/Shared/Auth/Signin";

// Components/SignInForm.js
export default function SignInForm() {

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    backEndErrors: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const checkErroes = () => {
    const{ email, password } = userData;
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    }

    if (!password) {
      errors.password = "Password is required";
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

    const formErrors = checkErroes();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      const updatedUserData = {
        ...userData,
        email: handleEmailRoute(userData.email),
      };
      console.log(updatedUserData);

      try {
        const response = await signin(updatedUserData);
        console.log(response);
      } catch (error) {
        console.error(error);
        setErrors({
          backEndErrors: "error in username or password",
        });
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <form action="#" className="sign-in-form" onSubmit={handleFormSubmit}>
      <h2 className="form-title">Sign in</h2>
      <div className="input-field email">
        <div className="left">
          <i className="fas fa-envelope"></i>
          <input type="text" name="email" placeholder="Email" onChange={handleChange} value={userData.email} />
        </div>
        <div className="right">@blackmart.com</div>
      </div>
      {errors.email && <p className="error">{errors.email}</p>}
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} value={userData.password} />
      </div>
      {errors.password && <p className="error">{errors.password}</p>}
      {errors.backEndErrors && <p className="error">{errors.backEndErrors}</p>}
      <input type="submit" value="Login" className="btn solid" />
    </form>
  );
}
