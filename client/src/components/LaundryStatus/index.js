import { Component } from "react";
import Cookies from "js-cookie";
import Status from "../Status";

import "./index.css";

class LaundryStatus extends Component {
  state = {
    laundryStatusList: [],
  };
  componentDidMount() {
    this.getLaundryRequest();
  }

  getLaundryRequest = async () => {
    const jwtToken = Cookies.get("jwt_token");

    const apiUrl = "http://localhost:3000/LaundryStatus";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    const response = await fetch(apiUrl, options);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = fetchedData.map((reqStatus) => ({
        id: reqStatus.request_id,
        name: reqStatus.name,
        email: reqStatus.email,
        date: reqStatus.request_date,
        topwear: reqStatus.topwear,
        bottomwear: reqStatus.bottomwear,
        woolenCloth: reqStatus.woolenCloth,
        service: reqStatus.service,
        contact: reqStatus.contact,
        DeliveryAddress: reqStatus.address,
        status: reqStatus.status,
        description: reqStatus.description,
      }));
      this.setState({
        laundryStatusList: updatedData,
      });
    }
  };

  render() {
    const { laundryStatusList } = this.state;
    return (
      <>
        <ul className="status-container">
          {laundryStatusList.map((each) => (
            <Status key={each.id} statusList={each} />
          ))}
        </ul>
      </>
    );
  }
}

export default LaundryStatus;
