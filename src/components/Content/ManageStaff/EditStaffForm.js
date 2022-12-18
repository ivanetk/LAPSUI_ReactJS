import { useState, useEffect } from "react";
import axios from "axios";

const EditStaff = (props) => {
  const [staffDetails, updateStaffDetails] = useState({});
  const [isLoading, setLoading] = useState(false);

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

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`${props.api_url}/staff`, staffDetails)
      .then(() => setLoading(false));
    if (!isLoading) {
      props.updateContentBody("View");
    }
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    updateStaffDetails((details) => ({ ...details, [name]: value }));
  };

  return (
    <div>
      <h5>Edit Staff</h5>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="firstname">
            First Name:
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={staffDetails.firstname || ""}
              readOnly
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastname">
            Last Name:
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={staffDetails.lastname || ""}
              readOnly
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              value={staffDetails.email || ""}
              onChange={inputHandler}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="roleId">
            Role:
            <select
              id="roleId"
              name="roleId"
              value={staffDetails.roleId}
              onChange={inputHandler}
              required
            >
              <option value="1">Admin</option>
              <option value="2">Manager</option>
              <option value="3">Employee</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="title">
            Job Title:
            <input
              type="text"
              id="title"
              name="title"
              value={staffDetails.title || ""}
              onChange={inputHandler}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="anuLeave">
            Annual Leave Entitlement:
            <input
              type="number"
              id="anuLeave"
              name="anuLeave"
              value={staffDetails.anuLeave ?? ""}
              onChange={inputHandler}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="mediLeave">
            Medical Leave Entitlement:
            <input
              type="number"
              id="mediLeave"
              name="mediLeave"
              value={staffDetails.mediLeave ?? ""}
              onChange={inputHandler}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="compLeave">
            Compensation Leave Entitlement:
            <input
              type="number"
              id="compLeave"
              name="compLeave"
              value={staffDetails.compLeave ?? ""}
              onChange={inputHandler}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="status">
            Status:
            <select
              id="staus"
              name="status"
              value={staffDetails.status}
              onChange={inputHandler}
              required
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </label>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
};

export default EditStaff;
