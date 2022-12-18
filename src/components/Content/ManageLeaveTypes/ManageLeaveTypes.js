import { useState } from "react";
import LeaveTypesBody from "./LeaveTypesBody";

const ManageLeaveTypes = () => {
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
      <div>{displayLeaveTypes}</div>
      <div>
        <LeaveTypesBody currentLeaveType={currentLeaveType} />
      </div>
    </div>
  );
};

export default ManageLeaveTypes;
