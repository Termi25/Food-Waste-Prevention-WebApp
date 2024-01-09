import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Food from './Food'
import {useSelector, useDispatch} from 'react-redux'

const SERVER = 'http://localhost:8080'

function GiveAwayCenter(){
    const authId=useSelector((state)=>state.authId)
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)

    const [food,setFood]=useState([])

    const getFood = async () => {
        try{
            const response = await fetch(`${SERVER}/foods/not/${authId}`)
            const data = await response.json()
            setFood(data)
            console.log(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
      }

    useEffect(() => {
        try{
            getFood()
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
      },[authId])

    return(
        <div className='GAC_container'>
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
            <div className='FoodList'>
                    {food.length > 0 && food?.map(e => <Food key={e.id_food} item={e} />)}
            </div>
            <div classname='UsersList'>
                
            </div>
        </div>
    );
}

export default GiveAwayCenter;