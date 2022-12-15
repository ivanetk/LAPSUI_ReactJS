import { useState } from "react";
import StaffList from "./StaffList";
import StaffForm from "./StaffForm";

const ManageStaff = () => {
  const [contentBody, updateContentBody] = useState("Home");

  const displayContentBody = (content) => {
    if (content === "Home") {
      return <StaffList />;
    }
    if (content === "Add") {
      return <StaffForm updateContentBody={updateContentBody}/>;
    }
    if (content === "Search") {
      return <div>Search staff</div>;
    }
  };

  return (
    <div>
      <div>Manage Staff</div>
      <div>
        <button onClick={(e) => updateContentBody(e.target.innerHTML)}>
          Home
        </button>
        <button onClick={(e) => updateContentBody(e.target.innerHTML)}>
          Add
        </button>
        <button onClick={(e) => updateContentBody(e.target.innerHTML)}>
          Search
        </button>
      </div>
      {displayContentBody(contentBody)}
    </div>
  );
};

export default ManageStaff;
