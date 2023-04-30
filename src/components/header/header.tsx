import logo from '../../assets/logo.png'
import { headerButtonHover, headerDelay, noShow, show } from '../configs/motion'
import './header.css'
import {motion} from 'framer-motion'

const Header = () => {
    return (
        <motion.div initial={noShow} animate={show} transition={headerDelay} className='header-main'>
            <motion.img whileHover={headerButtonHover} src={logo} className='logo'></motion.img>
            <div className='header-links'>
                <motion.a whileHover={headerButtonHover} className='header-button' href='#about-me'>
                    About Me
                </motion.a>
                <motion.a whileHover={headerButtonHover} className='header-button' href='#projects'>
                    Projects
                </motion.a>
                <motion.a whileHover={headerButtonHover} className='header-button' href='#contact'>
                    Contact Me
                </motion.a>
            </div>
        </motion.div>
    )
}

export default Header; 
