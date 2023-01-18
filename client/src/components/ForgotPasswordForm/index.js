import { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class ForgotPasswordForm extends Component {
  state = {
    email: "",
  };
  submitForm = async (event) => {
    event.preventDefault();
    const { email } = this.state;
    const userDetails = { email };
    const url = "http://localhost:3000/forgot-password";
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
    //   this.onSubmitSuccess(data.link);
    //   console.log(data);
    window.alert("navigated  PASSWORD-reset link to youe existing email account");
      console.log(data.link);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
    console.log(data);
  };
  render() {
    const { email } = this.state;
    return (
      <div className="login-form-container">
        <form
          method="POST"
          className="form-container-2"
          onSubmit={this.submitForm}
        >
          <h1 className="form-heading">
            <span className="span-lms">change your Password</span>
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

          <button type="submit" className="login-button">
            Submit
          </button>
          <Link to="/register">
            <button className="a">don't have account? register</button>
          </Link>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordForm;
