import addNotification from 'react-push-notification'
import {useSelector} from 'react-redux'
import { useState } from 'react'
import './Food.css'

const SERVER = 'http://localhost:8080'

function Food (props) {
    const { item } = props
    const authId=useSelector((state)=>state.authId)
    
    async function updateFood(value){
        if(value==="true"){
            item.Claimable=true
        }else{
            item.Claimable=false
        }
        const response=await fetch(`${SERVER}/foods/${authId}/${item.id_food}`, {
            method: 'put',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          });
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
            {item.Claimable===false ?(
                        <select id="boxVType" name="type" size="1"required onChange={(evt) => updateFood(evt.target.value)}>
                            <option value="false" selected="selected">Not claimable</option>
                            <option value="true">Claimable</option>
                        </select>)
                        :(
                        <select id="boxVType" name="type" size="1" required onChange={(evt) => updateFood(evt.target.value)}>
                            <option value="false">Not claimable</option>
                            <option value="true" selected="selected">Claimable</option>
                        </select>)
            }

        </div>
    </div>
    )
}

export default Food