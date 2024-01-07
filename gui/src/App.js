import "./App.css";
import { BrowserRouter, Route,Routes } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Account from "./components/Account.js";
import GiveAwayCenter from "./components/GiveAwayCenter.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/giveawaycenter" element={<GiveAwayCenter/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;