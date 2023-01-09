import { useEffect } from 'react';
import Typewriter from 'typewriter-effect';

import Particles from '../particles';
import useWindowSize from '../window-size';

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
    <main className="splash-container">
      <Particles />

      <img alt="My happy place" className={size.width > 1000 ? "splashphoto-large" : "splashphoto"} src="splash.PNG" />

      <div className="typewriter">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("% node portfolio.js")
              .pauseFor(500)
              .typeString("<br />% <b>{</b>")
              .typeString("<br />%  <code>name:</code> <em>Sean Cotter</em>,")
              .typeString("<br />%  <code>occupation:</code> <em>Web Developer</em>,")
              .typeString(
                "<br />% <code>loves:</code> <em>[ Video Games, Coding, Family, Pizza ]</em>,"
              )
              .typeString("<br />% <code>status:</code> <em>Looking for work!</em>")
              .typeString("<br />% <b>}</b>")
              .pauseFor(500)
              .changeDelay("natural")
              .typeString("<br />% // Let's connect !")
              .pauseFor(2500)
              .start();
          }}
        />
      </div>
    </main>
  );
}
