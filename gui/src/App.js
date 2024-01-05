import "./App.css";
import { BrowserRouter, Route,Router, Navigate,Routes, Switch } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Account from "./components/Account.js";

// import MainHeader from "./components/MainHeader.js";
// import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}/>
        <Route path="/account" element={<Account></Account>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;