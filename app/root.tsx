import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from "remix";
import type { LinksFunction } from "remix";
import React, { useState, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";



import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import { ModalProvider } from "./modals/modal";
import useWindowSize from "./utils/window-size";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    {
      rel: "stylesheet",
      href: darkStylesUrl,
      media: "(prefers-color-scheme: dark)"
    }
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <ModalProvider>
        <Layout>
          <Outlet />
        </Layout>
      </ModalProvider>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Someone done goofed.
          </p>
          <Link to="/">Go Home</Link>
        </div>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
          integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
          crossOrigin="anonymous"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [open, set] = useState(false);
  const screen = useWindowSize();

  const closeMenu = () => set(!open);

  const transitions = useTransition(open, {
    from: { opacity: 0, transform: "translate3d(0, 40px, 0)", display: "none" },
    enter: { opacity: 1, transform: "translate3d(0, 0px, 0)", display: 'flex' },
    leave: { opacity: 0, transform: "translate3d(0, 40px, 0)", display: "none" }
  });

  return (
    <div id="root">
      <header className="header">
        <div className="header-content">
          {/* <Link to="/" title="Remix" className="header-home-link">
            {` <> Sean Cotter </> `}
          </Link> */}
          <nav aria-label="Main navigation" className="header-nav">
            {(screen.width > 1000 && (
              <ul>
                <li>
                  <Link className="header-home-link" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="header-home-link" to="/contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link className="header-home-link" to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="header-home-link" to="/projects">
                    Projects
                  </Link>
                </li>
              </ul>
            )) || (
              <button className="header-home-link" onClick={() => set(!open)}>
                <i style={{ color: "lightgray" }} className="fas fa-bars fa-2x"></i>
              </button>
            )}
          </nav>
          {screen.width < 1000 && (
            <>
              {transitions((style, index) => (
                <animated.div
                  style={{
                    ...style,
                    position: "absolute",
                    right: "35%",
                    top: "95%",
                  }}
                >
                  {open && (
                    <div className="header-nav-mobile">
                      <Link
                        onClick={closeMenu}
                        className="header-home-link"
                        to="/"
                      >
                        Home
                      </Link>
                      <Link
                        onClick={closeMenu}
                        className="header-home-link"
                        to="/contact"
                      >
                        Contact
                      </Link>
                      <Link
                        onClick={closeMenu}
                        className="header-home-link"
                        to="/about"
                      >
                        About
                      </Link>
                      <Link
                        onClick={closeMenu}
                        className="header-home-link"
                        to="/projects"
                      >
                        Projects
                      </Link>
                    </div>
                  )}
                </animated.div>
              ))}
            </>
          )}
        </div>
      </header>
      <main className="main_container column">{children}</main>
      <footer className="remix-app__footer">
        <div className="container remix-app__footer-content">
          <div className="inner">
            <ul className="icons">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Cotter45"
                  className="icon brands"
                >
                  <i className="fab fa-github fa-2x"></i>
                  <span className="label">Github</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/sean-cotter-43572417/"
                  className="icon solid"
                >
                  <i className="fab fa-linkedin-in fa-2x"></i>
                  <span className="label">LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://angel.co/u/sean-cotter-6"
                  className="icon solid"
                >
                  <i className="fab fa-angellist fa-2x"></i>
                  <span className="label">AngelList</span>
                </a>
              </li>
              {/* <p>&copy; Sean Cotter</p> */}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

