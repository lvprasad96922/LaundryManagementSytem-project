import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

class RegistrationForm extends Component {
  state = {
    id: uuidv4(),
    name: "",
    email: "",
    mobile: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
  };
  onSubmitSuccess = (message) => {
    window.alert(message);
    const { history } = this.props;
    history.push("/login");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ showSubmitError: true, errorMsg });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const { id, name, email, mobile, password } = this.state;
    const userDetails = { id, name, email, mobile, password };
    console.log(userDetails);
    const url = "http://localhost:3000/register";
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
      this.onSubmitSuccess(data.message);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
    // console.log(data);
  };

  render() {
    const {
      email,
      password,
      name,
      mobile,
      showSubmitError,
      errorMsg,
    } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="top-container">
            <h3 className="form-heading">
              <span className="span-lms">LMS ||</span> User Registration
            </h3>
          </div>
          <div className="input-container">
            <input
              type="text"
              id="name"
              className="username-input-field"
              value={name}
              placeholder="Name"
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
          </div>
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
              type="tel"
              id="mobile"
              className="userMobile-input-field"
              value={mobile}
              placeholder="Mobile"
              onChange={(e) => {
                this.setState({ mobile: e.target.value });
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
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <button type="submit" className="login-button">
            Register
          </button>
          <Link to="/login">
            <button type="button" className="a">
              Login Page
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
