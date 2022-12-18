import AnnualLeaveList from "./AnnualLeaveList";
import CompensationLeaveList from "./CompensationLeaveList";
import MedicalLeaveList from "./MedicalLeaveList";

const LeaveTypesBody = (props) => {

    const displayLeaveList = (leaveType) => {
        switch(leaveType) {
            case "Annual Leave":
                return <AnnualLeaveList />;
            case "Medical Leave":
                return <MedicalLeaveList />;
            case "Compensation Leave":
                return <CompensationLeaveList />;
            default:
                return "Select Leave Type to display";
        }
    }
    return (
        <div>{displayLeaveList(props.currentLeaveType)}</div>
    )
}

export default LeaveTypesBody