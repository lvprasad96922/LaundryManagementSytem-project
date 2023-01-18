import { Component } from "react";
import Header from "../Header";
import PageNavigation from "../PageNavigation";
import Dashboard from "../Dashboard";
import LaundryRequest from "../LaundryRequest";
import LaundryStatus from "../LaundryStatus";
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'


import "./index.css";

const leftContainerLists = [
  { pageId: "DashboardId", pageNavigation: "Dashboard" },
  { pageId: "RequestId", pageNavigation: "Laundry Request" },
  { pageId: "StatusId", pageNavigation: "Laundry Status" },
];

class Home extends Component {
  state = {
    pageId: leftContainerLists[0].pageId,
  };

  onClickPageNavigation = (pageValue) => {
    console.log(pageValue);
    this.setState({ pageId: pageValue });
  };
  render() {
    const { pageId } = this.state;
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken === undefined) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Header />
        <div className="bottom-container">
          <div className="left-container">
            <ul className="pageNavigation-container">
              {leftContainerLists.map((each) => (
                <PageNavigation
                  key={each.pageId}
                  onClickPageNavigation={this.onClickPageNavigation}
                  pageDetails={each}
                  isActive={pageId === each.pageId}
                />
              ))}
            </ul>
          </div>
          <div className="right-container">
            <div className="dashboard">
              Dashboard <span className="span-overview"> / Overview</span>
            </div>
            {pageId === "DashboardId" && <Dashboard />}
            {pageId === "RequestId" && <LaundryRequest />}
            {pageId=== "StatusId" && <LaundryStatus />}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
