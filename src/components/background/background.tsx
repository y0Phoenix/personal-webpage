import { SQUARE_COUNT, Polygons} from '../configs/background';
import './background.css';
import { useEffect, useState } from 'react';

const Background = () => {
    const [squares, setSquares] = useState<Polygons>();
    useEffect(() => {
        const squares = new Polygons();
        setSquares(squares);
        const squareElements = document.getElementsByName("square");
        const interval = setInterval(() => {
            squares.update(squareElements); 
            setSquares(squares); 
        }, 50);
        return () => clearInterval(interval);
    }, []);
    return (
       <>
            {(squares && squares.polygons.length == SQUARE_COUNT) && squares.polygons.map(square => {
                const {angle, rect, size, id} = square;
                const gradient = Math.round(Math.random()) + 1;
                return (
                    <div className={`square square-gradient-${gradient}`}
                        style={{
                            rotate: `${angle}deg`,
                            height: `${size}vw`,
                            width: `${size}vw`,
                            top: `${rect.top}vw`,
                            left: `${rect.left}vw`
                        }} name='square' id={id} 
                    ></div>
                )
            })}
       </> 
    )
}

export default Background;
