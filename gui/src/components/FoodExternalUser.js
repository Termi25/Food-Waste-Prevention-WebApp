import addNotification from 'react-push-notification'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import './Food.css'

const SERVER = 'http://localhost:8080'

function FoodExternalUser (props) {
    const { item } = props

    function ClaimableCheck(){
        if(item.Claimable===true){
            return 'Claimable'
        }else{
            return 'Not claimable'
        }
    }

    return (
    <div className='food-item'>
        <div className='food_name'>
            <label className="labelsFoodSection">NAME :  </label>
            {item.food_name}
        </div>
        <div className='food_type'>
            <label className="labelsFoodSection">TYPE :  </label>
            {item.FoodType}
        </div>
        <div className='expiration_date' id='expiration'>
            <label className="labelsFoodSection">EXPIRATION DATE :  </label>
            {item.ExpirationDate}
        </div>
        <div className='visibility'>
            <label className="labelsFoodSection">VISIBILITY :  </label>
            {ClaimableCheck()}
        </div>
    </div>
    )
}

export default FoodExternalUser