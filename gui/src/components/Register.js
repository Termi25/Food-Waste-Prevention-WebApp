import "./Register.css";
import RegisterForm from "./RegisterForm"
import { useNavigate } from "react-router-dom";

const SERVER = 'http://localhost:8080'

function Register(props) {
    const navigate=useNavigate();

    const registerUser = async user => {
        const response=await fetch(`${SERVER}/users`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
        })
        if(response.status===201){
            alert('User succesfully registered')
            navigate('/')
        }
        else{
            alert('User registration failed. Please try again!')
        }
    }

    return (
        <div className="mainRegister">
            <RegisterForm onAdd={registerUser}/>
        </div>
    );
}

export default Register;