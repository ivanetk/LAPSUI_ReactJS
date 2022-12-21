import { useState, useEffect } from "react";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";

const EditStaffForm = (props) => {
  const [staffDetails, updateStaffDetails] = useState({});
  const [managerList, setManagerList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    retrieveStaffDetails(props.staffId);
    retrieveManagers();
  }, []);

  const retrieveStaffDetails = (id) => {
    axios
      .get(`${props.api_url}/staff/${id}`, { withCredentials: true })
      .then((resp) => {
        updateStaffDetails(resp.data);
      })
      .catch((e) => console.log(e));
  };

  const retrieveManagers = () => {
    axios
      .get(`${props.api_url}/managers`, { withCredentials: true })
      .then((resp) => {
        setManagerList(resp.data);
        console.log(resp.data);
      })
      .catch((e) => console.log(e));
  };

  const capitalizeName = (name) => {
    if (name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    }
  };

  const managersDropDown = managerList.map((manager, index) => (
    <option key={index} value={manager.stfId}>
      {manager.stfId} {capitalizeName(manager.firstname)}{" "}
      {capitalizeName(manager.lastname)}
    </option>
  ));

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .put(`${props.api_url}/staff`, staffDetails, { withCredentials: true })
      .then((resp) => {
        if (resp.status === 200) {
          props.updateContentBody("View");
        }
      })
      .catch((e) => {
        console.log(e.response.data);
        setErrorMsg(e.response.data.message);
      });
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    updateStaffDetails((details) => ({ ...details, [name]: value }));
  };

  const roleHandler = (e) => {
    const name = e.target.name;
    const value = [];
    value.push({
      id: e.target.value,
    });
    updateStaffDetails((details) => ({ ...details, [name]: value }));
  };

  const parseRoleId = (roleObj) => {
    if (roleObj && roleObj.length > 0) {
      const roleId = roleObj[0].id;
      return roleId;
    }
  };

  return (
    <div>
      <h5>Edit Staff</h5>
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="row col">
            <label htmlFor="firstname">
              First Name:
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={staffDetails.firstname || ""}
                onChange={inputHandler}
                className="form-control"
                required
              />
            </label>
          </div>
          <div className="row col">
            <label htmlFor="lastname">
              Last Name:
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={staffDetails.lastname || ""}
                onChange={inputHandler}
                className="form-control"
                required
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="row col">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                name="username"
                value={staffDetails.username || ""}
                onChange={inputHandler}
                className="form-control"
              />
            </label>
          </div>
          <div className="row col">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                value={staffDetails.email || ""}
                onChange={inputHandler}
                className="form-control"
              />
            </label>
          </div>
        </div>
        <div className="row">
          <div className="row col">
            <label htmlFor="roles">
              Role:
              <select
                id="roles"
                name="roles"
                value={parseRoleId(staffDetails.roles) ?? "0"}
                onChange={roleHandler}
                className="form-select"
                required
              >
                <option value="0" disabled hidden>
                  Select a Role
                </option>
                <option value="1">Manager</option>
                <option value="2">Employee</option>
              </select>
            </label>
          </div>
          <div className="row col">
            <label htmlFor="title">
              Job Title:
              <input
                type="text"
                id="title"
                name="title"
                value={staffDetails.title || ""}
                onChange={inputHandler}
                className="form-control"
                required
              />
            </label>
          </div>
        </div>
        <div className="row col-6">
          <label htmlFor="managerId">
            Manager:
            <select
              id="managerId"
              name="managerId"
              value={staffDetails.managerId || ""}
              onChange={inputHandler}
              className="form-select"
            >
              <option key="0" value="">
                No manager
              </option>
              {managersDropDown}
            </select>
          </label>
        </div>
        <div className="row">
          <div className="row col">
            <label htmlFor="anuLeave">
              Annual Leave Entitlement:
              <input
                type="number"
                id="anuLeave"
                name="anuLeave"
                value={staffDetails.anuLeave ?? ""}
                onChange={inputHandler}
                required
                className="form-control"
              />
            </label>
          </div>
          <div className="row col">
            <label htmlFor="mediLeave">
              Medical Leave Entitlement:
              <input
                type="number"
                id="mediLeave"
                name="mediLeave"
                value={staffDetails.mediLeave ?? ""}
                onChange={inputHandler}
                required
                className="form-control"
              />
            </label>
          </div>
          <div className="row col">
            <label htmlFor="compLeave">
              Compensation Leave Entitlement:
              <input
                type="number"
                id="compLeave"
                name="compLeave"
                value={staffDetails.compLeave ?? ""}
                onChange={inputHandler}
                required
                className="form-control"
              />
            </label>
          </div>
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
              className="form-select"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </label>
        </div>
        <ErrorMessage errorMsg={errorMsg} />
        <input className="btn btn-outline-dark mt-2" type="submit" />
      </form>
    </div>
  );
};

export default EditStaffForm;
