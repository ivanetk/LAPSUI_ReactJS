import { useState, useEffect } from "react";
import axios from "axios";
import AddCompLeave from "./AddCompLeave";

const CompensationLeaveList = (props) => {
  const [compLeave, updateCompLeave] = useState({});
  const [contentBody, setContentBody] = useState("Home");
  const [compLeaveForm, setCompLeaveForm] = useState({});

  useEffect(() => {
    retrieveCompLeave();
  }, []);

  const retrieveCompLeave = () => {
    axios
      .get(`${props.api_url}/leave/comp`, { withCredentials: true })
      .then((resp) => {
        updateCompLeave(resp.data);
        setCompLeaveForm(resp.data);
        console.log(resp.data);
      });
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCompLeaveForm((details) => ({ ...details, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.put(`${props.api_url}/leave/comp`, compLeaveForm).then((resp) => {
      if (resp.status === 200) {
        setContentBody("Home");
        retrieveCompLeave();
      }
    });
  };

  const displayCompLeave = (compLeave) => {
    if (compLeave) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Compensation Leave Entitlement</th>
              <th>Granularity</th>
              <th>Overtime Ratio &#40;number of hours : 0.5 leave days&#41;</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{compLeave.leaveDays}</td>
              <td>{compLeave.granularity}</td>
              <td>{compLeave.overtimeRatio}</td>
              <td>
                <button
                  onClick={(e) => setContentBody("Edit")}
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <AddCompLeave
          setContentBody={setContentBody}
          api_url={props.api_url}
          retrieveCompLeave={retrieveCompLeave}
        />
      );
    }
  };

  const displayContentBody = (contentBody, compLeave, compLeaveForm) => {
    if (contentBody === "Edit") {
      return (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="leaveDays">
              Compensation Leave Entitlement:
              <input
                type="number"
                id="leaveDays"
                name="leaveDays"
                value={compLeaveForm.leaveDays ?? "0"}
                onChange={inputHandler}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="granularity">
              Granularity:
              <input
                type="number"
                id="granularity"
                name="granularity"
                value={compLeaveForm.granularity || ""}
                onChange={inputHandler}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="overtimeRatio">
              Overtime Ratio &#40;number of hours : 0.5 leave days&#41;:
              <input
                type="number"
                id="overtimeRatio"
                name="overtimeRatio"
                value={compLeaveForm.overtimeRatio || ""}
                onChange={inputHandler}
                required
              />
            </label>
          </div>
          <input type="submit" />
        </form>
      );
    } else {
      return displayCompLeave(compLeave);
    }
  };

  return <div>{displayContentBody(contentBody, compLeave, compLeaveForm)}</div>;
};

export default CompensationLeaveList;
