import axios from "axios";
import { useEffect, useState } from "react";

const StaffList = () => {
  const [staffList, updateStaffList] = useState([]);
  useEffect(() => {
    retrieveStaffList();
  }, [staffList]);

  const retrieveStaffList = () => {
    axios
      .get("http://localhost:8080/api/staff")
      .then((resp) => {
        updateStaffList(resp.data);
      })
      .catch((e) => console.log(e));
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
      <td>View Edit Delete</td>
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
