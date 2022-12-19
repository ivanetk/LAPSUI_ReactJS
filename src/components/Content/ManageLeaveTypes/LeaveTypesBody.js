import CompensationLeaveList from "./CompensationLeaveList";
import MedicalLeaveList from "./MedicalLeaveList";
import ManageAnnualLeave from "./ManageAnnualLeave/ManageAnnualLeave";

const LeaveTypesBody = (props) => {
  const displayLeaveList = (leaveType) => {
    switch (leaveType) {
      case "Annual Leave":
        return <ManageAnnualLeave api_url={props.api_url} />;
      case "Medical Leave":
        return <MedicalLeaveList api_url={props.api_url} />;
      case "Compensation Leave":
        return <CompensationLeaveList api_url={props.api_url} />;
      default:
        return "Select Leave Type to display";
    }
  };
  return <div>{displayLeaveList(props.currentLeaveType)}</div>;
};

export default LeaveTypesBody;
