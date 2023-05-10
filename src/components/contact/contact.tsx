import { motion } from 'framer-motion';
import './contact.css';
import aaron from '../../assets/aaron.png';
import { normalButtonHover, sectionNoShow, sectionShow, sectionShowTransition, } from '../configs/motion';

// TODO 
// 1 make red underline for fields that are required if an invalid submit is submitted
// 2 

const Contact = () => {
    return (
        <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} className="contact-main">
            <h1 className="header">Contact Me</h1>
            <div className='contact-content section'>
                <form className='contact-form'>
                    <div className='flex row gap-xsm'>
                        <input placeholder='Name' className='input email input-small'/>
                        <input placeholder='Email' className='input email input-small'/>
                    </div>
                    <input placeholder='Subject' className='input subject'/>
                    <textarea placeholder='Message' className='input message'></textarea>
                    <input className='submit-button' value='Submit'/>
                </form> 
                <motion.img whileHover={normalButtonHover} src={aaron} className="aaron"></motion.img> 
            </div>
        </motion.div>
    )
};

export default Contact;
