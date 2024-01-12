import './User.css'

function User (props) {
  const { item } = props
  return (
    <div className='user'>
      <div className='username'>
        {item.username}
      </div>
      <div className='email'>
        {item.emailAdress}
      </div>
    </div>
  )
}

export default User
