
import './App.css';
import Home from './components/Home'
import Blog from './components/Blog'
import Footer from './components/Footer'
import avatar from './res/avatar-grey.png'
import jellyfish from './res/jellyfish.svg'
import construction from './res/construction.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">
          <div className="header-container">
            <img className="logo jellyfish" src={jellyfish} alt="jellyfish from stockio.com" />
            <div className="welcome">
              <h1> CreativeJellyfish</h1>
              <h2> Powered by React and Heroku</h2>
            </div>
            <img className="logo" src={avatar} alt="profile" />
          </div>
        </div>


        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
        </ul>
        </nav>
        <img src={construction} alt="construction" style={{"maxWidth":"300px"}}/> 
        <p>Please excuse the mess, the website is still under construction and doesn't quite work on mobile.</p>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>

  )
}

export default App;
