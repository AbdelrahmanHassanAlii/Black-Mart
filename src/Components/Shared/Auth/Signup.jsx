/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
export default function SignUpForm({ handleSignInClick }) {
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    }
  return (
    <form action="#" className="sign-up-form" onSubmit={handleFormSubmit}>
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-signature"></i>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
        />
      </div>
      <div className="input-field">
        <i className="fas fa-signature"></i>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
        />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div className="input-field">
        <i className="fas fa-phone"></i>
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
        />
      </div>
      <input type="submit" className="btn" value="Sign up" />
    </form>
  );
}
