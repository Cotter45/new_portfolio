import { Outlet, Link, useLoaderData } from "remix";
import { useState } from "react";

import { getPosts } from "~/post";
import type { Post } from "~/post";
import CanvasFun from "./canvas";

export const loader = () => {
  return getPosts();
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();
  const [newPost, setNewPost] = useState<boolean>(false);

  return (
    <div className="contact no_scroll">
      <div className='container'>
        <h2>Comments</h2>
        <ul className='list'>
          {posts.map(post => (
            <li key={post.slug}>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <main className='container scroller'>
        <Outlet />
      </main>
      <CanvasFun />
    </div>
  );
}
