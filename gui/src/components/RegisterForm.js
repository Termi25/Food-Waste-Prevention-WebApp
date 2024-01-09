import { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";

function RegisterForm(props) {
  const navigate=useNavigate();
  const { onAdd } = props;
  const [username, setUsername] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [typeOfEater, setTypeOfEater]=useState("Mixed");


  const registerUser = (evt) => {
    console.warn("Verify User called");
    console.log(typeOfEater)
    onAdd({
        username,
        emailAdress,
        password,
        typeOfEater
    });
  };

  const loginRedirect=()=>{
    navigate('/');
  } 

  return (
    <div className="userREG-form">
        <p id="p">Register for WasteNOT</p>
        <div className="username">
        <input
          id="boxName"
          type="text"
          placeholder="Username"
          onChange={(evt) => setUsername(evt.target.value)}
          required
        />
      </div>
      <div className="email">
        <input
          id="boxEmail"
          type="email"
          placeholder="Email"
          onChange={(evt) => setEmailAdress(evt.target.value)}
          required
        />
      </div>
      <div className="password">
        <input
          id="boxPass"
          type="text"
          placeholder="Password"
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
      </div>
      <div className="typeEater">
        <select id="boxType" name="type" size="1" required onChange={(evt) => setTypeOfEater(evt.target.value)}>
            <option value="mixed">Mixed</option>
            <option value="carnivorous">Carnivorous</option>
            <option value="vegetarian">Vegetarian</option>
        </select>
      </div>
      <div className="addREG">
        <input id="btnAddREG" type="button" value="Register" onClick={registerUser} />
      </div>
      <div className="add">
        <input id="btnBack" type="button" value="Go back" onClick={loginRedirect} />
      </div>
    </div>
  );
}

export default RegisterForm;