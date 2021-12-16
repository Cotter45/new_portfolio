// import { Link } from "remix";
// import type { MetaFunction } from "remix";

// export let meta: MetaFunction = () => {
//   return {
//     title: "Contact",
//     description: "Leave a message after the beep.",
//   };
// };

// export default function AdminIndex() {
//   return (
//     <p>
//       <Link to="new">Create a New Comment</Link>
//     </p>
//   );
// }

import { createPost } from "~/post";
import {
  useTransition,
  useActionData,
  redirect,
  ActionFunction,
} from "remix";
import invariant from "tiny-invariant";

import { Outlet, Link, useLoaderData, LinksFunction } from "remix";
import { useState } from "react";

import { getPosts } from "~/post";
import type { Post } from "~/post";
import CanvasFun from "../../canvas/canvas";
import NewPost from "../../modals/new_comment";

import contactStyles from "~/styles/contact.css";
import modalStyles from "~/styles/modal.css";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: contactStyles },
    { rel: "stylesheet", href: modalStyles },
  ];
};

type PostError = {
  title?: boolean;
  slug?: boolean;
  markdown?: boolean;
};


export const action: ActionFunction = async ({ request }) => {
  await new Promise((res) => setTimeout(res, 1000));
  const formData = await request.formData();
  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: PostError = {};
  if (!title) errors.title = true;
  if (!slug) errors.slug = true;
  if (!markdown) errors.markdown = true;

  if (Object.keys(errors).length) {
    return errors;
  }

  invariant(typeof title === "string");
  invariant(typeof slug === "string");
  invariant(typeof markdown === "string");
  await createPost({ title, slug, markdown });

  return getPosts();
};


export const loader = () => {
  return getPosts();
};

export default function Admin() {
  const errors = useActionData();
  const posts = useLoaderData<Post[]>();
  const [newPost, setNewPost] = useState<boolean>(false);

  return (
    <div className="contact no_scroll">
      <div className="container">
        <h2>Comments</h2>
        <NewPost props={errors} />
        <ul className="list">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <main className="container scroller">
        <Outlet />
      </main>
      {/* <CanvasFun /> */}
    </div>
  );
}
