import './App.css';
import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="welcome">
        <p>Please excuse the mess, the website is still under construction and doesn't quite work on mobile.</p>
      </div>
      <About />
      <Footer />
    </div>
  );
}

export default App;
