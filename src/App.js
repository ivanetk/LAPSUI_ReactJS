import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  const [menuItem, setMenuItem] = useState("");
  const [isLogin, setLogin] = useState(false);

  const api_url = `http://localhost:8080/api`;

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
      <header className="mt-4">
        <div className="fs-4">Admin UI</div>
      </header>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Login api_url={api_url} setLogin={setLogin} />}
          ></Route>
          <Route
            path="/dashboard"
            element={
              isLogin ? (
                <div className="row ">
                  <div className="col navbar pt-5">
                    <Sidebar
                      sidebarHandler={sidebarHandler}
                      items={sidebarItems}
                      setLogin={setLogin}
                    />
                  </div>
                  <div className="col-10">
                    <Content menuItem={menuItem} api_url={api_url} />
                  </div>
                </div>
              ) : (
                <Navigate replace to={"/"} />
              )
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
