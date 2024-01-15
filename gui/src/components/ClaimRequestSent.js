import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import addNotification from 'react-push-notification'
import Food from './Food'
import User from './User'
import './ClaimRequest.css'

const SERVER = 'http://localhost:8080'

function ClaimRequestSent (props) {
  const { item } = props
  const authId=useSelector((state)=>state.authId)
  const [food,setFood]=useState("")
  const [foodOwner,setFoodOwner]=useState("")

    const getOwner = async () => {
        try{
            const response = await fetch(`${SERVER}/claimRequest/owner/${item.id_claim}`)
            const data = await response.json()
            setFoodOwner(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    const getFood = async () => {
        try{
            const response = await fetch(`${SERVER}/claimRequest/food/${item.id_claim}`)
            const data = await response.json()
            setFood(data)
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    }

    useEffect(() => {
        try{
            getFood()
            getOwner()
        }catch(err){
            // alert('Dont forget to add the food in your fridge!')
        }
    },[authId])

  return (
    <div className='request'>
        <div>
            Food name: {food.food_name}
        </div>
        <div>
            Food type: {food.FoodType}
        </div>
        <div>
            Expiration date: {food.ExpirationDate}
        </div>
        <div>
            Owner of food: {foodOwner.username}
        </div>
        <div className='status'>
            Status: {item.status}
        </div>    
    </div>
  )
}

export default ClaimRequestSent