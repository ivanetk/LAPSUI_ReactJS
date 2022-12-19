import axios from "axios";
import { useState } from "react";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const account = {
        username: username,
        password: password
    }
    axios
      .post(`${props.api_url}/login`, account)
      .then((resp) => {
        if (resp.status === 201) {
          props.updateContentBody("Home");
        } else {
          props.updateContentBody("Error");
        }
      });
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
    <form onSubmit={submitHandler}>
      <label>
        <p>Username</p>
        <input type="text" onChange={usernameHandler} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={passwordHandler} />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Login;
