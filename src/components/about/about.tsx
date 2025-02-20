import { motion } from "framer-motion";
import { sectionNoShow, sectionShow, sectionShowTransition, } from "../configs/motion";
import aaron from '../../assets/aaron coding.png';
import './about.css';

const About = () => {
    return (
        <motion.div id="about-me" initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className="about-main">
            <h1 className="header">About Me</h1>
            <div className="about-content">
                <div className="about">
                    <p>
                        I developed a passion for computers at a young age, inspired by my family's strong presence in the tech field. With a Software Engineer father
                        and a computer engineering-savvy older brother, I was immersed in the world of technology from the start. Building computers and diving into computer
                        code became a thrilling pursuit, and I found immense satisfaction in creating something useful.
                        Today, as a <a href="https://certificates.emeritus.org/3d4b2857-645a-48b5-b2c8-b2eb680d0868#gs.1dzze3" className="highlighted">MIT Certified Full Stack Engineer</a>, I have successfully
                        crafted numerous websites and completed various personal and school projects.
                        {/* <br></br>
                        <br></br> */}
                        {/* My journey began with the creation
                        of <a href="https://github.com/y0phoenix/Smoothy" className="highlighted">Smoothy</a>, a <a href="https://discord.js.org/" className="highlighted">Discord Music Bot</a> that
                        I designed as a response to the shutdown of existing
                        Discord Music Bots. I built it using <a href="https://nodejs.org/en/about" className="highlighted">Node.js</a> and leveraged the power of the <a href="https://discord.js.org/" className="highlighted">Discord.js</a> npm package. Smoothy interacts
                        with the Discord API, enabling it to send and receive messages and play music in voice channels.
                        Since then, my programming repertoire has expanded to include languages such as <a href="https://github.com/y0phoenix" className="highlighted">C/C++, Java, and Rust</a>
                        <br></br>
                        <br></br>
                        While my primary focus lies in <a href="https://github.com/y0Phoenix" className="highlighted">web development</a>, I also derive great
                        satisfaction from writing software
                        for <a href="https://github.com/y0Phoenix" className="highlighted">games</a> and <a href="https://github.com/y0Phoenix" className="highlighted">embedded devices</a>.
                        In truth, I enjoy crafting software of all kinds. There's an almost magical quality to engineering software that seamlessly works and serves a practical purpose.
                        It's like solving a perfect puzzle—while writing code, you constantly find yourself navigating the delicate balance
                        between <a href="https://youtu.be/tv-_1er1mWI" className="highlighted">design</a> and <a href="https://youtu.be/tv-_1er1mWI" className="highlighted">functionality</a>, striving
                        for <a href="https://youtu.be/OtozASk68Os" className="highlighted">performant</a> and <a href="https://youtu.be/OtozASk68Os" className="highlighted">clean</a> code, and of course determining the right time for a bathroom break. */}
                    </p>
                </div>
            </div>
            <img src={aaron}></img>
        </motion.div>
    )
}

export default About;
