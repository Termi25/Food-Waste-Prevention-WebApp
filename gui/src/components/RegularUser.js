import './RegularUser.css'

function User (props) {
  const { item } = props

  return (
    <div className='regular-user'>
      <div className='email'>
        {item.emailAdress}
      </div>
      <div className='username'>
        {item.username}
      </div>
    </div>
  )
}

export default User
