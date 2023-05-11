import { motion } from "framer-motion";
import { headerButtonHover, sectionNoShow, sectionShow, sectionShowTransition, } from "../configs/motion";
import aaron from '../../assets/istockphoto-1372353155-612x612.jpg';
import './about.css';

const About = () => {
    return (
        <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} className="about-main">
            <h1 className="header">About Me</h1>
            <div className="about-content">
                <div className="about">
                    <p>
                        I grew up working with computers and playing video games, so When it came to understanding basic computer science I had a small 
                        advantage. Although most of my time was spent playing games I made YouTube videos, kind of embarrassing, however making videos 
                        and thumbnails taught me alot about graphics, process and vision. 
                        <br></br>
                        <br></br>
                        I started out by making Smoothy as an answer to the <i className="highlighted">Discord Music Bots</i> getting 
                        shutdown. It is built with <i className="highlighted">Node</i> and an npm package called <i className="highlighted">Discord.js</i>. It communicates with the <i className="highlighted">Discord API</i> to 
                        send and recieve messages and play music in voice channels. Not long after I started that project 
                        I enrolled in a <i className="highlighted">Full Stack Bootcamp</i>. I am now a passionate developer who has worked with <i className="highlighted">Linux</i> and even <i className="highlighted">Microcontrollers</i> running 
                        binary <i className="highlighted">C++</i> code, ontop of being a <i className="highlighted">Web Developer</i> I have learned so much in my short "dev age".
                    </p>
                </div>
            </div>
            <img src={aaron}></img> 
        </motion.div>
    )
}

export default About;
