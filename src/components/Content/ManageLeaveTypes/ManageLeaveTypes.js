import { useState } from "react";
import LeaveTypesBody from "./LeaveTypesBody";

const ManageLeaveTypes = (props) => {
  const leaveTypes = ["Annual Leave", "Medical Leave", "Compensation Leave"];
  const [currentLeaveType, updateLeaveType] = useState("");

  const displayLeaveTypes = leaveTypes.map((type) => (
    <button
      key={type}
      onClick={(e) => updateLeaveType(e.target.innerHTML)}
      className="btn btn-secondary btn-sm me-2"
    >
      {type}
    </button>
  ));

  return (
    <div>
      <b>Manage Leave Types</b>
      <div>{displayLeaveTypes}</div>
      <div>
        <LeaveTypesBody
          currentLeaveType={currentLeaveType}
          api_url={props.api_url}
        />
      </div>
    </div>
  );
};

export default ManageLeaveTypes;
