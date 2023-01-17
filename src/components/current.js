import React from 'react';
import "./current.css"

function Current({current,city}) {
    return (
        <div className='current'>   
           
       
        <div className='city'><b>{city.name},{city.region},{city.country}</b>
        <p style={{textAlign:"center"}}><b>Current Weather</b></p>
        </div>
       <div className='bodycurrent'>
        <img src={current.condition.icon} alt="icon"></img>
        <span><b>{current.condition.text}</b> </span>
       <p> <span className='deg'><b>TEMP  C :</b>{current.temp_c} </span>C</p>
       <p><span className='deg'><b>TEMP F : </b>{current.temp_f} </span>F</p>
  
       <p> <span  className='deg'><b>feels Like :</b>{current.feelslike_c} </span></p>
       <p><span  className='deg'><b>Wind : </b>{current.wind_kph}</span></p>

        </div>
        </div>
        
    )
}

export default Current
