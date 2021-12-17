import { Link, useLoaderData } from "remix";
import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Comments",
    description: "Mailbox is full.",
  };
};

import { getPosts } from "~/comment";
import type { Post } from "~/comment";


export const loader = () => {
  return getPosts();
};

export default function Posts() {
  const posts = useLoaderData<Post[]>();
  
  return (
    <div className="">
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
      
    </div>
  );
}