import { motion } from 'framer-motion';
import './projects.css';
import { noShow, projectHover, sectionNoShow, sectionShow, sectionShowTransition, show, } from '../configs/motion';
import React, { useState } from 'react';

type ProjectProps = {
    title: string,
    desc: string,
    img: string,
    url: string
}

const Project: React.FC<ProjectProps> = ({ title, desc, img, url }) => {
    const [showDesc, setShowDesc] = useState(false);
    const handleClick = () => setShowDesc(!showDesc);
    return (
        <motion.div whileHover={projectHover} className="project">
            <div className="project-title">{title}</div>
            <img className="project-img" src={img}></img>
            <motion.div className="project-hover" initial={noShow} animate={showDesc ? show : noShow} whileHover={show} onTouchEnd={() => handleClick()}>
                <p className="project-text">{desc}</p>
                <motion.a className="project-button" href={url} whileHover={projectHover}>Learn More</motion.a>
            </motion.div>
        </motion.div>
    )
}

const Projects = () => {
    return (
        <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className="projects-main" id="projects">
            <h1 className='header'>Projects</h1>
            <div className='projects-content section'>
                <Project title="Smoothy"
                    img="https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true"
                    desc="A feature rich Discord Music Bot built with Node and Discordjs"
                    url="https://github.com/y0Phoenix/Smoothy"
                />
                <Project title="Reciger"
                    img="https://github.com/y0Phoenix/Reciger/blob/development/src/pictures/logo-art-normal.png?raw=true"
                    desc="Personal Recipe Management Platform"
                    url="https://reciger.com"
                />
                <Project title="Smoothy"
                    img="https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true"
                    desc="A feature rich Discord Music Bot built with Node and Discordjs"
                    url="https://github.com/y0Phoenix/Smoothy"
                />
                <Project title="Smoothy"
                    img="https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true"
                    desc="A feature rich Discord Music Bot built with Node and Discordjs"
                    url="https://github.com/y0Phoenix/Smoothy"
                />
                <Project title="Smoothy"
                    img="https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true"
                    desc="A feature rich Discord Music Bot built with Node and Discordjs"
                    url="https://github.com/y0Phoenix/Smoothy"
                />
                <Project title="Smoothy"
                    img="https://github.com/y0Phoenix/Smoothy/blob/development/pictures/Smoothy%20Logo.png?raw=true"
                    desc="A feature rich Discord Music Bot built with Node and Discordjs"
                    url="https://github.com/y0Phoenix/Smoothy"
                />
            </div>
        </motion.div>
    )
}

export default Projects;
