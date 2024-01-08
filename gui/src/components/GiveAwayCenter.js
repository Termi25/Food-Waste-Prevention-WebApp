import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Food from './Food'

const SERVER = 'http://localhost:8080'

function GiveAwayCenter(){
    const {state}=useLocation();
    console.log(state)
    return(
        <div className='GAC_container'>
            <div>
                <p>Ceva</p>
            </div>
        </div>
    );
}

export default GiveAwayCenter;