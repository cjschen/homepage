import resume from './data/resume.json'
import About from './About'

export default function Resume() {
    return <div className="resume">
        <About profile="small"/>
        <Section json={resume} />
    </div>
}

function Section() {

    return <div className='work'>
        <h2 className='section-header'>Work Experiences</h2>
        {resume.work.map(workExperience => {
            return <div className='section experience'>
                <div>{workExperience.title} - {workExperience.employer} ({workExperience.dates})</div>
                <ul>
                    {workExperience.experience.map(e => <li>{e}</li>)}
                </ul>
            </div>
        })}
    </div>


}