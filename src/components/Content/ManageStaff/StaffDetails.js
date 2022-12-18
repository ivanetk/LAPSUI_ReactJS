import { useEffect, useState } from "react";
import axios from "axios";

const StaffDetails = (props) => {
  const [staffDetails, updateStaffDetails] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    retrieveStaffDetails(props.staffId);
  }, [props.staffId]);

  const retrieveStaffDetails = (id) => {
    setLoading(true);
    axios
      .get(`${props.api_url}/staff/${id}`)
      .then((resp) => {
        updateStaffDetails(resp.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const displayRole = (roleid) => {
    switch(roleid) {
      case 1:
        return "Admin";
      case 2:
        return "Manager";
      case 3:
        return "Employee";
      default:
        return "No role assigned";
    }
  }

  const displayStatus = (status) => {
    if (status) {
      return "Active";
    } else {
      return "Inactive";
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (staffDetails) {
    return (
      <div>
        <div>Staff ID: {staffDetails.stfId}</div>
        <div>First Name: {capitalizeName(staffDetails.firstname)} </div>
        <div>Last Name: {capitalizeName(staffDetails.lastname)}</div>
        <div>Username: {staffDetails.username}</div>
        <div>Email: {staffDetails.email}</div>
        <div>Role: {displayRole(staffDetails.roleId)}</div>
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
