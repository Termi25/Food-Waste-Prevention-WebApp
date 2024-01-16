import addNotification from "react-push-notification";
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
            addNotification({
                title: "Notify",
                subtitle: "Registration successful",
                message: `Account registration successful! Please login in.`,
                theme: "dark",
                closeButton: "X",
                backgroundTop: "green", 
              })
            navigate('/')
        }
        else{
            addNotification({
                title: "Notify",
                subtitle: "Registration failed",
                message: `Account registration failed. Please try again!`,
                theme: "dark",
                closeButton: "X",
                backgroundTop: "red", 
              })
        }
    }

    return (
        <div className="mainRegister">
            <RegisterForm onAdd={registerUser}/>
        </div>
    );
}

export default Register;