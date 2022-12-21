import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authMsg, setAuthMsg] = useState("");

  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const account = {
      username: username,
      password: password,
    };
    axios
      .post(`${props.api_url}/login`, account, { withCredentials: true })
      .then((resp) => {
        if (resp.status === 200) {
          props.setLogin(true);
          navigate("/dashboard");
        }
      })
      .catch((e) => setAuthMsg("Invalid username/password. Please try again"));
  };

  const usernameHandler = (e) => {
    const value = e.target.value;
    setUsername(value);
  };

  const passwordHandler = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  return (
    <form onSubmit={submitHandler} method="post">
      <div>
        <label>
          Username:
          <input
            type="text"
            onChange={usernameHandler}
            className="form-control"
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            onChange={passwordHandler}
            className="form-control"
          />
        </label>
      </div>
      <div className="text-danger mt-2">{authMsg}</div>
      <div>
        <input className="btn btn-outline-primary mt-2" type="submit" />
      </div>
    </form>
  );
};

export default Login;
