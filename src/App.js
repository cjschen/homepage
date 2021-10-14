import logo from './logo.svg';
import './App.css';
import About from './components/About'

function App() {
  return (
    <div className="App">
      <div className="welcome-banner">
        <p>Welcome to my website! It's built using react and deployed on a heroku pod</p>
      </div>
      <About />
    </div>
  );
}

export default App;
