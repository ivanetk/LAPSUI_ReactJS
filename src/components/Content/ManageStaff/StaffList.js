import axios from "axios";
import { useEffect, useState } from "react";

const StaffList = (props) => {
  const [staffList, updateStaffList] = useState([]);

  useEffect(() => {
    retrieveStaffList();
  }, [staffList]);

  const retrieveStaffList = () => {
    axios
      .get(`${props.api_url}/staff`)
      .then((resp) => {
        updateStaffList(resp.data);
      })
      .catch((e) => console.log(e));
  };

  const deleteStaff = (staff) => {
    axios
      .delete(`${props.api_url}/staff`, { data: staff })
      .catch((e) => console.log(e));
    retrieveStaffList();
  };

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const displayStaffList = staffList.map((staff) => (
    <tr key={staff.stfId}>
      <td>{staff.stfId}</td>
      <td>
        {capitalizeName(staff.firstname)} {capitalizeName(staff.lastname)}
      </td>
      <td>
        <button
          onClick={(e) => {
            props.viewAndEditClickHandler(staff.stfId, e);
          }}
        >
          View
        </button>
        <button
          onClick={(e) => {
            props.viewAndEditClickHandler(staff.stfId, e);
          }}
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            deleteStaff(staff);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Staff ID</th>
          <th>Name</th>
          <th>Function</th>
        </tr>
      </thead>
      <tbody>{displayStaffList}</tbody>
    </table>
  );
};

export default StaffList;
