import github from '../res/github-logo.svg'
import linkedin from '../res/linkedin-logo.svg'
import FooterLogo from './FooterLogo'

export default function Footer() { 
    return (
        <div>
            <FooterLogo 
                src={github} 
                name='github' 
                url='https://github.com/cjschen/' />
            <FooterLogo 
                src={linkedin} 
                name='linkedin' 
                url='https://linkedin.com/in/cj-chen/' />
        </div>
    );   
}

