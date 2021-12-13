import { LinksFunction } from "remix";

import modalCss from "~/styles/modal.css";
import { full_stack_projects } from "~/projects";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: modalCss }];
};


export default function Projects() {

    return (
        <div className='container column' style={{ paddingBottom: '5vh'}}>
            <h1>Projects</h1>
            {/* <CreateJobModal /> */}
            <h2 style={{ alignSelf: 'flex-start', fontSize: '2.5rem', paddingLeft: '2em'}}>Full Stack</h2>
            {full_stack_projects.map((project, index) => (
                <div className='container column' key={index} style={{ padding: '2rem', gap: '1vh', alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                    <div className={'container row'} style={{flexDirection: index % 2 === 0 ? 'row-reverse' : 'row', gap: '2rem'}}>
                        <div className='container column' style={{ gap: '1vh'}}>
                            <h2 style={{ fontSize: '2.5rem'}}>{project.name}</h2>
                            <p>{project.description}</p>
                            <div className='container row' style={{ gap: '1vh'}}>
                                <a href={project.github} rel='noopener noreferrer' target="_blank">Github</a>
                                <a href={project.live} rel='noopener noreferrer' target="_blank">Live</a>
                            </div>
                        </div>
                        <div className='container'>
                            <img className='image fit' src={project.image} alt={project.name} />
                        </div>
                    </div>
                    <div className='container' style={{backgroundColor: 'white'}}>
                        {project.tech?.map((tech, index) => (
                            <img src={tech} alt={tech} key={index} />
                        ))}
                    </div>
                    
                </div>
            ))}
        </div>
    );
}
