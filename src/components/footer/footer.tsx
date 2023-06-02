import { motion } from "framer-motion";
import { normalButtonHover, sectionNoShow, sectionShow, sectionShowTransition } from "../configs/motion";
import "./footer.css";

const Footer = () => {
    return (
        <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className="footer-main">
            <div className="footer-content">
                <motion.a whileHover={normalButtonHover} href="https://github.com/y0Phoenix">
                    <i className="fa-brands fa-github"></i>
                </motion.a>
                <motion.a whileHover={normalButtonHover} href="https://www.linkedin.com/in/aaron-graybill/">
                    <i className="fa-brands fa-linkedin"></i>
                </motion.a>
                <motion.a whileHover={normalButtonHover} href="https://twitter.com/y0Phoenix">
                    <i className="fa-brands fa-twitter"></i>
                </motion.a>
            </div>
            <p><span>&copy;</span> Aaron Graybill <span>2023</span></p>
        </motion.div>
    )
}

export default Footer;
