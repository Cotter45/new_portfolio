import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import type { MetaFunction } from "remix";

export let meta: MetaFunction = () => {
  return {
    title: "Comments",
    description: "Mailbox is full.",
  };
};

import { getPost } from "~/comment";
import invariant from "tiny-invariant";

export const loader: LoaderFunction = async ({
  params
}) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();
  return (
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  );
}