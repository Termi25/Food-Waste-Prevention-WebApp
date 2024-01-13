import addNotification from 'react-push-notification';
import './Food.css'

function Food (props) {
    const { item } = props

    const date2=new Date().toISOString().slice(0, 10)

    var currDate=new Date(date2)
    var foodDate=new Date(item.ExpirationDate)
    if(currDate.getTime()===foodDate.getTime()){
        // addNotification({
        //     title: "Notify",
        //     subtitle: "Product expiration date will soon be passed",
        //     message: `${item.food_name} will expire today`,
        //     theme: "white",
        //     duration: 6000,
        //     closeButton: "X",
        //     backgroundTop: "red", 
        //   })
    }else{
        if(currDate.getTime()>foodDate.getTime()){
            addNotification({
                title: "Alert",
                subtitle: "Product expiration date passed",
                message: `${item.food_name} has expired`,
                theme: "dark",
                duration: 6000,
                closeButton: "X",
                backgroundTop: "red", 
              })
        }else{
            var zile=foodDate.getDate()-currDate.getDate()
                addNotification({
                    title: "Notify",
                    message: `${item.food_name} will expire in ${zile} days`,
                    theme: "white",
                    duration: 6000,
                    closeButton: "X",
                    backgroundTop: "orange", 
                  })
        }
    }

    function setCheck(){
        if(item.Claimable===false){
            return "Not visible for claim"
        }else{
            return "Visible for claim"
        }
    }

    return (
    <div className='food-item'>
        <div className='food_name'>
            <label className="labelsFoodSection">NAME :  </label>
            {item.food_name}
        </div>
        <div className='food_type'>
            <label className="labelsFoodSection">TYPE :  </label>
            {item.FoodType}
        </div>
        <div className='expiration_date' id='expiration'>
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