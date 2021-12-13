import { Outlet, Link, useLoaderData } from "remix";
import { getPosts } from "~/post";
import type { Post } from "~/post";
import adminStyles from "~/styles/admin.css";
import CanvasFun from "./canvas";

export const loader = () => {
  return getPosts();
};

export default function Admin() {
  const posts = useLoaderData<Post[]>();
  return (
    <div className="admin">
      <CanvasFun />
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
      <main className='container'>
        <Outlet />
      </main>
    </div>
  );
}
