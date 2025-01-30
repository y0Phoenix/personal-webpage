/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import './contact.css';
import aaron from '../../assets/aaron.png';
import { normalButtonHover, sectionNoShow, sectionShow, sectionShowTransition, } from '../configs/motion';
import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

type EmailForm = {
    name: string,
    email: string,
    subject: string,
    message: string
}
type StatusMsg = {
    type: "error" | "success",
    msg: string,
    id: string
}

// TODO 
// 1 make red underline for fields that are required if an invalid submit is submitted
// 2 
const Contact = () => {
    const [formData, setFormData] = useState<EmailForm>({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [statusMsgs, setStatusMsgs] = useState<StatusMsg[]>([]);

    const removeStatusMsg = (id: string) => statusMsgs.filter(msg => msg.id == id ? null : msg);

    const onchange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("https://personal-webpage-back-end.herokuapp.com/api/email", formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const id = uuidv4();
            setStatusMsgs([...statusMsgs, { type: "success", msg: "Email Sent Successfully", id }]);
            setTimeout(removeStatusMsg, 7500, id);
        } catch (err: any) {
            const errors = err.response.data.errors;

            console.log(errors);
            if (errors) {
                errors.forEach((error: any) => {
                    const id = uuidv4();
                    setStatusMsgs([...statusMsgs, { type: "error", msg: error.msg, id }]);
                    setTimeout(removeStatusMsg, 7500, id);
                });
            }
        }
    }
    return (
        <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className="contact-main" id="contact">
            <h1 className='header'>Contact Me</h1>
            <div className='contact section'>
                <div className="input-container">
                    <form className="form-group" autoComplete="off" onSubmit={(e) => onsubmit(e)}>
                        <div className="name-email-container">
                            <div className="form-group">
                                <input type="text" id="name" name="name" className="input" placeholder="Name" onChange={(e) => onchange(e)}></input>
                            </div>
                            <div className="form-group">
                                <input type="email" id="email" name="email" className="input" placeholder="Email" onChange={(e) => onchange(e)}></input>
                            </div>
                        </div>
                        <div className="subject-container">
                            <div className="form-group">
                                <input type="text" id="subject" name="subject" className="input" placeholder="Subject" onChange={(e) => onchange(e)}></input>
                            </div>
                        </div>
                        <div className="message-container">
                            <div className="form-group">
                                <textarea id="message" name="message" className="input message" placeholder="Message" onChange={(e) => onchange(e)}></textarea>
                            </div>
                        </div>
                        <div className="submit-container">
                            <input className="submit-button" value="Submit" type='submit'></input>
                        </div>
                    </form>
                </div>
                <motion.div whileHover={normalButtonHover} className="image-container">
                    <img src={aaron} alt="My Picture"></img>
                </motion.div>
            </div>
        </motion.div>

    )
};

export default Contact;
