import addNotification from 'react-push-notification'
import {useSelector, useDispatch} from 'react-redux'
import './Food.css'

const SERVER = 'http://localhost:8080'
function FoodClaimable (props) {
    const { item } = props
    const authId=useSelector((state)=>state.authId)
    const isLoggedIn=useSelector((state)=>state.isLoggedIn)

    function setCheck(){
        if(item.Claimable===false){
            return "Not visible for claim"
        }else{
            return "Visible for claim"
        }
    }

    async function addClaim(){
        if(isLoggedIn!==false){
            const response=await fetch(`${SERVER}/claimRequest/${item.id_food}/${authId}`, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body:JSON.stringify(item)
              });
            if(response.status===201){
                console.log('Claim added')
            }  
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
            {setCheck()}
        </div>
        <button className='btnGeneral' onClick={addClaim}>Claim</button>
    </div>
    )
}

export default FoodClaimable