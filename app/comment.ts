import path from "path";
import fs from "fs/promises";
import parseFrontMatter from "front-matter";
import invariant from "tiny-invariant";
import { marked } from "marked";



export type Post = {
  slug: string;
  title: string;
};

export type Comment = {
  id: string;
  title: string;
  name: string;
  comment: string;
  rating: string;
  date: string;
}

export type CommentMarkdownAttributes = {
  title: string;
  name: string;
  comment: string;
  date: string;
  rating: string;
}

const commentsPath = path.join(__dirname, "../../comments", "comments.json");

function isValidCommentAttributes(
  attributes: any
): attributes is CommentMarkdownAttributes {
  return attributes?.title;
}

export async function getComments() {
  const comments = await fs.readFile(commentsPath, "utf-8");
  return JSON.parse(comments);
}

export async function createComment(comment: Comment) {
  const comments = await getComments();
  comments.push(comment);
  await fs.writeFile(commentsPath, JSON.stringify(comments), "utf-8");
}

export type PostMarkdownAttributes = {
  title: string;
};

const postsPath = path.join(__dirname, "../..", "posts");

function isValidPostAttributes(
  attributes: any
): attributes is PostMarkdownAttributes {
  return attributes?.title;
}

export async function getPosts() {
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async filename => {
      const file = await fs.readFile(
        path.join(postsPath, filename)
      );
      const { attributes } = parseFrontMatter(
        file.toString()
      );
      invariant(
        isValidPostAttributes(attributes),
        `${filename} has bad meta data!`
      );
      return {
        slug: filename.replace(/\.md$/, ""),
        title: attributes.title
      };
    })
  );
}

export async function getPost(slug: string) {
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(
    file.toString()
  );
  invariant(
    isValidPostAttributes(attributes),
    `Post ${filepath} is missing attributes`
  );
  const html = marked(body);
  return { slug, html, title: attributes.title };
}

type NewPost = {
  title: string;
  slug: string;
  markdown: string;
};

export async function createPost(post: NewPost) {
  const md = `---\ntitle: ${post.title}\n---\n\n${post.markdown}`;
  await fs.writeFile(
    path.join(postsPath, post.slug + ".md"),
    md
  );
  return getPost(post.slug);
}