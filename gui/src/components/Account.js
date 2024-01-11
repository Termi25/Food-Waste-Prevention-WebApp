import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import "./Account.css"
import { useEffect, useState } from 'react'
import Food from './Food'

const SERVER = 'http://localhost:8080'
const Account=(props)=>{
    // const {state}=useLocation();
    // const [isLoggedIn, setIsLoggedIn]=useState(state.isLoggedIn);
    // const [authId,setAuthId]=useState(state.authId);
    const authId=useSelector((state)=>state.authId)
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)

    const [username, setUsername]=useState("-")
    const [emailAdress,setEmailAdress]=useState("-")
    const [typeOfEater,setTypeOfEater]=useState("-")
    const [createdAt,setCreatedAt]=useState("-")

    const [food,setFood]=useState([])

    const [foodName,setFoodName]=useState("")
    const [expiration,setExpiration]=useState("")
    const [foodType,setFoodType]=useState("")
    const [claimable,setClaimable]=useState(false)

    const navigate=useNavigate()
    const dispatch=useDispatch()
    
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
                            // alert('Dont forget to add the food in your fridge!')
                        }
                    }  
                }else{
                    // alert('Succesful LogOff');
                    // navigate('/');
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
        dispatch({type:'logout'});
        navigate('/');
    }

    const getFood = async () => {
        try{
            const response = await fetch(`${SERVER}/foods/${authId}`)
            const data = await response.json()
            setFood(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    const addFoodtoDB = async () => {
        try{
            const food_to_add={food_name:foodName,ExpirationDate:expiration,FoodType:foodType,Claimable:claimable}
            const response=await fetch(`${SERVER}/foods/${authId}`, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(food_to_add)
            })
            if(response.status===201){
                getFood()
            }
            document.getElementById('boxFName').value = ''
            document.getElementById('boxFType').value = ''

        }catch(err){
            
        }
    }

    useEffect(() => {
        try{
            getFood()
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
      },[authId])


    return (
        <div id="mainAccount">
            <div className="accountDetails">
                <Link to="/giveawaycenter"
                    state={{
                        authId,
                        isLoggedIn
                    }}><p className='pageHeaderTitle' id='toCenter'>WasteNOT</p></Link>
                <UserData />
                <button id="btnLogOut" onClick={LogOut}>Log Out</button>
            </div>
            <div className='FoodList'>
                <div className='titleNBtns'>
                    <p className='pageHeaderTitle'>FOOD LIST</p>
                </div>
                <div className='FoodList'>
                    {food.length > 0 && food?.map(e => <Food key={e.id_food} item={e} />)}
                </div>
            </div>
            <div className='FoodAdder'>
                <p className='pageHeaderTitle'>FOOD Adder</p>
                <div className="divFoodAdder">
                    <label className="labelsFoodAdderSection">Food Name</label>
                    <input
                    id="boxFName"
                    type="text"
                    placeholder="Food Name"
                    onChange={(evt) => setFoodName(evt.target.value)}
                    required
                    />
                </div>
                <div className="divFoodAdder">
                    <label className="labelsFoodAdderSection">Expiration Date</label>
                    <input
                    id="boxExpiration"
                    type="date"
                    onChange={(evt) => setExpiration(evt.target.value)}
                    required
                    />
                </div>
                <div className="divFoodAdder">
                    <label className="labelsFoodAdderSection">Food Type</label>
                    <input
                    id="boxFType"
                    type="text"
                    placeholder="Food Type"
                    onChange={(evt) => setFoodType(evt.target.value)}
                    required
                    />
                </div>
                <div className="divFoodAdder">
                    <label className="labelsFoodAdderSection">Claimable</label>
                    <select id="boxClaim" name="type" size="1" required onChange={(evt) => setClaimable(evt.target.value)}>
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </div>
                <button className='btnPrimary' onClick={addFoodtoDB}>Add food</button>
            </div>
        </div>
    );
}

export default Account;