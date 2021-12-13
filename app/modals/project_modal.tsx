import { useState } from "react";
import { Modal } from "./modal";

function CreateJobModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
        <button className='button' onClick={() => setShowModal(!showModal)}>
            New Listing
        </button>
        {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <h1>hello modal</h1>
        </Modal>
        )}
    </>
  );
}

export default CreateJobModal;
