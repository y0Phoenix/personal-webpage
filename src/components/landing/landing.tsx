import './landing.css';
import { motion } from 'framer-motion';
import { headerDelay, headerDelayInc, noShow, show, } from '../configs/motion';

const Landing = () => {
    const header = `Hi 👋  I'm Aaron. I am a Certified Full Stack Engineer 🧑‍💻  Please Enjoy my Website 🙂`;
    // const header = `Hi I'm Aaron Graybill. I am an MIT Certified Full Stack Engineer Please Enjoy my Website`;

    const fadedHeader: JSX.Element[] = [];
    let emoji = "";
    for (let i = 0; i < header.length; i++) {
        let str = header[i];
        if (str.charCodeAt(0) > 255) emoji += str;
        else {
            str += emoji;
            emoji = "";
            fadedHeader.push(
                <motion.span key={i} initial={noShow} animate={show} transition={{ delay: headerDelay.delay + (i * headerDelayInc) }}>{str}</motion.span>
            )
        }
    }
    // if there was an emoji at the end of the string
    if (emoji.length > 0) fadedHeader.push(<motion.span key={header.length} initial={noShow} animate={show} transition={{ delay: headerDelay.delay + (header.length * headerDelayInc) }}>{emoji}</motion.span>);

    //! old personal video I made for school don't use lol
    // const video = <motion.div initial={sectionNoShow} whileInView={sectionShow} transition={sectionShowTransition} viewport={{ once: true }} className='video-main-container'>
    //     <div className='video-main section'>
    //         <div className="video-container">
    //             <iframe className='video' /** width={videoRes.width} height={videoRes.height} **/ src="https://www.youtube.com/embed/NqfQgthE0O8" title="YouTube video player"
    //                 frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen>
    //             </iframe>
    //         </div>
    //     </div>
    // </motion.div>;

    return (
        <div className='landing-main' id="landing">
            <h1 id="landing-header" className='header landing-header'>{fadedHeader}</h1>
            {/* {video} */}
        </div>
    )
}

export default Landing;
