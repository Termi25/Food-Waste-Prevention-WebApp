
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import "./Login.css"
import User from './User'
import UserForm from './UserForm'
import './UserList.css'

const SERVER = 'http://localhost:8080'

function Login (props) {

  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [authId,setAuthId]=useState(0);
  const navigate = useNavigate();
  
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
      response.json().then((user)=>{setAuthId(user.id_user)})
      navigate('/account',{state:{authId,isLoggedIn}});
    }
  }

  return (
    <div className='user-login'>
      <UserForm onAdd={verifyUser}/>
    </div>
  )
}

export default Login;