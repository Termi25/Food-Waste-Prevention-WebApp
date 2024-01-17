import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import addNotification from 'react-push-notification'
import User from './User'
import FoodExternalUser from './FoodExternalUser'
import "./Account.css"

const SERVER = 'http://localhost:8080'

function AccountExternal(props){
    const authId=useSelector((state)=>state.authId)
    const externalUserId=useSelector((state)=>state.externalUserId)
    const [users,setUsers]=useState([])

    const [username, setUsername]=useState("-")
    const [emailAdress,setEmailAdress]=useState("-")
    const [typeOfEater,setTypeOfEater]=useState("-")
    const [createdAt,setCreatedAt]=useState("-")

    const [food,setFood]=useState([])

    const navigate=useNavigate()
    const dispatch=useDispatch()
    
    function UserData(){
        useEffect(()=>{
            async function fetchUser(){
                    const response=await fetch(`${SERVER}/users/${externalUserId}`, {
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
                            // alert('Dont forget to add the food in your fridge!')
                        }
                    }  
                }
            fetchUser()
        });

        return (
        <div className='divAccount'>
            <div id='shareSection'>
                <p className='pageHeaderTitle'>Account Details</p>
            </div>
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
        dispatch({type:'logout'});
        navigate('/');
    }

    const getUsers = async () => {
        try{
            const response = await fetch(`${SERVER}/friendRelations/${externalUserId}`)
            const data = await response.json()
            setUsers(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    const getFood = async () => {
        try{
            const response = await fetch(`${SERVER}/foods/${externalUserId}`)
            const data = await response.json()
            setFood(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    useEffect(() => {
        try{
            getFood()
            getUsers()
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
      },[authId,externalUserId])


    return (
        <div id="mainAccount2"> 
            <div className="accountDetails">
                <div id="linkBar">
                    <p className='pageHeaderTitle' id='toCenter'>WasteNOT</p>
                    <div className='pageSeparator'>
                        <Link to="/giveawaycenter">
                            <p className='pageHeaderTitle' id='toGAC'>Giveaway Center</p>
                        </Link>
                        <Link to="/account">
                            <p className='pageHeaderTitle' id='toAccount'>Account</p>
                        </Link>
                        <Link to="/" onClick={LogOut}>
                            <p className='pageHeaderTitle' id='toLogin'>
                                Log out
                            </p>
                        </Link>
                    </div>
                </div>
                <UserData />
                <div className='accountDetailsLower'>
                    <div className='FriendList'>
                        <p className='pageHeaderTitle' id='UsersListTitle'>
                                Friends List
                                </p>
                        {users.length > 0 && users?.map(e => <User key={e.id_user} item={e} />)}   
                        {users.length === 0 ?(<p>No friends added</p>):(<div/>)}
                    </div>
                </div>
            </div>
            <div className='FoodList'>
                <div className='titleNBtns'>
                    <p className='pageHeaderTitle'>FOOD LIST</p>
                </div>
                <div className='FoodList'>
                    {food.length > 0 && food?.map(e => <FoodExternalUser key={e.id_food} item={e} />)}
                    {food.length ===0 ?(<p>No food added</p>):(<div/>)}
                </div>
            </div>
        </div>
    );
}
export default AccountExternal