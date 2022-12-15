import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import { useState } from "react";

function App() {
  const [menuItem, setMenuItem] = useState('');

  const sidebarItems = ["Manage Staff", "Manage Leave Types"]

  const sidebarHandler = (menuItem) => {
    setMenuItem(menuItem);
  }
  return (
    <div className="container">
      <header>
        <div>Admin UI test fetch</div>
      </header>
      <div className="row">
        <div className="col navbar navbar-expand-lg navbar-light bg-light">
          <Sidebar sidebarHandler={sidebarHandler} items={sidebarItems}/>
        </div>
        <div className="col-8">
          <Content menuItem={menuItem}/>
        </div>
      </div>
    </div>
  );
}

export default App;
