import { LinksFunction } from "remix";

import modalCss from "~/styles/modal.css";
import { full_stack_projects } from "~/projects";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: modalCss }];
};


export default function Projects() {

    return (
        <div>
            <h1>Projects</h1>
            {/* <CreateJobModal /> */}
            {full_stack_projects.map((project, index) => (
                <div className='container column' key={index} style={{ gap: '1vh', alignItems: index % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                    <h2>{project.name}</h2>
                    <div className={'container medium row'} style={{flexDirection: index % 2 === 0 ? 'row-reverse' : 'row'}}>
                        <div className='container column'>
                            <p>{project.description}</p>
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
