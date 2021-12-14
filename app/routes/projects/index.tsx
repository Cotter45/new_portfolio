import { LinksFunction, MetaFunction } from "remix";
import { useRef, useState } from 'react';
import { useTransition, animated, useSpring, config } from "@react-spring/web";


import modalCss from "~/styles/modal.css";
import projectStyles from "~/styles/projects.css";
import { full_stack_projects } from "~/projects";
import useWindowSize from "~/window-size";

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

    return (
        <div className='container column'>
            <div className='container projects'>
                {/* <CreateJobModal /> */}
                <h2 className='project_header'>Full Stack</h2>
                {full_stack_projects.map((project, index) => (
                    <div className='container column' key={index} style={{ padding: '2rem', alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                        <div className={size.width > 1000 ? 'container row' : 'container'} style={{flexDirection: index % 2 === 0 ? 'row-reverse' : 'row', gap: '2rem'}}>
                            <div className='container column text'>
                                <h2>{project.name}</h2>
                                <p>{project.description}</p>
                                <ul className="icons">
                                    <li><a target="_blank" rel="noopener noreferrer" href={project.github} className="icon brands"><i className="fab fa-github fa-2x"></i><span className="label">Github</span></a></li>
                                    <li><a target="_blank" rel="noopener noreferrer" href={project.live} className="icon brands"><i className="fas fa-globe fa-2x"></i><span className="label">Live</span></a></li>
                                </ul>
                            </div>
                            <div className='container'>
                                <img className='image fit' src={project.image} alt={project.name} />
                            </div>
                        </div>
                        <div className='container tech'>
                            {project.tech?.map((tech, index) => (
                                <img src={tech} alt={tech} key={index} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
