import { Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Food from './Food'
import UserReq from'./UserFriendReq'
import {useSelector, useDispatch} from 'react-redux'
import './GiveAwayCenter.css'

const SERVER = 'http://localhost:8080'

function GiveAwayCenter(){
    const authId=useSelector((state)=>state.authId)
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)

    const [food,setFood]=useState([])
    const [users,setUsers]=useState([])

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

    useEffect(() => {
        try{
            getFood()
            getUsers()
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
      },[authId])

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
            </div>
            <div className='Spacer'/>
            <div className='DataDisplay'>
                <div className='FoodList'>
                        <p className='pageHeaderTitle' id='FoodListTitle'>
                            Food List
                            </p>
                        {food.length > 0 && food?.map(e => <Food key={e.id_food} item={e} />)}
                </div>
                <div className='UserList'>
                    <p className='pageHeaderTitle' id='UsersListTitle'>
                            Users List
                            </p>
                    {users.length > 0 && users?.map(e => <UserReq key={e.id_food} item={e} />)}
                </div>
            </div>
        </div>
    );
}

export default GiveAwayCenter;