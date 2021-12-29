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

// Check out my reworked portfolio! 

// https://new-cotter.herokuapp.com 



// While searching for a job in this crazy competitive market, I felt compelled to develop a more attractive, robust portfolio to stand out a bit and better highlight my skillset and creativity. 



// I used this as an opportunity to learn how to utilize Typescript and a new full stack framework called Remix.run. I also learned a new ORM with this app, Prisma, and I highly recommend it as well as Remix. They work great almost right out of the box and left me with about 90% of my time designing instead of laying out architecture, something I'm not great at but was really nice to have more time devoted to.



// I hope you enjoy what I've come up with and this may even convince you to play around with Remix.run. This is my first release so if you encounter any issue, please don't hesitate to drop me a line through the app or PM me here on Linkedin.



// #react #learning #experience #share #html #opportunity #remix #typescript #portfoliowebsite #softwareengineering 

export default function NewComment({ errors }: any) {
  const transition = useTransition();
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {

    return () => {
      setName("");
      setTitle("");
      setMessage("");
    }
  }, [showModal])

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
              <h1>New Comment</h1>
              <div className=''>
                <label>
                  Name: {errors?.name && <em>Name is required</em>}
                  <input onChange={(e) => setName(e.target.value)} type="text" name="name" />
                </label>
                <label>
                  Title: {errors?.title && <em>Title is required</em>}
                  <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" />
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
              <textarea onChange={(e) => setMessage(e.target.value)} rows={5} name="comment" />
              </label>
            </div>
            {/* {!(name && title && message) && <p style={{ color: 'gold', fontSize: '2rem', position: 'relative', bottom: '-10%' }}>Please fill out the form to submit</p>} */}
            <button disabled={ !(name && title && message) ? true : false} style={{ fontSize: '1.2rem', width: '200px', height: '50px', color: !(name && title && message) ? 'red' : 'white' }} className='header-home-link' type="submit">
              {transition.submission ? "Creating..." : "Comment"}
            </button>
          </Form>
        </Modal>
      )}
    </>
  );
}
