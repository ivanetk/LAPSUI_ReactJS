import { useEffect, useState } from "react";
import axios from "axios";

const StaffDetails = (props) => {
  const [staffDetails, updateStaffDetails] = useState(null);

  useEffect(() => {
    retrieveStaffDetails(props.staffId);
  }, [props.staffId]);

  const retrieveStaffDetails = (id) => {
    axios
      .get(`${props.api_url}/staff/${id}`)
      .then((resp) => {
        updateStaffDetails(resp.data);
      })
      .catch((e) => console.log(e));
  };

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const displayStatus = (status) => {
    if (status) {
      return "Active";
    } else {
      return "Inactive";
    }
  };

  if (staffDetails) {
    return (
      <div>
        <div>Staff ID: {staffDetails.stfId}</div>
        <div>First Name: {capitalizeName(staffDetails.firstname)} </div>
        <div>Last Name: {capitalizeName(staffDetails.lastname)}</div>
        <div>Username: {staffDetails.username}</div>
        <div>Email: {staffDetails.email}</div>
        <div>Role ID: {staffDetails.roleId}</div>
        <div>Job Title: {staffDetails.title}</div>
        <div>Annual Leave Entitlement: {staffDetails.anuLeave}</div>
        <div>Medical Leave Entitlement: {staffDetails.mediLeave}</div>
        <div>Compensation Leave Entitlement: {staffDetails.compLeave}</div>
        <div>Status: {displayStatus(staffDetails.status)}</div>
        <button
          onClick={(e) => {
            props.viewAndEditClickHandler(staffDetails.stfId, e);
          }}
        >
          Edit
        </button>
      </div>
    );
  } else {
    <div>No staff found.</div>;
  }
};

export default StaffDetails;
