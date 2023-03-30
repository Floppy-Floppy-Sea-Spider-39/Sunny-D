import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import Button from '@mui/material/Button';
import Badge from './Badge.jsx';


import egg from '../assets/egg.png';
import golden_hour from '../assets/golden-hour.png';
import hot from '../assets/hot.png';
import hour_glass from '../assets/hour-glass.png';
import solar_panel from '../assets/solar-panel.png';
import stopwatch from '../assets/stopwatch.png';
import sun from '../assets/sun.png';
import sunburn from '../assets/sunburn.png';
import sunglasses from '../assets/sunglasses.png';
import sunset from '../assets/sunset.png';
import tan from '../assets/tan.png';
import tired from '../assets/tired.png';
import vitamin_d from '../assets/vitamin-d.png';

const badges = [
    {
      title: "Vitamin D Master",
      description: "Awarded for consistently getting enough vitamin D from the sun.",
      img: vitamin_d
    },
    {
      title: "Sun Worshipper",
      description: "Awarded for spending hours outside soaking up the sun and vitamin D.",
      img: sun
    },
    {
      title: "Solar-Powered",
      description: "Awarded for getting all your daily vitamin D from the sun.",
      img: solar_panel
    },
    {
      title: "Sun-Kissed",
      description: "Awarded for a perfect combination of sun and vitamin D.",
      img: sunglasses
    },
    {
      title: "Golden Hour Guru",
      description: "Awarded for perfectly timing your sun exposure to get optimal vitamin D.",
      img: golden_hour
    },
    {
      title: "Sunny Side Up",
      description: "Awarded for always looking on the bright side and getting enough vitamin D from the sun.",
      img: egg
    },
    {
      title: "Sunburn Survivor",
      description: "Awarded for toughing it out through a sunburn in the name of vitamin D.",
      img: sunburn
    },
    {
      title: "Tan-tastic",
      description: "Awarded for achieving a great tan and optimal vitamin D levels.",
      img: tan
    },
    {
      title: "Sun Chaser",
      description: "Awarded for always seeking out the sun to get enough vitamin D.",
      img: hot
    },
  ];

// https://mui.com/material-ui/react-image-list/
function Achievements(props) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            <div className="achievementContainer">
                <h1 style={{ textAlign: 'center' }}>
                    Achievements
                </h1>
            
                <ImageList sx={{ width: 360, height: 650 }} style={{alignItems: 'center' }} cols={3}>
                    {badges.map((item) => (<Badge key={item.img} details={item}/>))}
                </ImageList>
                <Button variant="contained" onClick={() => navigate('/home', { state:{ name: location.state.name }})}>
                    ☀️ Back to the sunny goodness ☀️
                </Button>
            </div>
        </>
        
    )

}

export default Achievements;