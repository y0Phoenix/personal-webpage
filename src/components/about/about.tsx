import { motion } from "framer-motion";
import { sectionNoShow, sectionShow, sectionShowTransition, } from "../configs/motion";
import aaron from '../../assets/istockphoto-1372353155-612x612.jpg';
import './about.css';

const About = () => {
    return (
        <motion.div id="about-me" initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className="about-main">
            <h1 className="header">About Me</h1>
            <div className="about-content">
                <div className="about">
                    <p>
                        I developed a passion for computers at a young age, giving me a natural advantage when it comes to understanding basic computer science.
                        I've always enjoyed tinkering with computer hardware and diving into computer code, finding it thrilling to unravel how things work.
                        Today, as a <i className="highlighted">Certified Full Stack Engineer</i>, I have successfully created numerous websites and completed various personal and school projects.
                        <br></br>
                        <br></br>
                        My journey began with the creation of <i className="highlighted">Smoothy</i>, a <i className="highlighted">Discord Music Bot</i> that I designed as a response to the shutdown of existing
                        Discord Music Bots. I built it using <i className="highlighted">Node.js</i> and leveraged the power of the <i className="highlighted">Discord.js</i> npm package. Smoothy interacts
                        with the Discord API, enabling it to send and receive messages and play music in voice channels.
                        Since then, my programming repertoire has expanded to include languages such as <i className="highlighted">C/C++, Java, and Rust</i>
                        <br></br>
                        <br></br>
                        While my primary focus lies in <i className="highlighted">web development</i>, I also derive great satisfaction from writing software for <i className="highlighted">games</i> and <i className="highlighted">embedded devices</i>.                        In truth, I enjoy crafting software of all kinds. There's an almost magical quality to engineering software that seamlessly works and serves a practical purpose.
                        It's like solving a perfect puzzle—while writing code, you constantly find yourself navigating the delicate balance between <i className="highlighted">design</i> and <i className="highlighted">functionality</i>, striving
                        for <i className="highlighted">performant</i> and <i className="highlighted">clean</i> code, and of course determining the right time for a bathroom break.
                    </p>
                </div>
            </div>
            <img src={aaron}></img>
        </motion.div>
    )
}

export default About;
