import { useLocation } from 'react-router-dom';
import "./Account.css"

const Account=()=>{
    const {state}=useLocation();
    console.log(state)
    // const authId=useContext(AuthContext);
    // console.log(authId);
    const authId=state.authId
    const isLoggedIn=state.isLoggedIn
    return (
        <div id="mainAccount">
            <div id="accountDetails">
                <input type="text" defaultValue={authId} ></input>
            </div>
        </div>
    );
}

export default Account;