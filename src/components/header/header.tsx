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

    const handleClick = (e: any, id: string) => {
        e.preventDefault();
        if (id == "#landing") return window.scrollTo({
            top: -100,
            behavior: "smooth"
        })
        document.querySelector(id)?.scrollIntoView({
            behavior: "smooth"
        })
    }

    return (
        <AnimatePresence>
            <motion.div initial={noShow} animate={show} transition={headerDelay} className='header-main'>
                <motion.div whileHover={headerButtonHover} onClick={(e) => handleClick(e, "#landing")}>
                    <img src={logo} className="logo"></img>
                </motion.div>
                {showLinks &&
                    < motion.div className='header-links' initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, type: "spring" }}>
                        <motion.button whileHover={headerButtonHover} className='header-button' onClick={(e) => handleClick(e, "#about-me")}>
                            About Me
                        </motion.button>
                        <motion.button whileHover={headerButtonHover} className='header-button' onClick={(e) => handleClick(e, "#projects")}>
                            Projects
                        </motion.button>
                        <motion.button whileHover={headerButtonHover} className='header-button' onClick={(e) => handleClick(e, "#contact")}>
                            Contact Me
                        </motion.button>
                    </motion.div>
                }
            </motion.div >
        </AnimatePresence >
    )
}

export default Header; 
