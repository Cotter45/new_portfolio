import { LinksFunction, MetaFunction } from "remix";
import { useEffect } from 'react';


import modalCss from "~/styles/modal.css";
import projectStyles from "~/styles/projects.css";
import { full_stack_projects, frontend_projects } from "~/projects";
import useWindowSize from "~/utils/window-size";
import ProjectModal from "~/modals/project_modal";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: modalCss }, { rel: "stylesheet", href: projectStyles }];
};

export let meta: MetaFunction = () => {
  return {
    title: "Projects",
    description: "Check out my stuff!",
    name: "apple-mobile-web-app-capable",
    content: "yes",
  };
};

export default function Projects() {
    const size = useWindowSize();

    useEffect(() => {
      const timeout = setTimeout(function () {
        // Hide the address bar!
        window.scrollTo(0, 1);
      }, 0);

      return () => clearTimeout(timeout);
    });

    return (
        <div className='container column' style={{ paddingBottom: '50px' }}>
            <div className='container projects'>
                <h2 className='project_header'>Full Stack</h2>
                {full_stack_projects.map((project, index) => (
                    <div className='container column project' key={index} style={{ alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                        <div className={size.width > 1000 ? 'container row' : 'container'} style={{flexDirection: index % 2 === 0 ? 'row-reverse' : 'row', gap: '2rem'}}>
                            <div className={index % 2 === 0 ? 'container column text slantRight' : 'container column text slantLeft'}>
                                <h2>{project.name}</h2>
                                <ul className="icons" style={{ gap: '2vw' }}>
                                    <li><a target="_blank" rel="noopener noreferrer" href={project.github} className="icon brands"><i className="fab fa-github fa-3x"></i><span className="label">Github</span></a></li>
                                    <li><a target="_blank" rel="noopener noreferrer" href={project.live} className="icon brands"><i className="fas fa-globe fa-3x"></i><span className="label">Live</span></a></li>
                                    <ProjectModal project={project} />
                                </ul>
                                <div className='container medium tech'>
                                    {project.tech?.map((tech, index) => (
                                        <div className='tech' key={index}>
                                            <img loading='lazy' src={tech} alt={'Tech'} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='container'>
                                <img className='image fit' src={project.image} alt={project.name} />
                            </div>
                        </div>
                        
                    </div>
                ))}
                <h2 className='project_header'>Front End</h2>
                {frontend_projects.map((project, index) => (
                    <div className='container column project' key={index} style={{ alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                        <div className={size.width > 1000 ? 'container row' : 'container'} style={{flexDirection: index % 2 === 0 ? 'row-reverse' : 'row', gap: '2rem'}}>
                            <div className={index % 2 === 0 ? 'container column text slantRight' : 'container column text slantLeft'}>
                                <h2>{project.name}</h2>
                                <ul className="icons" style={{ gap: '2vw' }}>
                                    <li><a target="_blank" rel="noopener noreferrer" href={project.github} className="icon brands"><i className="fab fa-github fa-3x"></i><span className="label">Github</span></a></li>
                                    {project.live && (
                                        <li><a target="_blank" rel="noopener noreferrer" href={project.live} className="icon brands"><i className="fas fa-globe fa-3x"></i><span className="label">Live</span></a></li>
                                    )}
                                    <ProjectModal project={project} />
                                </ul>
                                <div className='container medium tech'>
                                    {project.tech?.map((tech, index) => (
                                        <div className='tech' key={index}>
                                            <img loading='lazy' src={tech} alt={'Tech'} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='container'>
                                {!project.frame && (
                                    <img className='image fit' src={project.image} alt={project.name} />
                                )}
                                {project.frame && (
                                    <iframe scrolling='no' className='' src={project.live} title={project.name} />
                                )}
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
