import React, { useState } from 'react';
import './styles.css';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import randomSeed from 'random-seed';
import Planet from './Planet';
import namegen from './namegen';

// These are the stars displayed in the App component.
function Star(props) {
    const [open, setOpen] = useState(false);
    const [planets, setPlanets] = useState([]);
    const [name, setName] = useState('');
    const xPosition = props.xPosition;
    const yPosition = props.yPosition;

    // Utility function to capitalize the names of the stars.
    function capitalizeFirstLetter(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    // Triggered when a star is clicked. Generates the planets and name of the star, as well as opens the modal window.
    function handleOpen() {
        setOpen(true);
        let randGen = randomSeed.create(props.seed)
        const numOfPlanets = randGen(5);
        let newPlanets = []
        for(let i = 0; i < numOfPlanets; i++) {
            randGen = randomSeed.create(props.seed + `, ${i}`)
            let speed = randGen.intBetween(10, 15);
            newPlanets.push(
                <Planet seed={props.seed + `, ${i}`} planetNumber={i} speed={speed} />
            )
        }
        setPlanets(newPlanets);
        setName(capitalizeFirstLetter(namegen(1, props.seed)[0]));
    }

    // Closes the modal window.
    function handleClose() {
        setOpen(false);
    }

    // This is the modal window that displays the star, the planets orbiting it, and the name.
    const modalBody = (
        <Grid container justify="center" alignItems="center" direction="column" className="modal">
            <Grid container direction="column" justify="center" alignItems="center">
                <h1>{name}</h1>
                <div className="star-planet" style={{marginTop: (35 * planets.length) + 'px', marginBottom: (35 * planets.length) + 'px'}}>
                    <div className="modal-star"></div>
                    {planets}
                </div>
             </Grid>
        </Grid>
    )

    return (
        <>
            <div 
                className="star" 
                style={{ 
                    left: xPosition + '%', 
                    top: yPosition + '%', 
                    width: props.size + 'px', 
                    height: props.size + 'px',
                    backgroundColor: `rgb(${props.color.red}, ${props.color.green}, ${props.color.blue})` 
                }}
                onClick={handleOpen}
            >
            </div>
            <Modal
                open={open}
                onClose={handleClose}    
            >
                {modalBody}
            </Modal>
        </>
    );
}

export default Star;