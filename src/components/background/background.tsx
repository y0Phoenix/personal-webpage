import { motion } from 'framer-motion';
import { squares } from '../configs/background';
import './background.css';
import { noShow, show } from '../configs/motion';

const Background = () => {
    return (
       <>
            {squares.map(square => {
                const {rotate, top, right, size, delay} = square;
                return <motion.div className='square' style={{rotate, top, right, height: size, width: size}} initial={noShow} animate={show} transition={{delay}}></motion.div>
            })}
       </> 
    )
}

export default Background;
