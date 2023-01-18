import { Component } from "react";
import "./index.css";

const options = [
  {
    label: "Select Service Type",
    value: "value1",
  },
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Prime",
    value: "prime",
  },
];

class LaundryRequest extends Component {
  state = {
    id: "",
    requestDate: "",
    topwear: "",
    bottomwear: "",
    woolenCloth: "",
    service: "",
    contact: "",
    address: "",
    description: "",
  };

  onSubmitSuccess = (message) => {
    alert(message);
    const { history } = this.props;
    history.push("/");
  };

  submitForm = async (event) => {
    event.preventDefault();
    const {
      requestDate,
      topwear,
      bottomwear,
      woolenCloth,
      service,
      contact,
      address,
      description,
    } = this.state;

    const email = localStorage.getItem("userEmail");
    const status = "Requested!";

    const userDetails = {
      email,
      requestDate,
      topwear,
      bottomwear,
      woolenCloth,
      service,
      contact,
      address,
      status,
      description,
    };
    const url = "http://localhost:4000/LaundryRequest";
    console.log(url);
    // const token = Cookies.get("jwt_token");

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
    }
    console.log(data);
  };

  render() {
    const {
      id,
      requestDate,
      topwear,
      bottomwear,
      woolenCloth,
      contact,
      address,
      description,
    } = this.state;

    return (
      <div className="laundry-request-container">
        <form
          method="POST"
          className="form-container-request"
          onSubmit={this.submitForm}
          key={id}
        >
          <div className="input-container-box">
            <input
              type="date"
              id="date"
              className="user-input-field"
              value={requestDate}
              placeholder="dd-mm-yyyy"
              onChange={(e) => {
                this.setState({ requestDate: e.target.value });
              }}
            />
            <input
              type="number"
              min={0}
              max={100}
              id="topwear"
              className="user-input-field"
              value={topwear}
              placeholder="Topwear(Tshirts /Top shirts)"
              onChange={(e) => {
                this.setState({ topwear: e.target.value });
              }}
            />
          </div>
          <input
            type="number"
            min={0}
            max={100}
            id="bottomwear"
            className="user-input-field user-input"
            value={bottomwear}
            placeholder="Bottomwear(Lower /jeans/leggins)"
            onChange={(e) => {
              this.setState({ bottomwear: e.target.value });
            }}
          />
          <input
            type="number"
            min={0}
            max={100}
            id="woolenCloth"
            className="user-input-field user-input"
            value={parseInt(woolenCloth)}
            placeholder="Woolen cloth"
            onChange={(e) => {
              this.setState({ woolenCloth: e.target.value });
            }}
          />
          <select
            className="user-input-field user-input select-input"
            onChange={(e) => {
              this.setState({ service: e.target.value });
            }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            id="contact"
            className="user-input-field user-input"
            value={contact}
            placeholder="Contact Number"
            onChange={(e) => {
              this.setState({ contact: e.target.value });
            }}
          />
          <input
            type="text"
            id="contact"
            className="user-input-field user-input"
            value={address}
            placeholder="pick-up/delivery-address"
            onChange={(e) => {
              this.setState({ address: e.target.value });
            }}
          />
          <input
            type="text"
            id="mobile"
            className="user-input-field user-input"
            value={description}
            placeholder="Description(If any)"
            onChange={(e) => {
              this.setState({ description: e.target.value });
            }}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default LaundryRequest;
