import { useEffect, useState } from 'react';
import './landing.css';
import { motion } from 'framer-motion';
import { landingHeaderDelay, noShow, sectionNoShow, sectionShow, sectionShowTransition, show } from '../configs/motion';

const VIDEO_WIDTH = 560;
const VIDEO_HEIGHT = 315;

type VideoRes = {
    height: number,
    width: number
}

const videoWidth = () => (window.innerWidth / 1000) * VIDEO_WIDTH;
const videoHeight = () => (window.innerWidth / 1000) * VIDEO_HEIGHT;

const Landing = () => {
    // const [videoRes, setVideoRes] = useState<VideoRes>({
    //     height: videoHeight(),
    //     width: videoWidth() 
    // });
    //
    // window.addEventListener("resize", (e) => {
    //     console.log("resize");
    //     setVideoRes({
    //         height: videoHeight(),
    //         width: videoWidth()
    //     });
    // });

    // useEffect(() => {
    //     const handleResize = () => setWindowSize(window.innerWidth);
    //
    //     window.addEventListener("resize", () => handleResize);
    //
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    const header = "Hi 👋 I'm Aaron. I am a Certified Full Stack Engineer 👨‍💻\nPlease Enjoy my Website 🙂";
    let letterCount = 0;

    return (
        <div className='landing-main' id="landing">
            <h1 className='header landing-header'>
                {header.split("").map((str, i) => {
                    letterCount += 0.05;
                    return (
                        <motion.span key={str + i} initial={noShow} animate={show} transition={{ delay: letterCount + landingHeaderDelay }}>
                            {str}
                        </motion.span>
                    )
                })}
            </h1>
            <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className='video-main-container'>
                <div className='video-main section'>
                    <div className="video-container">
                        <iframe className='video' /** width={videoRes.width} height={videoRes.height} **/ src="https://www.youtube.com/embed/NqfQgthE0O8" title="YouTube video player"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Landing;
