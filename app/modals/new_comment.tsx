import {
  useTransition,
  Form,
  LinksFunction
} from "remix";
import { useState, useEffect } from 'react';

import { Modal } from "./modal";
import contactStyles from "~/styles/contact.css";
import modalStyles from "~/styles/modal.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: contactStyles }, { rel: "stylesheet", href: modalStyles }];
};

export default function NewComment({ errors }: any) {
  const transition = useTransition();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!transition.submission) return;
    setTimeout(() => {
      setShowModal(false)
    }, 1200)
  })


  return (
    <>
      <button style={{ marginRight: '50px' }} onClick={() => setShowModal(!showModal)} className='header-home-link'>New</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <button onClick={() => setShowModal(false)} style={{ alignSelf: 'flex-end', position: 'sticky', top: 0, zIndex: 1 }} className="header-home-link"><i className='fa fa-times fa-3x'></i></button>
          <Form autoComplete="off" className='form' method="post">
            <div className='inputs'>
              <div className=''>
                <p>
                Hi, thanks for checking out my website. You can leave a comment here that will be visible to anyone else who visits. 
                </p>
              </div>
              <div className=''>
                <label>
                  Name: {errors?.name && <em>Name is required</em>}
                  <input type="text" name="name" />
                </label>
                <label>
                  Title: {errors?.title && <em>Title is required</em>}
                  <input type="text" name="title" />
                </label>
              </div>
            </div>
            <div className='inputs'>
              <label>
                Rate my work: {errors?.rating && <em>Rating is required</em>}
                <select defaultValue={5} name="rating">
                  <option value="1">⭐️</option>
                  <option value="2">⭐️⭐️</option>
                  <option value="3">⭐️⭐️⭐️</option>
                  <option value="4">⭐️⭐️⭐️⭐️</option>
                  <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                </select>
              </label>
              <label htmlFor="comment">Comment:
              {errors?.comment && <em>Comment is required</em>}
              <textarea rows={5} name="comment" />
              </label>
            </div>
            <button style={{ fontSize: '1.2rem' }} className='header-home-link' type="submit">
              {transition.submission ? "Creating..." : "Comment"}
            </button>
          </Form>
        </Modal>
      )}
    </>
  );
}
