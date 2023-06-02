import { useState } from 'react'
import logo from '../../assets/logo.png'
import { headeLinksShow, headerButtonHover, headerLinksNoShow, headerLinksTransition, headerMainNormal, headerMainSmall, headerMainVertical, logoNormal, logoSmall, } from '../configs/motion'
import './header.css'
import { AnimatePresence, motion } from 'framer-motion'

type Animation = "open" | "close";

const Header = () => {
    const [animation, setAnimation] = useState<Animation>("open");
    const [isVertical, setIsVertical] = useState(window.innerWidth <= 800);

    const handleClose = () => setAnimation("close");

    const handleOpen = () => setAnimation("open");

    const isOpen = () => animation == "open";

    const hidePos = 30;
    window.addEventListener("scroll", () => {
        const isVertical = document.body.clientWidth <= 800;
        const showPos = window.scrollY > hidePos;
        if (isVertical) {
            if (showPos && animation == "open") handleClose();
            else if (!showPos && animation == "close") handleOpen();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth <= 800 && !isVertical) setIsVertical(true);
        else if (window.innerWidth > 800 && isVertical) {
            setIsVertical(false);
            setAnimation("open");
        }
    })

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
        e.preventDefault();
        if (id == "landing") return window.scrollTo({
            top: -300,
            left: 0,
            behavior: "smooth"
        })
        window.scrollBy({
            top: 1000,
            left: 0,
            behavior: "smooth"
        });
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        // setTimeout(() => window.scrollBy({ top: -150, left: 0, behavior: "smooth" }), 400);
        // setTimeout(() => document.getElementById(id)?.scrollIntoView({
        //     behavior: "smooth"
        // }), headerLinksTransition.duration * 2500);
    }

    return (
        <AnimatePresence>
            <motion.div initial={headerMainNormal} animate={isVertical ? isOpen() ? headerMainVertical : headerMainSmall : headerMainNormal} transition={headerLinksTransition} className='header-main'>
                <motion.button className='border-none bg-transparent' whileHover={headerButtonHover} onClick={(e) => handleClick(e, "landing")}>
                    <motion.img src={logo} className="logo" initial={logoNormal} animate={isOpen() ? logoNormal : logoSmall} transition={headerLinksTransition}></motion.img>
                </motion.button>
                {isOpen() &&
                    < motion.div className='header-links' initial={headeLinksShow} animate={isOpen() ? headeLinksShow : headerLinksNoShow} exit={headerLinksNoShow} transition={headerLinksTransition}>
                        <motion.button whileHover={headerButtonHover} className={`header-button${isOpen() ? "" : " no-pointer"}`} onClick={(e) => handleClick(e, "about-me")}>
                            About Me
                        </motion.button>
                        <motion.button whileHover={headerButtonHover} className={`header-button${isOpen() ? "" : " no-pointer"}`} onClick={(e) => handleClick(e, "projects")}>
                            Projects
                        </motion.button>
                        <motion.button whileHover={headerButtonHover} className={`header-button${isOpen() ? "" : " no-pointer"}`} onClick={(e) => handleClick(e, "contact")}>
                            Contact Me
                        </motion.button>
                    </motion.div>
                }
            </motion.div >
        </AnimatePresence >
    )
}

export default Header; 
