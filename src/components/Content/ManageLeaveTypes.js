const ManageLeaveTypes = () => {
  const leaveTypes = ["Annual Leave", "Medical Leave", "Compensation Leave"];

  const displayLeaveTypes = leaveTypes.map((type) => (
    <div key={type}>{type}</div>
  ));

  return <div>{displayLeaveTypes}</div>;
};

export default ManageLeaveTypes;
