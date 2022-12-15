import ManageLeaveTypes from "./ManageLeaveTypes";
import ManageStaff from "./ManageStaff";

const Content = (props) => {
  const displayContent = (content) => {
    if (content === "Manage Staff") {
      return <ManageStaff />;
    } else if (content === "Manage Leave Types") {
      return <ManageLeaveTypes />;
    } else {
      return "Welcome!";
    }
  };

  return (
    <div>
      {displayContent(props.menuItem)}
    </div>
  );
};

export default Content;
