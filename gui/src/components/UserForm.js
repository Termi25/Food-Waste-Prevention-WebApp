import { useState } from "react";
import "./UserForm.css";

function UserForm(props) {
  const { onAdd } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyUser = (evt) => {
    console.warn("called");

    // pass data from child component to parent component (UserList) by calling
    // the method sent by the parent component through props, but with data
    // the UserList will use the data sent from here {username,fullName,type} for posting it to the server
    onAdd({
      email,
      password
    });
  };

  return (
    <div className="user-form">
      <div className="Email">
        <input
          type="email"
          placeholder="Email"
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />
      </div>
      <div className="password">
        <input
          type="password"
          placeholder="password"
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
      </div>
      <div className="add">
        <input type="button" value="Submit" onClick={verifyUser} />
      </div>
    </div>
  );
}

export default UserForm;
