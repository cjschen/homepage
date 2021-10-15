import './App.css';
import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="welcome">
        <p>Please don't mind the mess, the website is still under construction.</p>
        <p>Here's a picture of me instead.</p>
      </div>
      <About />
      <Footer />
    </div>
  );
}

export default App;
