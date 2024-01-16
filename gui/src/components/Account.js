import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import addNotification from 'react-push-notification'
import Food from './Food'
import User from './User'
import ClaimRequestReceive from './ClaimRequestReceive'
import ClaimRequestSent from './ClaimRequestSent'
import "./Account.css"

const SERVER = 'http://localhost:8080'
const Account=(props)=>{
    // const {state}=useLocation();
    // const [isLoggedIn, setIsLoggedIn]=useState(state.isLoggedIn);
    // const [authId,setAuthId]=useState(state.authId);
    const authId=useSelector((state)=>state.authId)
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)

    const [users,setUsers]=useState([])

    const [username, setUsername]=useState("-")
    const [emailAdress,setEmailAdress]=useState("-")
    const [typeOfEater,setTypeOfEater]=useState("-")
    const [createdAt,setCreatedAt]=useState("-")

    const [food,setFood]=useState([])

    const [foodName,setFoodName]=useState("")
    const [expiration,setExpiration]=useState("")
    const [foodType,setFoodType]=useState("")
    const [claimable,setClaimable]=useState(false)

    const [claimReq,setClaimReq]=useState("")
    const [claimReqOwned,setClaimReqOwned]=useState("")

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
                }
            }
            fetchUser()
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

    const getUsers = async () => {
        try{
            const response = await fetch(`${SERVER}/friendRelations/${authId}`)
            const data = await response.json()
            setUsers(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
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
                addNotification({
                    title: "Succes!",
                    subtitle: "Product was added",
                    message: `Food was succesfully added`,
                    theme: "white",
                    duration: 6000,
                    closeButton: "X",
                    backgroundTop: "green", 
                  })
                getFood()
            }
            document.getElementById('boxFName').value = ''
            document.getElementById('boxFType').value = ''

        }catch(err){
            
        }
    }

    const getClaimReqReceived = async () => {
        try{
            const response = await fetch(`${SERVER}/claimRequests/received/${authId}`)
            const data = await response.json()
            setClaimReq(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    const getClaimReqSent = async () => {
        try{
            const response = await fetch(`${SERVER}/claimRequests/made/${authId}`)
            const data = await response.json()
            setClaimReqOwned(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    function receiveNotification(){
        for(let i=0;i<food.length;i++){
            const date2=new Date().toISOString().slice(0, 10)

            var currDate=new Date(date2)
            var foodDate=new Date(food[i].ExpirationDate)
        
            if(currDate.getTime()===foodDate.getTime()){
                // addNotification({
                //     title: "Notify",
                //     subtitle: "Product expiration date will soon be passed",
                //     message: `${item.food_name} will expire today`,
                //     theme: "white",
                //     duration: 6000,
                //     closeButton: "X",
                //     backgroundTop: "red", 
                //   })
            }else{
                if(currDate.getTime()>foodDate.getTime()){
                    addNotification({
                        title: "Alert",
                        subtitle: "Product expiration date passed",
                        message: `${food[i].food_name} has expired`,
                        theme: "dark",
                        closeButton: "X",
                        backgroundTop: "red", 
                      })
                }else{
                    var zile=foodDate.getDate()-currDate.getDate()
                        addNotification({
                            title: "Notify",
                            message: `${food[i].food_name} will expire in ${zile} days`,
                            theme: "white",
                            closeButton: "X",
                            backgroundTop: "orange", 
                          })
                }
            }
        }
    }

    useEffect(() => {
        try{
            getFood()
            getUsers()
            getClaimReqReceived()
            getClaimReqSent()
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
      },[authId])


    return (
        <div id="mainAccount"> 
            <div className="accountDetails">
                <Link to="/giveawaycenter">
                    <p className='pageHeaderTitle' id='toCenter'>WasteNOT</p>
                    </Link>
                <UserData />
                <div className='accountDetailsLower'>
                    <button id="btnLogOut" onClick={LogOut}>Log Out</button>
                    <div className='FriendList'>
                        <p className='pageHeaderTitle' id='UsersListTitle'>
                                Friends List
                                </p>
                        {users.length > 0 && users?.map(e => <User key={e.id_user} item={e} />)}   
                        {users.length ===0 ?(<p>No friends added</p>):(<div/>)}
                    </div>
                    <button id="btnNotification" type='submit' onClick={receiveNotification}>Notifications</button>
                </div>
            </div>
            <div className='FoodList'>
                <div className='titleNBtns'>
                    <p className='pageHeaderTitle'>FOOD LIST</p>
                </div>
                <div className='FoodList'>
                    {food.length > 0 && food?.map(e => <Food key={e.id_food} item={e} />)}
                    {food.length ===0 ?(<p>No food added</p>):(<div/>)}
                </div>
            </div>
            <div className='Adder_n_ClaimReq'>
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
                        <select id="boxFType" name="type" size="1" required onChange={(evt) => setFoodType(evt.target.value)}>
                            <option value="Bauturi alcoolice">Bauturi alcoolice</option>
                            <option value="Bauturi non-alcoolice">Bauturi non-alcoolice</option>
                            <option value="Cafea">Cafea</option>
                            <option value="Cereale">Cereale</option>
                            <option value="Conserve">Conserve</option>
                            <option value="Dulciuri">Dulciuri</option>
                            <option value="Fructe">Fructe</option>
                            <option value="Ingrediente culinare">Ingrediente culinare</option>
                            <option value="Lactate">Lactate</option>
                            <option value="Legume">Legume</option>
                            <option value="Mezeluri si carne">Mezeluri si carne</option>
                            <option value="Oua">Oua</option>
                            <option value="Panificatie">Panificatie</option>
                            <option value="Produse congelate">Produse congelate</option>
                            <option value="Snacks">Snacks</option>
                        </select>
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
                <div className='ClaimReqList'>
                    <div className='titleNBtns'>
                        <p className='pageHeaderTitle'>Claim Requests</p>
                    </div>
                    <div className='FoodList'>
                        {claimReq.length > 0 && claimReq?.map(e => <ClaimRequestReceive key={e.id_claim} item={e} />)}
                        {claimReq.length === 0 ?(<p>No claim request received</p>):(<div/>)}
                    </div>
                </div>
                <div className='ClaimReqList'>
                    <div className='titleNBtns'>
                        <p className='pageHeaderTitle'>Claim Requests for my food</p>
                    </div>
                    <div className='FoodList'>
                        {claimReqOwned.length > 0 && claimReqOwned?.map(e => <ClaimRequestSent key={e.id_claim} item={e} />)}
                        {claimReqOwned.length === 0 ?(<p>No claim request received</p>):(<div/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;