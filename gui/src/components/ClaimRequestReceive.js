import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import addNotification from 'react-push-notification'
import Food from './Food'
import User from './User'
import './ClaimRequest.css'

const SERVER = 'http://localhost:8080'

function ClaimRequestReceive (props) {
  const { item } = props
  const authId=useSelector((state)=>state.authId)
  const [food,setFood]=useState("")
  const [foodOwner,setFoodOwner]=useState("")

    const getOwner = async () => {
        try{
            const response = await fetch(`${SERVER}/claimRequest/${item.id_claim}`)
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

    async function updateClaim(){
        const response=await fetch(`${SERVER}/claimRequest/${item.id_claim}`, {
            method: 'put',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        if(response.status===201){
            console.log('accepted claim req')
        }
    }

    function btnAcceptClaimReq(){
        item.status='accepted'
        updateClaim()
    }

    function btnRejectClaimReq(){
        item.status='rejected'
        updateClaim()
    }

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
            {foodOwner.id_user!==authId ?(<div>User requesting claim: {foodOwner.username}</div>):(<div/>)}
        </div>
        <div className='status'>
            Status: {item.status}
        </div>
        {item.status!=='accepted' ?(
        <div>
            <button onClick={btnAcceptClaimReq}>Accept</button>
            <button onClick={btnRejectClaimReq}>Reject</button>
        </div>
        ):(<div/>)}
        
    </div>
  )
}

export default ClaimRequestReceive