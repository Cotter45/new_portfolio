import { useState } from "react";
import { Modal } from "./modal";

function ProjectModal({ project }: any) {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
        <li onClick={() => setShowModal(!showModal)} className="icon brands" style={{ display: 'flex', flexDirection: 'column' }}><i className="fas fa-info fa-2x"></i><span className="label">Info</span></li>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className='container column'>
            <h1>{project.name}</h1>
            <p className='container'>{project.description}</p>
          </div>
        </Modal>
        )}
    </>
  );
}

export default ProjectModal;
