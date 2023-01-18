import "./index.css";

const Status = (props) => {
  const { statusList } = props;
  const {
    id,
    name,
    email,
    date,
    topwear,
    bottomwear,
    woolenCloth,
    service,
    contact,
    DeliveryAddress,
    status,
    description,
  } = statusList;

  return (
    <li id={id}>
      <details className="details-container">
        <summary>click here to see your request details---{id}</summary>
        <div className="profile-container-2">
          <form className="profile-box-2">
            <div className="label-text-container-2">
              <label className="label-element-2 m-2-2">Name : </label>
              <input className="input-profile-2" value={name} type="text" />
            </div>
            <div className="label-text-container-2">
              <label className="label-element-2">EmailId : </label>
              <input className="input-profile-2" value={email} type="text" />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">Mobile : </label>
              <input className="input-profile-2" value={contact} />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">DeliveryAddress :</label>
              <input className="input-profile-2" value={DeliveryAddress} />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">Date :</label>
              <input type="text" className="input-profile-2" value={date} />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">Topwear :</label>
              <input type="text" className="input-profile-2" value={topwear} />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">Bottomwear :</label>
              <input className="input-profile-2" value={bottomwear} />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">WoolenCloth :</label>
              <input className="input-profile-2" value={woolenCloth} />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">Service :</label>
              <input className="input-profile-2" value={service} />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">Description :</label>
              <input className="input-profile-2" value={description} />
            </div>
            <div className="label-text-container-2 m-2-2">
              <label className="label-element-2">Status :</label>
              <input className="input-profile-2" value={status} type="text" />
            </div>

            <button type="submit" className="update-button-2">
              Update
            </button>
          </form>
        </div>
      </details>
    </li>
  );
};

export default Status;
