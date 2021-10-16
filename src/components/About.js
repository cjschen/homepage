import profile from '../res/profile.jpg'

export default function About() {
    return ( <div>
    <h1 className="section-header"> About Me</h1>
    <div className="section about-me">
        <img src={profile} alt={profile} className="profile" />
        <div>
            <p>I'm CJ Chen and I'm an Automation Platform Engineer at Autodesk.</p>
            <p>Born in Shanghai, raised in Bonn and Toronto. Currently based out of San Francisco</p>
            <p>Experience with Python, React, Cypress, CI/CD and somewhat in Selenium</p>
            <p>I am passionate about good testing practices</p>
        </div>
    </div>
    </div>)
}
