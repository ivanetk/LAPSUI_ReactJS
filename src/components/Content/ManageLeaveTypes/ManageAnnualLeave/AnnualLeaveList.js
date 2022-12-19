import { useState, useEffect } from "react";
import axios from "axios";

const AnnualLeaveList = (props) => {
  const [annualLeaveList, updateLeaveList] = useState([]);

  useEffect(() => {
    retrieveLeaveList();
  }, []);

  const retrieveLeaveList = () => {
    axios.get(`${props.api_url}/leave/annual`).then((resp) => {
      updateLeaveList(resp.data);
      console.log(resp.data);
    });
  };

  const displayLeaveList = annualLeaveList.map((leave) => (
    <tr key={leave.id}>
      <td>{leave.jobTitle}</td>
      <td>{leave.leaveDays}</td>
      <td>{leave.granularity}</td>
      <td>
        <button
          onClick={(e) => {
            props.setLeaveDetails(leave);
            props.updateContentBody("Edit");
          }}
          className="btn btn-secondary btn-sm"
        >
          Edit
        </button>
      </td>
    </tr>
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Job Title</th>
          <th>Leave Entitlement</th>
          <th>Granularity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{displayLeaveList}</tbody>
    </table>
  );
};

export default AnnualLeaveList;
