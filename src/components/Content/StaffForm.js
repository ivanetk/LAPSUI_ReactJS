import axios from "axios";
import { useState } from "react";

const StaffForm = (props) => {
  const [staff, setStaff] = useState({
    firstname: "",
    lastname: "",
    roleid: "",
    title: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(staff);
    axios.post("http://localhost:8080/api/staff", staff);
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
          value={staff.firstname}
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
          value={staff.lastname}
          onChange={inputHandler}
          required
        />
      </label>
      <label htmlFor="roleid">
        Role ID:
        <input
          type="number"
          id="roleid"
          name="roleid"
          value={staff.roleid}
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
          value={staff.title}
          onChange={inputHandler}
          required
        />
      </label>
      <input type="submit" />
    </form>
  );
};

export default StaffForm;
