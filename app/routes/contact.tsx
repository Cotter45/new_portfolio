import { Outlet, Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
import type { Post } from "~/post";
import CanvasFun from "./canvas";

export const loader = () => {
  return getPosts();
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="admin no_scroll">
      <CanvasFun />
      <div className='container'>
        <h2>Comments</h2>
        <ul className='list'>
          {posts.map(post => (
            <li key={post.slug}>
              <Link to={`/contact/posts/${post.slug}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <main className='container scroller'>
        <Outlet />
      </main>
    </div>
  );
}
