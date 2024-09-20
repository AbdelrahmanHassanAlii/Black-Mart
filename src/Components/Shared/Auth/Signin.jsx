// Components/SignInForm.js
export default function SignInForm() {

    const handleFormSubmit = (event) => {
        event.preventDefault();
    };

  return (
    <form action="#" className="sign-in-form" onSubmit={handleFormSubmit}>
      <h2 className="form-title">Sign in</h2>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input type="text" name="email" placeholder="Email" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" name="password" placeholder="Password" />
      </div>
      <input type="submit" value="Login" className="btn solid" />
    </form>
  );
}
