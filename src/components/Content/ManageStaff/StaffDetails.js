import { useEffect, useState } from "react";
import axios from "axios";
import Password from "./Password";

const StaffDetails = (props) => {
  const [staffDetails, updateStaffDetails] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    retrieveStaffDetails(props.staffId);
  }, []);

  const retrieveStaffDetails = (id) => {
    setLoading(true);
    axios
      .get(`${props.api_url}/staff/${id}`, { withCredentials: true })
      .then((resp) => {
        updateStaffDetails(resp.data);
        setLoading(false);
        console.log(resp);
      })
      .catch((e) => console.log(e));
  };

  const retrieveStaffPassword = (id) => {
    axios
      .get(`${props.api_url}/password/${id}`, { withCredentials: true })
      .then((resp) => {
        setPassword(resp.data);
      })
      .catch((e) => console.log(e));
  };
  

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const displayRole = (roleObj) => {
    console.log(roleObj);
    const roles = [];
    roleObj.forEach((role) => {
      roles.push(capitalizeName(role.name));
    });
    if (roles.length === 0) {
      return "No role assigned";
    }
    return roles.join(", ");
  };

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
      <div className="mt-4">
        <table className="table table-sm">
          <thead className="table-secondary">
            <tr>
              <th style={{ width: "30%" }}>Staff Details</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Staff ID:</td>
              <td> {staffDetails.stfId}</td>
            </tr>
            <tr>
              <td>First Name:</td>
              <td> {capitalizeName(staffDetails.firstname)} </td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td> {capitalizeName(staffDetails.lastname)}</td>
            </tr>
            <tr>
              <td>Username:</td>
              <td> {staffDetails.username}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td> {staffDetails.email}</td>
            </tr>
            <tr>
              <td>Role:</td>
              <td> {displayRole(staffDetails.roles)}</td>
            </tr>
            <tr>
              <td>Job Title:</td>
              <td> {staffDetails.title}</td>
            </tr>
            <tr>
              <td>Manager ID:</td>
              <td> {staffDetails.managerId ? staffDetails.managerId : "No manager"}</td>
            </tr>
            <tr>
              <td>Status:</td>
              <td> {displayStatus(staffDetails.status)}</td>
            </tr>
          </tbody>
          <thead className="table-secondary">
            <tr>
              <th>Leave Entitlements</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Annual Leave Entitlement:</td>
              <td>{staffDetails.anuLeave}</td>
            </tr>
            <tr>
              <td>Medical Leave Entitlement:</td>
              <td>{staffDetails.mediLeave}</td>
            </tr>
            <tr>
              <td>Compensation Leave Entitlement:</td>
              <td>{staffDetails.compLeave}</td>
            </tr>
          </tbody>
        </table>

        <button
          className="btn btn-secondary btn-sm me-4"
          onClick={(e) => {
            props.viewAndEditClickHandler(staffDetails.stfId, e);
          }}
        >
          Edit
        </button>
        <button
          className="btn btn-warning btn-sm"
          onClick={(e) => {
            retrieveStaffPassword(staffDetails.stfId);
          }}
        >
          Show Password
        </button>
        <Password password={password} />
      </div>
    );
  } else {
    <div>No staff found.</div>;
  }
};

export default StaffDetails;
