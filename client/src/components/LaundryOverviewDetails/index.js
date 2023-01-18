import "./index.css";

const laundryOverviewList = [
  { id: 1, displayText: "0 Request", colorText: "color-1" },
  { id: 2, displayText: "0 Accept", colorText: "color-2" },
  { id: 3, displayText: "0 Progress!", colorText: "color-3" },
  { id: 4, displayText: "1 Finish!", colorText: "color-4" },
];

const LaundryOverviewDetails = () => {
  return laundryOverviewList.map((each) => (
    <li className="laundryOverview-item-container" key={each.id}>
      <button type="button" className={`laundryOverview-btn ${each.colorText}`}>
        {each.displayText}
        <hr className="hr-line"/>
        <p className="view-details">view details</p>
      </button>
    </li>
  ));
};

export default LaundryOverviewDetails;
