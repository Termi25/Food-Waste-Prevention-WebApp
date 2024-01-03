import './RegularUser.css'

function User (props) {
  const { item } = props

  return (
    <div className='regular-user'>
      <div className='email'>
        {item.email}
      </div>
      <div className='password'>
        {item.password}
      </div>
    </div>
  )
}

export default User
