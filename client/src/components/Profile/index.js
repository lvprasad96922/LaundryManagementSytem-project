import { Component } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import "./index.css";

class Profile extends Component {
  state = {
    profileObject: {},
  };

  componentDidMount() {
    this.getLaundryRequest();
  }

  getLaundryRequest = async () => {
    const jwtToken = Cookies.get("jwt_token");

    const apiUrl = "http://localhost:3000/profile";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = {
        name: fetchedData.name,
        email: fetchedData.email,
        mobile: fetchedData.mobile,
      };
      this.setState({
        profileObject: updatedData,
      });
    }
  };

  render() {
    const { profileObject } = this.state;
    const { name, email, mobile } = profileObject;
    return (
      <div>
        <Header />
        <div className="profile-container">
          <form className="profile-box">
            <div className="label-text-container">
              <label className="label-element m-2">Name : </label>
              <input
                className="input-profile"
                value={name}
                rows="1"
                cols="30"
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="label-text-container">
              <label className="label-element">EmailId : </label>
              <input
                className="input-profile"
                value={email}
                rows="1"
                cols="30"
                onChange={(e) => {
                  this.setState({ email: e.target.value });
                }}
              />
            </div>
            <div className="label-text-container m-1">
              <label className="label-element">Mobile : </label>
              <input
                className="input-profile"
                value={mobile}
                rows="1"
                cols="30"
                onChange={(e) => {
                  this.setState({ mobile: e.target.value });
                }}
              />
            </div>
            {/* <div className="label-text-container">
              <label className="label-element">Address :</label>
              <input
                className="input-profile"
                value={address}
                rows="2"
                cols="30"
                onChange={(e) => {
                  this.setState({ address: e.target.value });
                }}
              />
            </div> */}
            {/* <button type="submit" className="update-button">
              Update
            </button> */}
          </form>
        </div>
      </div>
    );
  }
}

export default Profile;
