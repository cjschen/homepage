import profile from '../res/profile.jpg'

export default function About(props) {
    return (
        <div>
            <h1 className="section-header"> About Me</h1>
            <div className="section about-me">
                <img src={profile} alt={profile} className={`profile ${props.profile}`} />
                <div>
                    <p>I'm CJ Chen and I'm an Automation Platform Engineer at Autodesk.</p>
                    <p>Born in Shanghai, raised in Bonn and Toronto. Currently based out of San Francisco</p>
                    <p>Experienced in Python App Development, Postgress, React, Cypress, CI/CD and AWS Services</p>
                </div>
            </div>
        </div>)
}
