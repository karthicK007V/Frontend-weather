import { useState,useEffect} from 'react';
import './App.css';
import Current from './components/current';
import Forecast from './components/forecast';


function App() {
 
const [city,setcity]=useState('');
const [clicked,setclicked]=useState(false)
const[cityname,setcityname]=useState([])
const [current,setcurrent]=useState();
const [forecast,setforcast]=useState();
const [location,setlocation]=useState()

const AutocompleteUrl="https://api.weatherapi.com/v1/search.json?key=770eaf60c2784b25b4d173847231301&q="
const weatherurl=(city)=>`https://api.weatherapi.com/v1/forecast.json?key=770eaf60c2784b25b4d173847231301&q=${city}&days=7&aqi=no&alerts=no`

useEffect(()=>{

  const setTime=setTimeout(()=>{
    const fetchcity=async ()=>{
      const res=await fetch(AutocompleteUrl+city);
      const data=await res.json();
      // console.log(data);
   
      const currentcity=data.map((city)=>`${city.name},${city.region},${city.country}`)
      setcityname(currentcity);
    }
  
    if(city.length>2&&!clicked){
      fetchcity()
    }else{
      setcityname([])
      setclicked(false)
    }
  },1000)

  return ()=>{clearInterval(setTime)}

 
},[city])


const handelclick= async(clickedcity)=>{
  setcity(clickedcity)
  setclicked(true)

  const res=await fetch(weatherurl(city));
  const weatherdata=await res.json();
  // console.log(weatherdata);
  setcurrent(weatherdata.current);
  setforcast(weatherdata.forecast);
  setlocation(weatherdata.location)

}

  return (<div className='app'>
    <div className='header'>Weather App</div>
    <div className='App-header'>
       <input type="txet" placeholder='Enter City' className='textbox' value={city}
       onChange={(e)=>setcity(e.target.value)}>
        </input>{cityname.length>0 && <div className='wrap'> {
          cityname.map((item,index)=>(
            <div className='suggestion' onClick={()=>{handelclick(item)}} key={index}>{item}</div>
          ))
        }</div>}

        {current && <Current current={current} city={location}/>}
        {forecast && <Forecast forecast={forecast} city={location}/>}
       

        </div>
       
   

  </div>
 
  );
}

export default App;
