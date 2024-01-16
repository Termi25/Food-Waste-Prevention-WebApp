import {useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import addNotification from 'react-push-notification'
import './ClaimRequest.css'

const SERVER = 'http://localhost:8080'

function ClaimRequestReceive (props) {
  const { item } = props
  const authId=useSelector((state)=>state.authId)
  const [food,setFood]=useState("")
  const [foodOwner,setFoodOwner]=useState("")
  const [responded,setResponded]=useState(false)

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
        setResponded(true)
        updateClaim()
    }

    function btnRejectClaimReq(){
        item.status='rejected'
        setResponded(true)
        updateClaim()
    }

  return (
    <div className='request'>
        <div className='ClaimReqField'>
            Food name : {food.food_name}
        </div>
        <div className='ClaimReqField'>
            Food type : {food.FoodType}
        </div>
        <div className='ClaimReqField'>
            Expiration date : {food.ExpirationDate}
        </div>
        <div>
            {foodOwner.id_user!==authId ?(<div className='ClaimReqField'>User requesting claim    : {foodOwner.username}</div>):(<div/>)}
        </div>
        <div className='ClaimReqField' id='status'>
            Status : {item.status}
        </div>
        {responded===false ?(
            <div className='ClaimReqBtns'>
                <button id="btnAcceptReq" className='btnClaimReq' onClick={btnAcceptClaimReq}>Accept</button>
                <button id="btnRejectReq" className='btnClaimReq' onClick={btnRejectClaimReq}>Reject</button>
            </div>
        ):(<div/>)}
        
    </div>
  )
}

export default ClaimRequestReceive