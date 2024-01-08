
import { useNavigate } from 'react-router-dom';
import {  useState } from 'react'
import "./Login.css"
import UserForm from './UserForm'

const SERVER = 'http://localhost:8080'

function Login (props) {

  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [authId,setAuthId]=useState(0);

  const navigate = useNavigate();

  function LoginForm(){

    const verifyUser = async user => {
      const response=await fetch(`${SERVER}/auth`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if(response.status!==401){
        setIsLoggedIn(true);
        response.json().then((user)=>setAuthId(user.id_user))
        if(isLoggedIn===true){
          navigate('/account',{state:{authId,isLoggedIn}});
        }
      }else{
        alert('There is no such account. Please register!')
      }
    }
  
    const registerRedirect=()=>{
      navigate('/register');
    }

    return(
      <div className='mainLogin'>
        <p>Food Waste Preventer</p>
        <UserForm onAdd={verifyUser}/>
        <input type="button" id="btnRegister" value="Register" onClick={registerRedirect}/>
      </div>
    );
  }

  return (
    <LoginForm/>
  )
}

export default Login;