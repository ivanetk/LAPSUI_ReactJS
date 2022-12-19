import axios from "axios";
import { useEffect, useState } from "react";

const StaffList = (props) => {
  const [staffList, updateStaffList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    retrieveStaffList();
  }, []);

  const retrieveStaffList = () => {
    setLoading(true);
    axios
      .get(`${props.api_url}/staff`)
      .then((resp) => {
        if (resp.status === 200) {
          updateStaffList(resp.data);
          setLoading(false);
        }
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
      <td>
        <button
          onClick={(e) => {
            props.viewAndEditClickHandler(staff.stfId, e);
          }}
          className="btn btn-secondary btn-sm"
        >
          View
        </button>
        <button
          onClick={(e) => {
            props.viewAndEditClickHandler(staff.stfId, e);
          }}
          className="btn btn-secondary btn-sm ms-2"
        >
          Edit
        </button>
      </td>
    </tr>
  ));
  if (isLoading) {
    return <div>Loading...</div>;
  }
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
