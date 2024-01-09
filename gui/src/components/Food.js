import './Food.css'

function Food (props) {
    const { item } = props
    
    function setCheck(){
        if(item.Claimable===false){
            return "Not visible for claim"
        }else{
            return "Visible for claim"
        }
    }
    return (
    <div className='food-item'>
        <div>
            <input type='checkbox' id='checkboxFood' onChange={setCheck()}/>
        </div>
        <div className='food_name'>
            <label className="labelsFoodSection">NAME :  </label>
            {item.food_name}
        </div>
        <div className='food_type'>
            <label className="labelsFoodSection">TYPE :  </label>
            {item.FoodType}
        </div>
        <div className='expiration_date'>
            <label className="labelsFoodSection">EXPIRATION DATE :  </label>
            {item.ExpirationDate}
        </div>
        <div className='visibility'>
            <label className="labelsFoodSection">VISIBILITY :  </label>
            {setCheck()}
        </div>
        {/* <button className='btnGeneral'>Remove</button>
        <button className='btnGeneral'>Mark to give away</button> */}
    </div>
    )
}

export default Food

// id_food:{
//     type: Sequelize.UUID,
//     defaultValue:Sequelize.UUIDV4,
//     primaryKey: true,
// },
// food_name: {
//     type:Sequelize.STRING,
//     allowNull: false,
//     validate:{
//         len:[3,200],
//     },
// },
// ExpirationDate:{
//     type:Sequelize.DATEONLY,
//     allowNull:false,
// },
// FoodType:{
//     type:Sequelize.STRING,
//     allowNull:false,
//     validate:{
//         len:[3,200]
//     },
// },