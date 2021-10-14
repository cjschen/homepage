import './App.css';
import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="welcome">
        <p>Welcome to my website! It's still under construction</p>
        <p>Built using react and deployed on a heroku pod</p>
      </div>
      <About />
      <Footer />
    </div>
  );
}

export default App;
