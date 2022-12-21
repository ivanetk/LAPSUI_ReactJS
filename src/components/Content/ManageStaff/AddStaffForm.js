import { useState } from "react";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";

const AddStaffForm = (props) => {
  const [staff, setStaff] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .post(`${props.api_url}/staff`, staff, { withCredentials: true })
      .then((resp) => {
        if (resp.status === 201) {
          props.updateContentBody("Home");
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
    setStaff((details) => ({ ...details, [name]: value }));
  };

  const roleHandler = (e) => {
    const name = e.target.name;
    const value = [];
    value.push({
      id: e.target.value,
    });
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
          <label htmlFor="roles">
            Role:
            <select
              id="roles"
              name="roles"
              defaultValue="0"
              onChange={roleHandler}
              required
              className="form-select"
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
              value={staff.title || ""}
              onChange={inputHandler}
              required
              className="form-control"
            />
          </label>
        </div>
      </div>
      <ErrorMessage errorMsg={errorMsg} />
      <div>
        <input type="submit" className="btn btn-outline-dark" />
      </div>
    </form>
  );
};

export default AddStaffForm;
