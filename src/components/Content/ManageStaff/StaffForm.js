import { useState } from "react";
import axios from "axios";

const StaffForm = (props) => {
  const [staff, setStaff] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`${props.api_url}/staff`, staff);
    props.updateContentBody("Home");
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setStaff((details) => ({ ...details, [name]: value }));
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="firstname">
        First Name:
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={staff.firstname || ""}
          onChange={inputHandler}
          required
        />
      </label>
      <label htmlFor="lastname">
        Last Name:
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={staff.lastname || ""}
          onChange={inputHandler}
          required
        />
      </label>
      <label htmlFor="roleId">
        Role ID:
        <input
          type="number"
          id="roleId"
          name="roleId"
          value={staff.roleId || ""}
          onChange={inputHandler}
          required
        />
      </label>
      <label htmlFor="title">
        Job Title:
        <input
          type="text"
          id="title"
          name="title"
          value={staff.title || ""}
          onChange={inputHandler}
          required
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default StaffForm;
