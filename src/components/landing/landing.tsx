import { useEffect, useState } from 'react';
import './landing.css';
import { motion } from 'framer-motion';
import { landingHeaderDelay, noShow, show } from '../configs/motion';

const VIDEO_WIDTH = 560;
const VIDEO_HEIGHT = 315;

const Landing = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowSize(window.innerWidth);

        window.addEventListener("resize", () => handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    const videoHeight = (windowSize / 1000) * VIDEO_HEIGHT;
    const videoWidth = (windowSize / 1000) * VIDEO_WIDTH;
    console.log(videoHeight, videoWidth);

    const header = "Hi I'm Aaron. I am a Certified Full Stack Engineer.\nPlease Enjoy my Website :)";
    let letterCount = 0;

    return (
        <div className='video-main'>
            <h1 className='header landing-header'>
               {header.split("").map(str => {
                   letterCount += 0.05;
                    return (
                        <motion.span initial={noShow} animate={show} transition={{delay: letterCount + landingHeaderDelay}}>
                            {str}
                        </motion.span>
                    )
                })}
            </h1>
            <div className="video section">
                <iframe width={videoWidth} height={videoHeight} src="https://www.youtube.com/embed/NqfQgthE0O8" title="YouTube video player" 
                   frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                </iframe>
            </div>
        </div>
    )
}

export default Landing;
