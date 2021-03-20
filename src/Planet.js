import React, { useState } from 'react';
import randomSeed from 'random-seed';
import Moon from './Moon';
import { Grid } from '@material-ui/core';

// This is a planet component, which is displayed in the modal window.
function Planet(props) {
    const [moon, setMoon] = useState('');
    const[color, setColor] = useState('');

    // When the component is mounted, the color is generated. It is also decided whether the planet has a moon. 
    // There is a 1/2 chance of that happening.
    React.useEffect(() => {
        let randGen = randomSeed.create(props.seed);
        function generateColor() {
            const red = randGen(255);
            const green = randGen(255);
            const blue = randGen(255);
    
            return {red: red, green: green, blue: blue};
        }
         const numberOfMoons = randGen(2);
         
         if(numberOfMoons === 1) {
            setMoon(<Moon />)
         }
         setColor(generateColor())
         console.log(generateColor());
    }, [props.seed])

    

    return (
        <Grid 
            container 
            direction="column"
            justify="center"
            alignItems="center"
        >
            <div className="planet-moon" style={{animation: `spinAroundStar${props.planetNumber} ${props.speed}s linear infinite`}}>
                <div className="planet" style={{backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`}}></div>
                {moon}
            </div>
        </Grid>
        
    )   
}

export default Planet;