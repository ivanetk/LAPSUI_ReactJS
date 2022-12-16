import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import { useState } from "react";

function App() {
  const [menuItem, setMenuItem] = useState("");

  const api_url = `http://localhost:8080/api`

  const sidebarItems = [
    "Manage Staff",
    "Manage Leave Types",
    "Manage Holidays",
  ];

  const sidebarHandler = (menuItem) => {
    setMenuItem(menuItem);
  };
  return (
    <div className="container">
      <header>
        <div>Admin UI</div>
      </header>
      <div className="row">
        <div className="col navbar navbar-expand-lg navbar-light bg-light">
          <Sidebar sidebarHandler={sidebarHandler} items={sidebarItems} />
        </div>
        <div className="col-8">
          <Content menuItem={menuItem} api_url={api_url} />
        </div>
      </div>
    </div>
  );
}

export default App;
