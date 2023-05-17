import { useState } from 'react'
import logo from '../../assets/logo.png'
import { headeLinksShow, headerButtonHover, headerLinksNoShow, headerLinksTransition, headerMainNormal, headerMainSmall, headerMainVertical, logoNormal, logoSmall, } from '../configs/motion'
import './header.css'
import { AnimatePresence, motion } from 'framer-motion'


const Header = () => {
    const [hideLinks, setHideLinks] = useState(false);
    const [showLinks, setShowLinks] = useState(true);
    let [inAnimation, setInAnimation] = useState(false);

    const handleShowLinks = (state: boolean) => {
        if (!inAnimation) {
            setInAnimation(true);
            inAnimation = true
            setTimeout(() => setInAnimation(false), headerLinksTransition.duration * 850);
            setShowLinks(state);
            if (state) setHideLinks(false);
            else setHideLinks(true);
        }
    }

    const hidePos = 200;
    window.addEventListener("scroll", () => {
        const isVertical = document.body.clientWidth <= 800;
        if (!inAnimation) {
            if (window.scrollY > hidePos && showLinks && isVertical) handleShowLinks(false);
            else if (window.scrollY < hidePos && !showLinks && isVertical) handleShowLinks(true);
        }
    });

    const handleClick = (e: any, id: string) => {
        e.preventDefault();
        if (id == "#landing") return window.scrollTo({
            top: -300,
            left: 0,
            behavior: "smooth"
        })
        window.scrollBy({
            top: 600,
            left: 0,
            behavior: "smooth"
        });
        setTimeout(() => window.scrollBy({ top: -150, left: 0, behavior: "smooth" }), 300);
        setTimeout(() => document.querySelector(id)?.scrollIntoView({
            behavior: "smooth"
        }), headerLinksTransition.duration * 650);
    }

    const isVertical = document.body.clientWidth <= 800;

    return (
        <AnimatePresence>
            <motion.div initial={headerMainNormal} animate={isVertical ? showLinks ? headerMainVertical : headerMainSmall : headerMainNormal} transition={{ duration: 1, type: "spring", stiffness: 50 }} className='header-main'>
                <motion.div whileHover={headerButtonHover} onClick={(e) => handleClick(e, "#landing")}>
                    <motion.img src={logo} className="logo" initial={logoNormal} animate={showLinks ? logoNormal : logoSmall} transition={{ duration: 1, type: "spring", stiffness: 50 }}></motion.img>
                </motion.div>
                < motion.div className='header-links' initial={headeLinksShow} animate={showLinks ? headeLinksShow : headerLinksNoShow} exit={headerLinksNoShow} transition={headerLinksTransition}>
                    <motion.button whileHover={headerButtonHover} className={`header-button${!hideLinks ? "" : " no-pointer"}`} onClick={(e) => handleClick(e, "#about-me")}>
                        About Me
                    </motion.button>
                    <motion.button whileHover={headerButtonHover} className={`header-button${!hideLinks ? "" : " no-pointer"}`} onClick={(e) => handleClick(e, "#projects")}>
                        Projects
                    </motion.button>
                    <motion.button whileHover={headerButtonHover} className={`header-button${!hideLinks ? "" : " no-pointer"}`} onClick={(e) => handleClick(e, "#contact")}>
                        Contact Me
                    </motion.button>
                </motion.div>
            </motion.div >
        </AnimatePresence >
    )
}

export default Header; 
