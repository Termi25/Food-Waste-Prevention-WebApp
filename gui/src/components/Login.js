
import { useNavigate } from 'react-router-dom'
import {  useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import "./Login.css"
import UserForm from './UserForm'
import addNotification from 'react-push-notification'

const SERVER = 'http://localhost:8080'

function Login (props) {

  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  const authId=useSelector((state)=>state.authId)

  const navigate = useNavigate();
  const dispatch=useDispatch();

  function LoginForm(){

    const verifyUser = async user => {
      const response=await fetch(`${SERVER}/auth`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      if(response.status===201){
        response.json().then((user)=>dispatch({type:'update',user_id:user.id_user}))
        addNotification({
          title: "Notify",
          subtitle: "Log in successful",
          theme: "dark",
          closeButton: "X",
          backgroundTop: "green", 
        })
        navigate('/account');
      }else{
        addNotification({
          title: "Notify",
          subtitle: "Registration failed",
          message: `Account log in failed. Please try again or register!`,
          theme: "dark",
          closeButton: "X",
          backgroundTop: "red", 
        })
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