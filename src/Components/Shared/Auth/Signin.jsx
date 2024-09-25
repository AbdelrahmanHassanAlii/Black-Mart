import { useState } from "react";
import { signin } from "../../../Helper/Apis/Shared/Auth/Signin";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addItemToLS } from "../../../Helper/Funcation/LocalStorage/AddItemToLS";
import { getToken } from "../../../Helper/Funcation/LocalStorage/getToken";
import { getItemFromLS } from "../../../Helper/Funcation/LocalStorage/GetItemFromLS";

// Components/SignInForm.js
export default function SignInForm() {

  const navigate = useNavigate();

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
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/.test(
      password
    )){
      errors.password = "Password Not Following The Pattern";
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
      // console.log(updatedUserData);

      try {
        const response = await signin(updatedUserData);
        console.log(response);
        localStorage.setItem("loginData",JSON.stringify(response.data));
        // console.log(response);
        addItemToLS("logingData", response.data);
        // let token = getToken();
        // console.log(token);
        // console.log(getItemFromLS("logingData"));
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully signed in!",
          showConfirmButton: true,
          confirmButtonColor: "#299fff",
          confirmButtonText: "Enter the App",
        }).then(() => {
          navigate("/");
          setUserData({
            email: "",
            password: "",
          });
          setErrors({
            email: "",
            password: "",
            backEndErrors: "",
          });
        })
      } catch (error) {
        console.error(error);
        setErrors({
          backEndErrors: "Invalid email or password",
        });
        // console.log(error.response.data.message);
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
