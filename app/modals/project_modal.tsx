import React, { useState, useEffect } from "react";
import { useTransition, animated, useSpringRef } from '@react-spring/web'

import { Modal } from "./modal";


function ProjectModal({ project }: any) {
  const [showModal, setShowModal] = useState(false);
  const [index, set] = useState(0)
  const onClick = () => {
    if (index === project.images.length - 1) {
      set(state => 0)
    } else {
    set(state => (state + 1))
    }
  }
  const transRef = useSpringRef()
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  })
  useEffect(() => {
    transRef.start()
  }, [index])


  return (
    <>
        <li onClick={() => setShowModal(!showModal)} className="icon brands" style={{ display: 'flex', flexDirection: 'column' }}><i className="fas fa-info fa-3x"></i><span className="label">Info</span></li>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='container column'>
            <h1 style={{ color: '#3eb08f'}}>{project.name}</h1>
            <div className='container'>
              <label>Description</label>
              <p className='container'>{project.description}</p>
            </div>
            <div className='container'>
              <label>Learned</label>
              <ul>
                {project.learned.map((learned: any, index: number) => (
                  <li key={index} className='container'>{learned}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className='container'>
            <label>Takeaways</label>
            <ul>
              {project.takeaways.map((takeaway: any, index: number) => (
                <li key={index} className='container'>{takeaway}</li>
              ))}
            </ul>
          </div>
          <div className='images' onClick={onClick}>
            <label>Images - ( Click/Tap )</label>
            {transitions((style, i): any => (
              <animated.div className='images' style={{ ...style }}>
                <img loading='lazy' height='500px' width='100%' src={project.images[i]} alt={project.name} />
              </animated.div>
            ))}
          </div>
          <div className='container'>
            <label>Links</label>
            <ul className="icons" style={{ justifyContent: 'center', gap: '4vw' }}>
                <li><a target="_blank" rel="noopener noreferrer" href={project.github} className="icon brands"><i className="fab fa-github fa-4x"></i><span className="label">Github</span></a></li>
                <li><a target="_blank" rel="noopener noreferrer" href={project.live} className="icon brands"><i className="fas fa-globe fa-4x"></i><span className="label">Live</span></a></li>
            </ul>
          </div>
          {project.video && (
            <div className='container'>
              <label>Video</label>
              <video controls width='100%' height='500px'>
                <source src={project.video} type="video/mp4" />
              </video>
            </div>
          )}
        </Modal>
        )}
    </>
  );
}

export default ProjectModal;
