import Item from "./Item";

const Sidebar = (props) => {
  const displaySidebarItems = props.items.map((item) => (
    <div key={item}>
      <Item name={item} sidebarHandler={props.sidebarHandler} />
    </div>
  ));

  return <div>{displaySidebarItems}</div>;
};

export default Sidebar;
