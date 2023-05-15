import { motion } from 'framer-motion';
import './projects.css';
import { projectHover, sectionNoShow, sectionShow, sectionShowTransition, } from '../configs/motion';

const Projects = () => {
    return (
        <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className="projects-main" id="projects">
            <h1 className='header'>Projects</h1>
            <div className='projects-content section'>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button' whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button' whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button' whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button' whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button' whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>
                <motion.div whileHover={projectHover} className='project'>
                    <div className='project-title'>
                        Smoothy
                    </div>
                    <img className='project-img' src='https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true'></img>
                    <motion.div className='project-hover' initial={{ opacity: 0 }} whileHover={{ opacity: 1 }}>
                        <p className='project-text'>A feature rich Discord Music Bot built with Node and Discordjs</p>
                        <motion.a className='project-button' whileHover={projectHover}>Learn More</motion.a>
                    </motion.div>
                </motion.div>

            </div>
        </motion.div>
    )
}

export default Projects;
