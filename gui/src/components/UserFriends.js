import {useSelector,useDispatch} from 'react-redux'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './User.css'

const SERVER = 'http://localhost:8080'

function UserFriends (props) {
  const { item } = props
  const authId=useSelector((state)=>state.authId)
  const [friendRelation,setFriendRelation]=useState("")

  const dispatch = useDispatch()

  async function DispatchUser(){
    dispatch({type:'userView',externalUserId:item.id_user})
  }

  const getFriendRelation = async () => {
      try{
          const response = await fetch(`${SERVER}/friendRelations/${authId}/${item.id_user}`)
          const data = await response.json()
          setFriendRelation(data)
      }catch(err){
          // alert('Dont forget to add the food in your fridge!')
      }
  }

  const updateFriendRelation=async()=>{
    try{
      console.log(friendRelation)
      const response=await fetch(`${SERVER}/friendRelations/${authId}/${item.id_user}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(friendRelation)
      });
      const data = await response.json()
      console.log(data)
    }catch(err){
        // alert('Dont forget to add the food in your fridge!')
    }
  }

  const modifyFriend=async(pseudonim)=>{
    var newFriend=friendRelation
    newFriend.eticheta2=pseudonim
    setFriendRelation(newFriend)
  }

  useEffect(() => {
    try{
        getFriendRelation()
    }catch(err){
        // alert('Dont forget to add the food in your fridge!')
    }
  },[authId])

  return (
      <div className='user'>
        <div className='username'>
          <Link to="/users/account" onClick={DispatchUser}>
            {item.username}
          </Link>
        </div>
        <div className='email'>
          {item.emailAdress}
        </div>
        <div id="etichetaSection">
          <input id="txtEticheta" type="text" defaultValue={friendRelation.eticheta2} onChange={(evt) => modifyFriend(evt.target.value)}
            required/>
          <button id='btnAddFriend2' onClick={updateFriendRelation}>
                      <img id='imgButtonAdd3' src={require('../images/disketteOrange.png')}/>
                      <img id='imgButtonAdd4' src={require('../images/disketteYellow.png')}/>
          </button>
        </div>
      </div>
  )
}

export default UserFriends
