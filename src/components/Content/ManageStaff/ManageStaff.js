import { useState } from "react";
import StaffList from "./StaffList";
import StaffForm from "./StaffForm";
import StaffDetails from "./StaffDetails";
import EditStaff from "./EditStaff";

const ManageStaff = (props) => {
  const [contentBody, updateContentBody] = useState("Home");
  const [staffId, updateStaffId] = useState("");

  const viewAndEditClickHandler = (id, e) => {
    updateStaffId(id);
    updateContentBody(e.target.innerHTML);
  };

  const displayContentBody = (content) => {
    if (content === "Home") {
      return (
        <StaffList
          api_url={props.api_url}
          updateStaffId={updateStaffId}
          updateContentBody={updateContentBody}
          viewAndEditClickHandler={viewAndEditClickHandler}
        />
      );
    }
    if (content === "Add") {
      return (
        <StaffForm
          api_url={props.api_url}
          updateContentBody={updateContentBody}
        />
      );
    }
    if (content === "Search") {
      return <div>Search staff</div>;
    }
    if (content === "View") {
      return (
        <StaffDetails
          api_url={props.api_url}
          staffId={staffId}
          viewAndEditClickHandler={viewAndEditClickHandler}
        />
      );
    }
    if (content === "Edit") {
      return (
        <EditStaff
          api_url={props.api_url}
          staffId={staffId}
          updateContentBody={updateContentBody}
        />
      );
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
