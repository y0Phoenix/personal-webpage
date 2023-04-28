import { motion } from "framer-motion";
import { headerButtonHover } from "../configs/motion";
import aaron from '../../assets/aaron.png';
import './about.css';

const About = () => {
    return (
        <div className="about-main">
            <h1 className="header">About Me</h1>
            <div className="about-content">
                <div className="about">
                    <p>
                        I grew up working with computers and playing video games, so When it came to understanding basic computer science I had a small 
                        advantage. Although most of my time was spent playing games I made YouTube videos, kind of embarrassing, however making videos 
                        and thumbnails taught me alot about graphics, process and vision. 
                        <br></br>
                        <br></br>
                        I started out by making Smoothy as an answer to the 
                        Discord Music Bots getting shutdown. It is built with Node and an npm package called Discord.js. It communicates with the 
                        Discord API to send and recieve messages and play music in voice channels. Not long after I started that project I enrolled in a 
                        Full Stack Bootcamp. I am now a passionate developer who has worked with Linux and even Microcontrollers running binary C++ code, 
                        ontop of being a Web Developer I have learned so much in my short "dev age".
                    </p>
                </div>
                <div className="about">
                    <motion.img whileHover={headerButtonHover} src={aaron} className="aaron"></motion.img> 
                </div>
            </div>
        </div>
    )
}

export default About;
