import { useState } from "react";
import StaffList from "./StaffList";
import AddStaffForm from "./AddStaffForm";
import StaffDetails from "./StaffDetails";
import EditStaffForm from "./EditStaffForm";
import InactiveStaffList from "./InactiveStaffList";

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
          updateContentBody={updateContentBody}
          viewAndEditClickHandler={viewAndEditClickHandler}
        />
      );
    }
    if (content === "Add") {
      return (
        <AddStaffForm
          api_url={props.api_url}
          updateContentBody={updateContentBody}
        />
      );
    }
    if (content === "Inactive") {
      return (
        <InactiveStaffList
          api_url={props.api_url}
          updateContentBody={updateContentBody}
          viewAndEditClickHandler={viewAndEditClickHandler}
        />
      );
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
        <EditStaffForm
          api_url={props.api_url}
          staffId={staffId}
          updateContentBody={updateContentBody}
        />
      );
    }

    if (content === "Error") {
      return <div>Error, please try again</div>;
    }
  };

  return (
    <div>
      <div>
        <b>Manage Staff</b>
      </div>
      <div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => updateContentBody(e.target.innerHTML)}
        >
          Home
        </button>
        <button
          className="btn btn-secondary btn-sm mx-2"
          onClick={(e) => updateContentBody(e.target.innerHTML)}
        >
          Add
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={(e) => updateContentBody("Inactive")}
        >
          View Inactive Staff
        </button>
      </div>
      {displayContentBody(contentBody)}
    </div>
  );
};

export default ManageStaff;
