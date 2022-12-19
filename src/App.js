import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import { useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

function App() {
  const [menuItem, setMenuItem] = useState("");
  const [token, setToken] = useState("");

  const api_url = `http://localhost:8080/api`;

  const sidebarItems = [
    "Manage Staff",
    "Manage Leave Types",
    "Manage Holidays",
  ];

  const sidebarHandler = (menuItem) => {
    setMenuItem(menuItem);
  };

  const login = () => {
    axios
      .get(`http://localhost:8080/api/login`, { withCredentials: true })
      .then((resp) => {
        console.log(resp);
      });
  };

  const login2 = () => {
    axios
      .post(`http://localhost:8080/api/login`, {}, { withCredentials: true })
      .then((resp) => {
        console.log(resp);
      });
  };

  login2();

  return (
    <div className="container">
      <header>
        <div className="fs-4">Admin UI</div>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login api_url={api_url} />}></Route>
          <Route
            path="/dashboard"
            element={
              <div className="row">
                <div className="col navbar">
                  <Sidebar
                    sidebarHandler={sidebarHandler}
                    items={sidebarItems}
                  />
                </div>
                <div className="col-10">
                  <Content menuItem={menuItem} api_url={api_url} />
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
