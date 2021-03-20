import React, { useState } from 'react';
import Star from './Star';
import "./styles.css";
import randomSeed from 'random-seed';

let randomNumber = randomSeed.create('0, 0');

// This component displays stars and allows the user to navigate the universe. 
function App() {
  const [xCoordinate, setXCoordinate] = useState(0);
  const [yCoordinate, setYCoordinate] = useState(0);
  const [stars, setStars] = useState([]);

  // Iterates over screen in tenths. Creates a star at every stop with randomized color, 
  // size, and offset(to make their positions appear less uniform.)
  function generateStars() {
    let newStars = [];
    for(let x = xCoordinate; x < xCoordinate + 100; x+=10) {
      for(let y = yCoordinate; y < yCoordinate + 100; y+=10) {
        randomNumber = randomSeed.create(`${x}, ${y}`);
        let offset = randomNumber(30);
        let size = randomNumber(20);
        newStars.push(
          <Star 
            xPosition={x > 0 ? x - xCoordinate + offset : x + (-1 * xCoordinate) + offset} 
            yPosition={y > 0 ? y - yCoordinate + offset : y + (-1 * yCoordinate) + offset}
            size={size}
            color={generateColor()}
            seed={`${x}, ${y}`}
          />
        );
      }
     }
    setStars(newStars); 
  }

  // generateStars is called once the component is mounted, as well as whenever the coordinates change.
  React.useEffect(generateStars, [xCoordinate, yCoordinate]);

  // Arrow keys control the change of x and y. This is done by 10s in order to keep synchronous with nested for loops in generateStars.
  // Begins listening whenever the component is mounted.
  React.useEffect(() => {
    window.addEventListener('keydown', (e) => {  
      console.log('eventListener');
      switch(e.key) {
        case 'ArrowUp':
          setYCoordinate(y => y - 10);       
          break;
        case 'ArrowDown':
          setYCoordinate(y => y + 10);        
          break;
        case 'ArrowLeft':
          setXCoordinate(x => x - 10);
          break;
        case 'ArrowRight':
          setXCoordinate(x => x + 10);
          break;
        default:
      }
    })
  }, [])
   
  // Function that returns rgb values to be passed to each star component.
  function generateColor() {
    const red = randomNumber(255);
    const green = randomNumber(255);
    const blue = randomNumber(255);

    return {red: red, green: green, blue: blue};
  }

  return (
    <div className="App" id="target">  
      <p className="coordinates">{`${xCoordinate}, ${yCoordinate * -1}`}</p>
      {stars}
    </div>
  );
}

export default App;
