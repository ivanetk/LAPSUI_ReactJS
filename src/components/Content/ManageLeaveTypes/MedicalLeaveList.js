import { useState, useEffect } from "react";
import axios from "axios";

const MedicalLeaveList = (props) => {
  const [medLeave, updateMedLeave] = useState({});
  const [contentBody, setContentBody] = useState("");
  const [medLeaveForm, setMedLeaveForm] = useState({});

  useEffect(() => {
    retrieveMedLeave();
  }, []);

  const retrieveMedLeave = () => {
    axios.get(`${props.api_url}/leave/medical`, { withCredentials: true }).then((resp) => {
      updateMedLeave(resp.data);
      setMedLeaveForm(resp.data);
      console.log(resp.data);
    });
  };

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMedLeaveForm((details) => ({ ...details, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios.put(`${props.api_url}/leave/medical`, medLeaveForm).then((resp) => {
      if (resp.status === 200) {
        setContentBody("");
        retrieveMedLeave();
      }
    });
  };

  const displayMedLeave = (medLeave) => {
    if (medLeave) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Medical Leave Entitlement</th>
              <th>Granularity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{medLeave.leaveDays}</td>
              <td>{medLeave.granularity}</td>
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
        <tr>
          <td>Medical Leave Scheme not found. Please add one.</td>
        </tr>
      );
    }
  };

  const displayContentBody = (contentBody, medLeave, medLeaveForm) => {
    if (contentBody === "Edit") {
      return (
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="leaveDays">
              Medical Leave Entitlement:
              <input
                type="text"
                id="leaveDays"
                name="leaveDays"
                value={medLeaveForm.leaveDays || ""}
                onChange={inputHandler}
                required
              />
            </label>
          </div>
          <div>
            <label htmlFor="granularity">
              Granularity:
              <input
                type="text"
                id="granularity"
                name="granularity"
                value={medLeaveForm.granularity || ""}
                onChange={inputHandler}
                required
              />
            </label>
          </div>
          <input type="submit" />
        </form>
      );
    } else {
      return displayMedLeave(medLeave);
    }
  };

  return <div>{displayContentBody(contentBody, medLeave, medLeaveForm)}</div>;
};

export default MedicalLeaveList;
