import Header from './components/header/header';
import './App.css'
import About from './components/about/about';
import Projects from './components/projects/projects';
import Contact from './components/contact/contact';
import Background from './components/background/background';
import Landing from './components/landing/landing';

function App() {
    return (
        <>
            <div className='main'>
                <Landing />
                <Header />
                <About />
                <Projects />
                <Contact />
            </div>
            <Background />
        </>
    )
}

export default App;
