import { motion } from 'framer-motion';
import './projects.css';
import { projectHover } from '../configs/motion';

const Projects = () => {
    return (
        <div className="projects-main">
            <h1 className='header'>Projects</h1>
            <div className='projects-content'>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{opacity: 0}} whileHover={{opacity: 1}}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button'whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{opacity: 0}} whileHover={{opacity: 1}}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button'whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{opacity: 0}} whileHover={{opacity: 1}}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button'whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{opacity: 0}} whileHover={{opacity: 1}}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button' whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Projects;
