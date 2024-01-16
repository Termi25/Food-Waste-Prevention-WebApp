import { useState } from "react";
import "./UserForm.css";

function UserForm(props) {
  const { onAdd } = props;
  const [email, setEmail] = useState("regularUser1@gmail.com");
  const [password, setPassword] = useState("johndoe12");

  const verifyUser = (evt) => {
    console.warn("Verify User called");
    onAdd({
      email,
      password
    });
  };

  return (
    <div className="user-form">
      <div className="email">
        <input
          id="boxEmail"
          type="email"
          placeholder="Email"
          defaultValue={email}
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />
      </div>
      <div className="password">
        <input
          id="boxPass"
          type="password"
          placeholder="Password"
          defaultValue={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
      </div>
      <div className="add">
        <input id="btnAdd" type="button" value="Sign In" onClick={verifyUser} />
      </div>
    </div>
  );
}

export default UserForm;
