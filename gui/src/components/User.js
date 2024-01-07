import RegularUser from "./RegularUser";

function User(props) {
  const { item } = props; // object destructuring for accessing the data sent by the "UserList" parent component

  //pass data to RegularUser/PowerUser component through props (named "item" in this case)
  return (
    <div className="user">
      <RegularUser item={item} />
    </div>
  );
}

export default User;
