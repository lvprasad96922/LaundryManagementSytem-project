import "./index.css";
import LaundryOverviewDetails from "../LaundryOverviewDetails";

const Dashboard = () => {
  return (
    <>
      <ul className="LaundryOverview-container">
        <LaundryOverviewDetails />
      </ul>
      <div>
        <h1 className="laundry-price">Laundry Price (Per Unit)</h1>
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <td className="margin margin-b">Top Wear Laundry Price</td>
                <td className="margin-b">12</td>
              </tr>
              <tr>
                <td className="margin margin-b">Bottom Wear Laundry Price</td>
                <td className="margin-b">20</td>
              </tr>
              <tr>
                <td className="margin margin-b">Woolen Wear Laundry Price</td>
                <td className="margin-b">30</td>
              </tr>
              <tr>
                <td className="margin margin-b">Other Prices</td>
                <td className="margin-b">
                  Other price depend on cloth variety(other than above three
                  categories)
                </td>
              </tr>
              <tr>
                <td className="margin">Service Type</td>
                <td>
                  Normal(without Ironing) , Prime(with Ironing price more than
                  5Rs of above prices *except woolen cloth* only cotton)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="copyright-container">
          <p>Copyright @Laundry Management System 2023</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
