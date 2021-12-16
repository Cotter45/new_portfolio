import { createPost } from "~/post";
import {
  useTransition,
  useActionData,
  Form,
  redirect,
  ActionFunction,
  LinksFunction
} from "remix";
import invariant from "tiny-invariant";
import { useState } from 'react';

import { Modal } from "./modal";
import contactStyles from "~/styles/contact.css";
import modalStyles from "~/styles/modal.css";

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: contactStyles }, { rel: "stylesheet", href: modalStyles }];
};


export default function NewPost({ errors, }: any) {
  const transition = useTransition();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li onClick={() => setShowModal(!showModal)} className="icon brands" style={{ display: 'flex', flexDirection: 'column' }}><i className="fas fa-info fa-3x"></i><span className="label">Info</span></li>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <button onClick={() => setShowModal(false)} style={{ alignSelf: 'flex-end', position: 'sticky', top: 0, zIndex: 1 }} className="header-home-link"><i className='fa fa-times fa-3x'></i></button>
          <Form method="post">
            <p>
              <label>
                Post Title: {errors?.title && <em>Title is required</em>}
                <input type="text" name="title" />
              </label>
            </p>
            <p>
              <label>
                Post Slug: {errors?.slug && <em>Slug is required</em>}
                <input type="text" name="slug" />
              </label>
            </p>
            <p>
              <label htmlFor="markdown">Markdown:</label>{" "}
              {errors?.markdown && <em>Markdown is required</em>}
              <br />
              <textarea rows={20} name="markdown" />
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
