import {
  useTransition,
  useActionData,
  redirect,
  ActionFunction,
  MetaFunction,
  Outlet, 
  Link,
  useLoaderData,
  LinksFunction,
} from "remix";
import invariant from "tiny-invariant";
import { v4 as uuidv4 } from "uuid";

import { getPosts, getComments, createComment, createPost } from "~/comment";
import type { Post, Comment } from "~/comment";
import CanvasFun from "../../canvas/canvas";
import NewComment from "../../modals/new_comment";

import contactStyles from "~/styles/contact.css";
import modalStyles from "~/styles/modal.css";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: contactStyles },
    { rel: "stylesheet", href: modalStyles },
  ];
};

export let meta: MetaFunction = () => {
  return {
    title: "Contact",
    description: "Leave a message after the beep.",
  };
};

// type PostError = {
//   title?: boolean;
//   slug?: boolean;
//   markdown?: boolean;
// };


// export const action: ActionFunction = async ({ request }) => {
//   await new Promise((res) => setTimeout(res, 1000));
//   const formData = await request.formData();
//   const title = formData.get("title");
//   const slug = formData.get("slug");
//   const markdown = formData.get("markdown");

//   const errors: PostError = {};
//   if (!title) errors.title = true;
//   if (!slug) errors.slug = true;
//   if (!markdown) errors.markdown = true;

//   if (Object.keys(errors).length) {
//     return errors;
//   }

//   invariant(typeof title === "string");
//   invariant(typeof slug === "string");
//   invariant(typeof markdown === "string");
//   await createPost({ title, slug, markdown });

//   return getPosts();
// };

type CommentError = {
  name?: boolean;
  title?: boolean;
  rating?: boolean;
  comment?: boolean;
}

export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();
  const name = formData.get("name");
  const title = formData.get("title");
  const rating = formData.get("rating");
  const comment = formData.get("comment");

  const errors: CommentError = {};
  if (!name) errors.name = true;
  if (!title) errors.title = true;
  if (!rating) errors.rating = true;
  if (!comment) errors.comment = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof name === "string");
  invariant(typeof title === "string");
  invariant(typeof rating === "string");
  invariant(typeof comment === "string");

  const newComment = {
    id: uuidv4(),
    name,
    title,
    rating,
    comment,
    date: new Date().toDateString(),
  }
  await createComment(newComment);

  return getComments();
};


export const loader = () => {
  return getComments();
};


export default function Contact() {
  const errors = useActionData();
  const comments = useLoaderData<Comment[]>();
  

  return (
    <div className="contact">
      <div className="container">
        <div className="container row" style={{ justifyContent: 'space-around'}}>
          <h1>Comments</h1>
          <NewComment props={errors} />
        </div>
        <div className="container column">
          {comments.map((comment) => (
            <div className="container column comment" key={comment.id}>
              <div className='container row' style={{ borderBottom: '2px solid black', justifyContent: 'space-around' }}>
                <h3 style={{ color: 'gold', margin: 0 }}>{comment.name} - {new Date(comment.date).toLocaleDateString()}</h3>
                <p>{comment.rating === '5' ? '⭐️⭐️⭐️⭐️⭐️' : comment.rating === '4' ? '⭐️⭐️⭐️⭐️' : comment.rating === '3' ? '⭐️⭐️⭐️' : comment.rating === '2' ? '⭐️⭐️' : '⭐️'}</p>
              </div>
              {/* <h4 style={{ borderBottom: '1px solid black'}}>{comment.title} </h4> */}
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <main className="container scroller">
        <Outlet />
      </main>
      {/* <CanvasFun /> */}
    </div>
  );
}
