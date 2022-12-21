import axios from "axios";
import { useEffect, useState } from "react";

const ManageHolidays = (props) => {
  const [holidays, updateHolidays] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    retrieveHolidays(year);
  }, []);

  const retrieveHolidays = (year) => {
    axios
      .get(`${props.api_url}/getholidays/?year=${year}`)
      .then((resp) => updateHolidays(resp.data))
      .catch((e) => console.log(e));
  };

  const dateFormatter = (date) => {
    let year = date[0];
    let month = date[1];
    let day = date[2];
    let dateObj = new Date(year, month - 1, day);
    return dateObj.toDateString();
  };

  const displayHolidays = holidays.map((holiday) => (
    <tr key={holiday.id}>
      <td>{dateFormatter(holiday.date)}</td>
      <td>{holiday.name}</td>
    </tr>
  ));

  return (
    <div>
      <div>
        <b className="me-2">Manage Holidays</b>
      </div>
      <div className="input-group mb-3">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button
          onClick={(e) => {
            retrieveHolidays(year);
          }}
          className="btn btn-outline-dark"
        >
          Retrieve
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Public Holiday Name</th>
          </tr>
        </thead>
        <tbody>{displayHolidays}</tbody>
      </table>
    </div>
  );
};

export default ManageHolidays;
