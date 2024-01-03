import "./App.css";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Account from "./components/Account.js";
// import MainHeader from "./components/MainHeader.js";
// import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;