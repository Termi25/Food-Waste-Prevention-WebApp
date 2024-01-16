import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FoodClaimable from './FoodClaimable'
import UserReq from'./UserFriendReq'
import User from'./User'
import {useSelector, useDispatch} from 'react-redux'
import './GiveAwayCenter.css'

const SERVER = 'http://localhost:8080'

function GiveAwayCenter(){
    const authId=useSelector((state)=>state.authId)
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [food,setFood]=useState([])
    const [users,setUsers]=useState([])
    const [users1,setUsers1]=useState([])

    const getFood = async () => {
        try{
            const response = await fetch(`${SERVER}/foods/not/${authId}`)
            const data = await response.json()
            setFood(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    const getUsers = async () => {
        try{
            const response = await fetch(`${SERVER}/users/not/${authId}`)
            const data = await response.json()
            setUsers(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    const getUsers1 = async () => {
        try{
            const response = await fetch(`${SERVER}/users/not/global/${authId}`)
            const data = await response.json()
            setUsers1(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    useEffect(() => {
        try{
            getFood()
            getUsers()
            getUsers1()
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
      },[authId])

    function LogOut(){
        dispatch({type:'logout'});
        navigate('/');
    }

    return(
        <div className='GAC_container'>
            <div className='Shortcuts'>
                <Link to="/giveawaycenter">
                            <p className='pageHeaderTitle' id='toCenter'>
                            WasteNOT
                            </p>
                </Link>
                <Link to="/account">
                            <p className='pageHeaderTitle' id='toAccount'>
                            My account
                            </p>
                </Link>
                <Link to="/" onClick={LogOut}>
                            <p className='pageHeaderTitle' id='toLogin'>
                            Log out
                            </p>
                </Link>
            </div>
            <div className='Spacer'/>
            <div className='DataDisplay'>
                <div className='FoodList'>
                        <p className='pageHeaderTitle' id='FoodListTitle'>
                            Claimable Food
                            </p>
                        {food.length > 0 && food?.map(e => <FoodClaimable key={e.id_food} item={e} />)}
                        {food.length ===0 ?(<p>No food that can be claimed.</p>):(<div/>)}
                </div>
                <div className='UserList'>
                    <p className='pageHeaderTitle' id='UsersListTitle'>
                            Users that can be added
                            </p>
                    {users.length > 0 && users?.map(e => <UserReq key={e.id_food} item={e} />)}
                    {users.length ===0 ?(<p>No users to add as friends</p>):(<div/>)}
                </div>
                <div className='UserList'>
                    <p className='pageHeaderTitle' id='UsersListTitle'>
                            Global Users List
                            </p>
                    {users1.length > 0 && users1?.map(e => <User key={e.id_food} item={e} />)}
                    {users1.length ===0 ?(<p>No users other then current one</p>):(<div/>)}
                </div>
            </div>
        </div>
    );
}
/* <img id='imgBackgroundGAC' src={require('../images/monika-grabkowska-P1aohbiT-EY-unsplash.png')}/> */
export default GiveAwayCenter;