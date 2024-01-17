import { BrowserRouter, Route,Routes } from "react-router-dom"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Account from "./components/Account.js"
import GiveAwayCenter from "./components/GiveAwayCenter.js"
import AccountExternal from "./components/AccountExternal.js"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/giveawaycenter" element={<GiveAwayCenter/>}/>
        <Route path="/users/account" element={<AccountExternal/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;