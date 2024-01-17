import { useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import './User.css'

const SERVER = 'http://localhost:8080'
function UserReq (props) {
    const { item } = props
    const authId=useSelector((state)=>state.authId)
    const [btnPressed,setBtnPressed]=useState(false)

    const dispatch = useDispatch()

    async function DispatchUser(){
        dispatch({type:'userView',externalUserId:item.id_user})
    }
    
    async function addFriend(){
        const email=item.emailAdress;
        const response=await fetch(`${SERVER}/friendRelations/${authId}/${email}`, {    
            method: 'post',    
            headers: {    
                'Content-Type': 'application/json'  
            },      
        })    
        if(response.status===204){
            setBtnPressed(true)   
        }    
    }

    return (
        <div className='userFriendReq'>
            <div className='username'>
                <Link to="/users/account" onClick={DispatchUser}>
                    User: {item.username}
                </Link>
            </div>
            <div className='email'>
                {item.typeOfEater}
            </div>
                {btnPressed ===false ?(
                    <button id='btnAddFriend' onClick={addFriend}>
                        <img id='imgButtonAdd1' src={require('../images/additionOrange.png')}/>
                        <img id='imgButtonAdd2' src={require('../images/additionYellow.png')}/>
                    </button>
                ):(
                <div/
                >)}
            
        </div>
    )
}

export default UserReq