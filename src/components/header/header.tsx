import { useState } from 'react'
import logo from '../../assets/logo.png'
import { headerButtonHover, headerDelay, noShow, show } from '../configs/motion'
import './header.css'
import { AnimatePresence, motion } from 'framer-motion'

const Header = () => {
    const [showLinks, setShowLinks] = useState(true);
    const hidePos = 200;
    window.addEventListener("scroll", () => {
        const isVertical = document.body.clientWidth <= 800;
        if (window.scrollY > hidePos && showLinks && isVertical) setShowLinks(false);
        else if (window.scrollY < hidePos && !showLinks && isVertical) setShowLinks(true);
    });

    return (
        <motion.div initial={noShow} animate={show} transition={headerDelay} className='header-main'>
            <motion.img whileHover={headerButtonHover} src={logo} className='logo'></motion.img>
            <AnimatePresence>
                {showLinks &&
                    < motion.div className='header-links' initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, type: "spring" }}>
                        <motion.a whileHover={headerButtonHover} className='header-button' href='#about-me'>
                            About Me
                        </motion.a>
                        <motion.a whileHover={headerButtonHover} className='header-button' href='#projects'>
                            Projects
                        </motion.a>
                        <motion.a whileHover={headerButtonHover} className='header-button' href='#contact'>
                            Contact Me
                        </motion.a>
                    </motion.div>
                }
            </AnimatePresence >
        </motion.div >
    )
}

export default Header; 
