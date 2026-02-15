
import './App.css';
import AprilFools from './components/AprilFools'
import Home from './components/Home'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Footer from './components/Footer'
import avatar from './res/avatar-grey.png'
import jellyfish from './res/jellyfish.svg'
import construction from './res/construction.png'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
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
              <h2> Powered by React and Github</h2>
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
              <Link to="/blogs">Blog</Link>
            </li>
          </ul>
        </nav>
        <img src={construction} alt="construction" style={{ "maxWidth": "300px" }} />
        {/* <div className="section center-text"> <p>Welcome to my blog!</p> <p>I write about Test Automation and my experience as a female engineer and immigrant. My posts are entirely my own and do not reflect the views of my employer or anyone else.</p>
        </div> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blog-posts/1" element={<AprilFools />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>

  )
}

export default App;
