import axios from "axios";
import { useState } from "react";

const AddCompLeave = (props) => {
  const [compLeave, setCompLeave] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${props.api_url}/leave/comp`, compLeave, { withCredentials: true })
      .then((resp) => {
        if (resp.status === 201) {
          props.setContentBody("Home");
          props.retrieveCompLeave();
        }
      });
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCompLeave((details) => ({ ...details, [name]: value }));
  };

  return (
    <>
      <div>Compensation Leave Scheme not found, please add one</div>
      <form onSubmit={submitHandler} className="d-grid gap-3">
        <div className="row">
          <div className="row col">
            <label htmlFor="leaveDays">
              Leave Days:
              <input
                type="number"
                id="leaveDays"
                name="leaveDays"
                value={compLeave.leaveDays ?? ""}
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
              value={compLeave.granularity ?? ""}
              onChange={inputHandler}
              required
              className="form-control"
            />
          </label>
        </div>
        <div className="row">
          <label htmlFor="overtimeRatio">
            Overtime Ratio &#40;number of hours : 0.5 leave days&#41;:
            <input
              type="number"
              id="overtimeRatio"
              name="overtimeRatio"
              value={compLeave.overtimeRatio ?? ""}
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

export default AddCompLeave;
