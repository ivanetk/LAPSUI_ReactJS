import Item from "./Item";

const Sidebar = (props) => {
  const displaySidebarItems = props.items.map((item) => (
    <Item key={item} name={item} sidebarHandler={props.sidebarHandler} />
  ));

  return (
    <div className="nav nav-pills flex-column mb-auto d-grid gap-2">
      {displaySidebarItems}
    </div>
  );
};

export default Sidebar;
