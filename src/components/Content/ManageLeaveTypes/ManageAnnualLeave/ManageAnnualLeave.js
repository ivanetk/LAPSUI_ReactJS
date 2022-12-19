import AnnualLeaveList from "./AnnualLeaveList";
import { useState } from "react";
import AddAnLeaveForm from "./AddAnLeaveForm";
import EditAnLeaveForm from "./EditAnLeaveForm";

const ManageAnnualLeave = (props) => {
  const [contentBody, updateContentBody] = useState("Home");
  const [leaveDetails, setLeaveDetails] = useState({});

  const displayContentBody = (content) => {
    if (content === "Home") {
      return (
        <AnnualLeaveList
          api_url={props.api_url}
          updateContentBody={updateContentBody}
          setLeaveDetails={setLeaveDetails}
        />
      );
    }
    if (content === "Add") {
      return (
        <AddAnLeaveForm
          api_url={props.api_url}
          updateContentBody={updateContentBody}
        />
      );
    }
    if (content === "View") {
      return <div>View Annual Leave Scheme Details</div>;
    }
    if (content === "Edit") {
      return (
        <EditAnLeaveForm
          api_url={props.api_url}
          updateContentBody={updateContentBody}
          leaveDetails={leaveDetails}
        />
      );
    }
    if (content === "Error") {
      return <div>Error, please try again</div>;
    }
  };

  return (
    <div>
      <b>Manage Annual Leave Scheme</b>
      <div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => updateContentBody(e.target.innerHTML)}
        >
          Home
        </button>
        <button
          className="btn btn-secondary btn-sm mx-2"
          onClick={(e) => updateContentBody(e.target.innerHTML)}
        >
          Add
        </button>
      </div>
      {displayContentBody(contentBody)}
    </div>
  );
};

export default ManageAnnualLeave;
