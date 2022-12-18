const Item = (props) => {
  return (
      <button
        className="btn btn-outline-primary text-start"
        onClick={(e) => props.sidebarHandler(props.name)}
      >
        {props.name}
      </button>
  );
};

export default Item;
