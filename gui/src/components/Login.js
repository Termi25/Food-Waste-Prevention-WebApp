// import {Link} from "react-router-dom";
import "./Login.css"
import { useEffect, useState } from 'react'
import User from './User'
import UserForm from './UserForm'
import './UserList.css'
import {Redirect} from 'react-router-dom';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

const SERVER = 'http://localhost:8080'

// const Login=()=>{
//     // const Response = async user => {
//     //     await fetch(`${SERVER}/users`, {
//     //       method: 'post',
//     //       headers: {
//     //         'Content-Type': 'application/json'
//     //       },
//     //       body: JSON.stringify(user)
//     //     })
//     //     getUsers()
//     //   }

//     // return (
//     //     <div id="mainLogin">
//     //         <form>
//     //             <label for="email">Email:</label><br/>
//     //             <input type="text" id="email" name="email" placeholder="Enter email" value="regularUser1@gmail.com" required/><br/>
//     //             <label for="lname">Password:</label><br></br>
//     //             <input type="password" id="lname" name="lname" placeholder="Enter password" value="johndoe12" required/><br/><br/>
//     //             <button id="btnSubmit" onClick="Verify()">Submit</button>
//     //         </form>
//     //         <script>
                
//     //         </script>
//     //     </div>
//     // );
    
// }

function Login (props) {

  const verifyUser = async user => {
    const response=await fetch(`${SERVER}/auth`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    if(response.status!==401){
      return (<Link to="/contact">Contact</Link>)
    }
  }

  // if useEffect is called with an empty dependencies array, it will run the
  //callback only once, when the component is rendered for the first time

  // useEffect(() => {
  //   getUsers() // fetch the data from the express server (start the server first!)
  // }, [])

  return (
    <div className='user-login'>
      {/* render a "User" component for every data entry
      the key attribute is used by react for list management
      pass data to the "User" component through "item" prop => how you name the prop is up to you
      access the data in the "User" component by props.item */}
      {/* {users.length > 0 && users?.map(e => <User key={e.id} item={e} />)} */}
      <UserForm onAdd={verifyUser} />
    </div>
  )
}

export default Login;