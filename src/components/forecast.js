import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./forecaste.css";
import LinearProgress from '@mui/material/LinearProgress';


function Forecast({forecast :{forecastday} ,city }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      
    }
    // console.log(forecastday);
    return (
     
        <div className='forecaste'>
            <div className='city'><b> ForeCast For {city.name}.</b></div>
               {
            forecastday.map((data,index)=>{ 
                const {day,date,hour,astro}=data;
                const {maxtemp_c,mintemp_c,
                    daily_chance_of_rain,condition:{icon,text}}=day;
                    const {sunrise,sunset
                    }=astro;
                    // console.log(data);
                return (
                   
                    <Accordion expanded={expanded === `${data.date}`} onChange={handleChange(data.date)}   key={index
                    }>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            
            >
             <img src={icon}/>
              <Typography sx={{ width: '33%', flexShrink: 0 }}>{data.date}({text})</Typography>
              <Typography sx={{ color: '' }}>
              <b>Temp</b> {mintemp_c} deg to {maxtemp_c}deg
              </Typography>
              <Typography sx={{ width: '33%', flexShrink: 0 }}> <b>{daily_chance_of_rain}</b> % of Rain posibile </Typography>
              <Typography sx={{ color: '' }}>
                <b>SunRise :{sunrise} & SunSet:{sunset}</b>
             
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {hour.map((time,index)=>{
                // console.log(time);
                return (<div className='hours' key={index}>
                    <b>{index}:00</b>
                    <img src={time.condition.icon}></img>
                    <div className='progress'>
                    <LinearProgress variant="determinate" value={time.temp_c*100/maxtemp_c} />
                    {time.temp_c}

                    </div>

                </div>)
              })}
            </AccordionDetails>
          </Accordion>
                    
                )
            })
        }
  
      
     
    </div>
    )
}

export default Forecast
