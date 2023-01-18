import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect, Link } from "react-router-dom";
import "./index.css";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });
    const { email } = this.state;
    localStorage.setItem("userEmail", email);
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const userDetails = { email, password };
    const url = "http://localhost:3000/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
      console.log(`Login_jwt_token${data.jwt_token}`);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
    console.log(data);
  };

  render() {
    const { email, password, showSubmitError, errorMsg } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-form-container">
        <form
          method="POST"
          className="form-container"
          onSubmit={this.submitForm}
        >
          <h1 className="form-heading">
            || <span className="span-lms">LMS</span> || <br />
            User Login
          </h1>
          <div className="input-container">
            <input
              type="text"
              id="email"
              className="userEmail-input-field"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
          <Link to="/register">
            <button className="a">don't have account? register</button>
          </Link>
          <Link to="/forgot-password">
            <button className="a">Forgot password ?</button>
          </Link>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    );
  }
}

export default LoginForm;
