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

export default function NewComment({ errors, }: any) {
  const transition = useTransition();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!transition.submission) return;
    setTimeout(() => {
      setShowModal(false)
    }, 1200)
  })


  return (
    <>
      <button onClick={() => setShowModal(!showModal)} className='header-home-link'>New</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <button onClick={() => setShowModal(false)} style={{ alignSelf: 'flex-end', position: 'sticky', top: 0, zIndex: 1 }} className="header-home-link"><i className='fa fa-times fa-3x'></i></button>
          <Form className='container form' method="post">
            <p>
              <label>
                Name: {errors?.name && <em>Name is required</em>}
                <input type="text" name="name" />
              </label>
            </p>
            <p>
              <label>
                Post Title: {errors?.title && <em>Title is required</em>}
                <input type="text" name="title" />
              </label>
            </p>
            <p>
              <label>
                Rating: {errors?.rating && <em>Rating is required</em>}
                <input type="text" name="rating" />
              </label>
            </p>
            <p>
              <label htmlFor="comment">Comment:</label>{" "}
              {errors?.comment && <em>Comment is required</em>}
              <br />
              <textarea rows={10} name="comment" />
            </p>
            <p>
              <button type="submit">
                {transition.submission ? "Creating..." : "Create Post"}
              </button>
            </p>
          </Form>
        </Modal>
      )}
    </>
  );
}
