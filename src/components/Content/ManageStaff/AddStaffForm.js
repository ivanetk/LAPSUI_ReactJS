import { useState } from "react";
import axios from "axios";

const StaffForm = (props) => {
  const [staff, setStaff] = useState({});
  const [isLoading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${props.api_url}/staff`, staff).then(() => setLoading(false));
    if (!isLoading) {
      props.updateContentBody("Home");
    }
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStaff((details) => ({ ...details, [name]: value }));
  };

  return (
    <form onSubmit={submitHandler} className="d-grid gap-3">
      <div className="row">
        <div className="row col">
          <label htmlFor="firstname">
            First Name:
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={staff.firstname || ""}
              onChange={inputHandler}
              required
              className="form-control"
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
              value={staff.lastname || ""}
              onChange={inputHandler}
              required
              className="form-control"
            />
          </label>
        </div>
      </div>
      <div className="row">
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={staff.email || ""}
            onChange={inputHandler}
            required
            className="form-control"
          />
        </label>
      </div>
      <div className="row">
        <div className="row col">
          <label htmlFor="roleId">
            Role:
            <select
              id="roleId"
              name="roleId"
              value={staff.roleId || ""}
              onChange={inputHandler}
              required
              className="form-select"
            >
              <option value="1">Admin</option>
              <option value="2">Manager</option>
              <option value="3">Employee</option>
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
              value={staff.title || ""}
              onChange={inputHandler}
              required
              className="form-control"
            />
          </label>
        </div>
      </div>
      <div>
        <input type="submit" className="btn btn-outline-dark" />
      </div>
    </form>
  );
};

export default StaffForm;
