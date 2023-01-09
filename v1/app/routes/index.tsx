import { url } from "inspector";
import type { MetaFunction, LinksFunction } from "remix";
import Typewriter from 'typewriter-effect';
import { useEffect } from 'react';

import useWindowSize from "../../../v2/app/window-size";

import Particles from "../canvas/particles";

export const links: LinksFunction = () => {
  return [
    {
      rel: "preload",
      href: "images/parallax/min/splash.PNG",
      as: "splash",
    },
  ];
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Sean Cotter",
    description: "The work and a few ramblings of Sean Cotter.",
    name: "apple-mobile-web-app-capable", content: "yes"
  };
};

export default function Index() {
  const size = useWindowSize();

  useEffect(() => {
    const timeout = setTimeout(function () {
      // Hide the address bar!
      window.scrollTo(0, 1);
    }, 0);

    return () => clearTimeout(timeout);
  });


  return (
    <div
      className="splash-container"
    >
      <Particles />
      {size.width > 1000 && (
        <img
          className="splashphoto-large"
          src="images/parallax/min/splash.PNG"
          alt="computer"
        />
      )}
      {size.width < 1000 && (
        <img
          className="splashphoto"
          src="images/parallax/min/splash.PNG"
        />
      )}
      <div className="typewriter">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("% node portfolio.js")
              .pauseFor(500)
              .typeString("<br />% <b>{</b>")
              .typeString("<br />% name: <em>Sean Cotter</em>,")
              .typeString("<br />% occupation: <em>Web Developer</em>,")
              .typeString(
                "<br />% loves: <em>[ Video Games, Coding, PIZZA ]</em>,"
              )
              .typeString("<br />% status: <em>Looking for work!</em>")
              .typeString("<br />% <b>}</b>")
              .pauseFor(500)
              .changeDelay("natural")
              .typeString("<br />% // Let's connect !")
              .pauseFor(2500)
              .start();
          }}
        />
      </div>
    </div>
  );
}


const Sean = {

}