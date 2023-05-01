import Header from './components/header/header';
import './App.css'
import About from './components/about/about';
import Projects from './components/projects/projects';
import Contact from './components/contact/contact';
import Background from './components/background/background';

function App() {
    return (
        <>
            <Background />
            <div className='main'>
                <Header />
                <About />
                <Projects />
                <Contact />
            </div>
        </>
    )
}

export default App;
