import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Account.css"
import { useEffect, useState } from 'react';
import Food from './Food'

const SERVER = 'http://localhost:8080'
const Account=(props)=>{
    const {state}=useLocation();
    const [isLoggedIn, setIsLoggedIn]=useState(state.isLoggedIn);
    const [authId,setAuthId]=useState(state.authId);
    const [username, setUsername]=useState("-");
    // const [password,setPassword]=useState("-");
    const [emailAdress,setEmailAdress]=useState("-");
    const [typeOfEater,setTypeOfEater]=useState("-");
    const [createdAt,setCreatedAt]=useState("-");
    const [food,setFood]=useState([])
    const navigate=useNavigate();
    
    function UserData(){
        useEffect(()=>{
            async function fetchUser(){
                if(isLoggedIn!==false){
                    const response=await fetch(`${SERVER}/users/${authId}`, {
                        method: 'get',
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      });
                    if(response.status===201){
                        try{
                            response.json().then((user)=>{
                                setUsername(user.username)
                                setEmailAdress(user.emailAdress)
                                setTypeOfEater(user.typeOfEater)
                                let date="";
                                for(let i=0;i<10;i++){
                                    date=date+user.createdAt[i]
                                }
                                setCreatedAt(date)
                            })
                        }catch(err){
                            alert('Dont forget to add the food in your fridge!')
                        }
                    }  
                }else{
                    alert('Succesful LogOff');
                    navigate('/');
                }
            }
            fetchUser();
        });

        return (
        <div className='divAccount'>
            <p className='pageHeaderTitle'>Account Details</p>
            <div className='divAccountDetail'>
                <label className="labelsAccountSection">USERNAME </label>
                <input id="usernameAccount" type="text" className='field' defaultValue={username} readOnly/>
            </div>
            <div className='divAccountDetail'>
                <label className="labelsAccountSection">EMAIL ADDRESS </label>
                <input type="emailAddressAccount" className='field' defaultValue={emailAdress} readOnly />
            </div>
            <div className='divAccountDetail'>
                <label className="labelsAccountSection">TYPE OF EATER </label>
                <input type="typeOfEater" className='field' defaultValue={typeOfEater} readOnly />
            </div>
            <div className='divAccountDetail'>
                    <label className="labelsAccountSection">DATE OF ACCOUNT CREATION </label>
                    <input type="dateAccountCreation" className='field' defaultValue={createdAt} readOnly/>
            </div>
        </div>
        );
    }

    function LogOut(){
        alert('Succesful LogOff');
        navigate('/');
    }

    const getFood = async () => {
        try{
            const response = await fetch(`${SERVER}/foods/${authId}`)
            const data = await response.json()
        setFood(data)
        }catch(err){
            alert('Dont forget to add the food in your fridge!')
        }
      }

    useEffect(() => {
        try{
            getFood()
        }catch(err){
            alert('Dont forget to add the food in your fridge!')
        }
      },[])

    return (
        <div id="mainAccount">
            <div className="accountDetails">
                <Link to="/giveawaycenter"
                    state={{
                        authId,
                        isLoggedIn
                    }}><p className='pageHeaderTitle'>WasteNOT</p></Link>
                <UserData />
                <button id="btnLogOut" onClick={LogOut}>Log Out</button>
            </div>
            <div>
                <div className='titleNBtns'>
                    <p className='pageHeaderTitle'>FOOD LIST</p>
                    <button className='btnPrimary'>Add food</button>
                </div>
                <div className='FoodList'>
                    {food.length > 0 && food?.map(e => <Food key={e.id_food} item={e} />)}
                </div>
            </div>
        </div>
    );
}

export default Account;