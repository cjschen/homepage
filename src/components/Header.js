import avatar from '../res/avatar-grey.png'


export default function Header() {
    return (
        <div className="header">
            <img className="logo" src={avatar} alt="profile"/>
            <div class="welcome">
                <h1> Welcome to my Website</h1>
                <h2> Powered by React and Heroku</h2>
            </div>
        </div>
    )};
