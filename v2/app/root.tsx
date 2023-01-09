import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from './index.css';
import Menu from "./menu";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: styles
  }
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  title: "Sean Cotter - Web Developer",
  description: "My name is Sean Cotter, I'm a web developer located in the Philadelphia area.",
  keywords: "development, web, programmer, programming, website, developer, react, javascript, typescript, golang, rust, html, css, code, coding, app, postgresql, postgreSQL, mysql, mySQL, mongodb, mongoDB, noSQL, SQL, tailwindcss, etc",
  robots: "index, follow",
  language: "English",
  author: "Sean Cotter"
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Menu />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
