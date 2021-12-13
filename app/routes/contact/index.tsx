import { Link } from "remix";
import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Contact",
    description: "Leave a message after the beep.",
  };
};

export default function AdminIndex() {
  return (
    <p>
      <Link to="new">Create a New Post</Link>
    </p>
  );
}