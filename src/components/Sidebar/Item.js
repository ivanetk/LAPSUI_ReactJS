const Item = (props) => {
  return (
    <div>
      <button onClick={(e) => props.sidebarHandler(props.name)}>
        {props.name}
      </button>
    </div>
  );
};

export default Item;
