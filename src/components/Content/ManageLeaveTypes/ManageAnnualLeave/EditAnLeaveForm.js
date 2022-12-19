import { useState } from "react";
import axios from "axios";

const EditAnLeaveForm = (props) => {
  const [anLeave, setAnLeave] = useState(props.leaveDetails);

  const submitHandler = (e) => {
    e.preventDefault();
    axios.put(`${props.api_url}/leave/annual`, anLeave).then((resp) => {
      if (resp.status === 200) {
        props.updateContentBody("Home");
      }
    });
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAnLeave((details) => ({ ...details, [name]: value }));
  };

  return (
    <form onSubmit={submitHandler} className="d-grid gap-3">
      <div className="row">
        <div className="row col">
          <label htmlFor="jobTitle">
            Job Title:
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={anLeave.jobTitle || ""}
              onChange={inputHandler}
              required
              className="form-control"
            />
          </label>
        </div>
        <div className="row col">
          <label htmlFor="leaveDays">
            Leave Days:
            <input
              type="number"
              id="leaveDays"
              name="leaveDays"
              value={anLeave.leaveDays ?? ""}
              onChange={inputHandler}
              required
              className="form-control"
            />
          </label>
        </div>
      </div>
      <div className="row">
        <label htmlFor="granularity">
          Granularity:
          <input
            type="number"
            id="granularity"
            name="granularity"
            value={anLeave.granularity ?? ""}
            onChange={inputHandler}
            required
            className="form-control"
          />
        </label>
      </div>
      <div>
        <input type="submit" className="btn btn-outline-dark" />
      </div>
    </form>
  );
};

export default EditAnLeaveForm;
