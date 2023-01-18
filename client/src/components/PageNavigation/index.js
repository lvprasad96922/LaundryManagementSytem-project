import "./index.css";

const PageNavigation = (props) => {
  const { pageDetails, onClickPageNavigation, isActive } = props;
  const { pageId, pageNavigation } = pageDetails;
  const onClickPage = () => {
    onClickPageNavigation(pageId);
    console.log(isActive);
  };

  const activePageBtnClassName = isActive ? "active-page-btn" : "";

  return (
    <li className="page-item-container">
      <button
        type="button"
        className={`page-btn ${activePageBtnClassName}`}
        onClick={onClickPage}
      >
        {pageNavigation}
      </button>
    </li>
  );
};

export default PageNavigation;
