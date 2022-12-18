import ManageHolidays from "./ManageHolidays";
import ManageLeaveTypes from "./ManageLeaveTypes/ManageLeaveTypes";
import ManageStaff from "./ManageStaff/ManageStaff";

const Content = (props) => {
  const displayContent = (content) => {
    if (content === "Manage Staff") {
      return <ManageStaff api_url={props.api_url}/>;
    } else if (content === "Manage Leave Types") {
      return <ManageLeaveTypes api_url={props.api_url}/>;
    } else if (content === "Manage Holidays") {
      return <ManageHolidays api_url={props.api_url}/>
    } else {
      return "Welcome!";
    }
  };

  return <div>{displayContent(props.menuItem)}</div>;
};

export default Content;
