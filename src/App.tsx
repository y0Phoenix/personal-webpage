import Header from './components/header/header';
import './App.css'
import About from './components/about/about';
import Projects from './components/projects/projects';

function App() {
    return (
        <>
            <div className='main'>
                <Header />
                <About />
                <Projects />
            </div>
        </>
    )
}

export default App;
