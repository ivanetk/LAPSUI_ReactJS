import axios from "axios";
import { useState } from "react";

const AddMedLeave = (props) => {
  const [medLeave, setMedLeave] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${props.api_url}/leave/medical`, medLeave, {
        withCredentials: true,
      })
      .then((resp) => {
        if (resp.status === 201) {
          props.setContentBody("Home");
          props.retrieveMedLeave();
        }
      });
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMedLeave((details) => ({ ...details, [name]: value }));
  };

  return (
    <>
      <div>Medical Leave Scheme not found, please add one</div>
      <form onSubmit={submitHandler} className="d-grid gap-3">
        <div className="row">
          <div className="row col">
            <label htmlFor="leaveDays">
              Leave Days:
              <input
                type="number"
                id="leaveDays"
                name="leaveDays"
                value={medLeave.leaveDays ?? ""}
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
              value={medLeave.granularity ?? ""}
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
    </>
  );
};

export default AddMedLeave;
