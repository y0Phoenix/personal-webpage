import { motion } from 'framer-motion';
import './contact.css';
import aaron from '../../assets/aaron.png';
import { normalButtonHover, sectionNoShow, sectionShow, sectionShowTransition, } from '../configs/motion';

// TODO 
// 1 make red underline for fields that are required if an invalid submit is submitted
// 2 

const Contact = () => {
    return (
        <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className="contact-main" id="contact">
            <h1 className='header'>Contact Me</h1>
            <div className='contact section'>
                <div className="input-container">
                    <form className="form-group" autoComplete="off">
                        <div className="name-email-container">
                            <div className="form-group">
                                <input type="text" id="name" name="name" className="input" placeholder="Name"></input>
                            </div>
                            <div className="form-group">
                                <input type="email" id="email" name="email" className="input" placeholder="Email"></input>
                            </div>
                        </div>
                        <div className="subject-container">
                            <div className="form-group">
                                <input type="text" id="subject" name="subject" className="input" placeholder="Subject"></input>
                            </div>
                        </div>
                        <div className="message-container">
                            <div className="form-group">
                                <textarea id="message" name="message" className="input message" placeholder="Message"></textarea>
                            </div>
                        </div>
                        <div className="submit-container">
                            <input className="submit-button" value="Submit"></input>
                        </div>
                    </form>
                </div>
                <motion.div whileHover={normalButtonHover} className="image-container">
                    <img src={aaron} alt="Your image"></img>
                </motion.div>
            </div>
        </motion.div>

    )
};

export default Contact;
