import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './User.css'

function User (props) {
  const { item } = props
  const dispatch = useDispatch()

  async function DispatchUser(){
    dispatch({type:'userView',externalUserId:item.id_user})
  }

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
      </div>
  )
}

export default User
