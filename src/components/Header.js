import avatar from '../res/avatar-grey.png'
import jellyfish from '../res/jellyfish.svg'

export default function Header() {
    return (
        <div className="header">
            <div className="header-container">
                <img className="logo jellyfish" src={jellyfish} alt="jellyfish from stockio.com"/>
                <div className="welcome">
                    <h1> CreativeJellyfish</h1>
                    <h2> Powered by React and Heroku</h2>
                </div>
                <img className="logo" src={avatar} alt="profile"/>
            </div>
        </div>
    )};
