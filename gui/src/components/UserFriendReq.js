import './User.css'
import {useSelector} from 'react-redux'

const SERVER = 'http://localhost:8080'
function UserReq (props) {
    const { item } = props
    const authId=useSelector((state)=>state.authId)
    var friendID;
    
    async function addFriend(){
        const email=item.emailAdress;
        const response=await fetch(`${SERVER}/users/friends/${email}`, {    
            method: 'get',    
            headers: {    
                'Content-Type': 'application/json'  
            },      
        })    
        if(response.status===201){
            response.json().then((user)=>{setID(user.id_user)})    
        }    
    }

    async function setID(x){
        friendID=x;
        var user2={"user_id2":friendID}
        console.log(user2)
        const response2=await fetch(`${SERVER}/friendRelation/${authId}`, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user2)
            })
            if(response2.status===201){
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