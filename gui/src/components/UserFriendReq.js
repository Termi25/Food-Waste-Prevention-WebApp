import './User.css'
import {useSelector} from 'react-redux'

const SERVER = 'http://localhost:8080'
function UserReq (props) {
    const { item } = props
    const authId=useSelector((state)=>state.authId)
    var friendID;
    
    async function addFriend(){
        const email=item.emailAdress;
        const response=await fetch(`${SERVER}/friendRelation/${authId}/${email}`, {    
            method: 'post',    
            headers: {    
                'Content-Type': 'application/json'  
            },      
        })    
        if(response.status===201){
            console.log('ok')    
        }    
    }

    return (
        <div className='user'>
        <div className='username'>
            {item.username}
        </div>
        <div className='email'>
            {item.typeOfEater}
        </div>
            <button id='btnAddFriend' onClick={addFriend}>
                <img id='imgButtonAdd1' src={require('../images/additionOrange.png')}/>
                <img id='imgButtonAdd2' src={require('../images/additionYellow.png')}/>
            </button>
        </div>
    )
}

export default UserReq