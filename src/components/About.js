import profile from '../profile.jpg'

export default function About() {
    return (
    <div className="about-me">
        <img src={profile} alt={profile} className="profile" />
        <p>I'm CJ Chen and I'm an Automation Platform Engineer at Autodesk.</p>
        <p>Born in Shanghai, raised in Bonn and Toronto. Currently based out of San Francisco</p>
    </div>)
}
