import {
  useActionData,
  ActionFunction,
  MetaFunction,
  useLoaderData,
  LinksFunction,
  LoaderFunction
} from "remix";
import invariant from "tiny-invariant";
import CanvasFun from "../../canvas/canvas";
import NewComment from "../../modals/new_comment";
import type { Comment } from "@prisma/client";
import { db } from "~/utils/db.server";
import { useEffect } from "react";

import contactStyles from "~/styles/contact.css";
import modalStyles from "~/styles/modal.css";
import Email from "./email";
import Comments from "./comment";

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

type LoaderData = { comments: Array<Comment> };
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    comments: await db.comment.findMany()
  }
  return data;
}

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

  const newComment = await db.comment.create({
    data: {
      name,
      title,
      rating: +rating,
      comment,
    }
  })

  return newComment;
};


export default function Contact() {
  const errors = useActionData();
  const comments = useLoaderData<any>().comments;

  useEffect(() => {
    const timeout = setTimeout(function () {
      // Hide the address bar!
      window.scrollTo(0, 1);
    }, 0);

    return () => clearTimeout(timeout);
  });
  
  return (
    <div className="contact">
      <div className="container email">
        <Email />
      </div>
      <div className="container comments">
        <div className="container row" style={{ justifyContent: 'space-between'}}>
          <h1>Comments</h1>
          <NewComment props={errors} />
        </div>
        <Comments comments={comments} />
      </div>
      {/* <CanvasFun /> */}
    </div>
  );
}
