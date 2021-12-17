import { useState, useEffect, useRef } from "react";
import {
  useTransition,
  useSpring,
  useChain,
  config,
  animated,
  useSpringRef,
} from "@react-spring/web";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { LinksFunction, MetaFunction } from "remix";

// Little helpers ...
const svg = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

import data from "../../data";
import aboutStyles from '~/styles/about.css';
import ProfileImage from "~/canvas/image";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: aboutStyles },
  ];
};

export let meta: MetaFunction = () => {
  return {
    title: "About",
    description: "An interactive story of my recent years.",
  };
};


export default function About() {
  const [open, set] = useState(false);
  const parallax = useRef<IParallax>(null!);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.wobbly,
    from: {
      size: "20%",
      background: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: open ? "white" : "black",
    },
    to: {
      size: open ? "60%" : "20%",
      background: open ? "white" : "transparent",
      color: open ? "black" : "white",
    },
  });

  const transApi = useSpringRef();
  const transition = useTransition(open ? data : [], {
    ref: transApi,
    trail: 400 / data.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  useChain(open ? [springApi, transApi] : [transApi, springApi], [
    0,
    open ? 0.1 : 0.6,
  ]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        background: "#253237",
        position: "absolute",
      }}
    >
      <Parallax ref={parallax} pages={5}>
        <ParallaxLayer
          offset={4}
          speed={1}
          // style={{ backgroundColor: "#805E73" }}
        />
        <ParallaxLayer
          offset={3}
          speed={1}
          // style={{ backgroundColor: "#87BCDE" }}
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          // style={{ backgroundColor: "#805E73" }}
        />
        <ParallaxLayer
          offset={1}
          speed={1}
          // style={{ backgroundColor: "#87BCDE" }}
        />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={5}
          style={{
            backgroundImage: svg("stars", true),
            backgroundSize: "cover",
          }}
        >
          <div className="container column" style={{ position: 'relative' }}>
            <h2>Here's a little bit about me.</h2>
            <img style={{ borderRadius: '10px' }} height="500px" src="/images/fulls/family.jpeg" alt="family" />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={0.5}
          speed={0.5}
          style={{ pointerEvents: "none", opacity: 0.5 }}
          horizontal={true}
        >
          <img
            src="/images/parallax/two/computer_study.png"
            style={{ width: "15%", marginTop: "50%", marginLeft: "100%" }}
          />
          <img
            src="/images/parallax/three/road.png"
            style={{ width: "15%", marginTop: "6%", marginLeft: "115%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={.25} speed={-1} factor={4}>
          <img
            src="/images/parallax/man.png"
            style={{ width: "10%", marginLeft: "5%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.35} speed={0} factor={1}>
          <img
            src="/images/parallax/lab_coat.png"
            style={{ width: "12%", marginLeft: "4%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.15} speed={0} factor={1}>
          <img
            src="/images/parallax/four/safety_gear.png"
            style={{ width: "11%", marginLeft: "4%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={0}
          speed={0.1}
          // onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 1,
            // backgroundImage: "url(/images/fulls/family.jpeg)",
            // backgroundSize: "80% 100%",
            // objectFit: 'contain',
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "50% 0%",
            width: "100%",
            height: "95vh",
          }}
        >
          <animated.div
            style={{ ...rest, width: "80%", height: size }}
            className="test_container"
            onClick={() => set((open) => true)}
            onMouseLeave={() => set((open) => false)}
          >
            <p
              style={{
                display: open ? "none" : "block",
                position: "relative",
                left: 0,
                backgroundColor: "black",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              <i className="fas fa-info"></i> -- The Story of Me
            </p>
            {open && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "black" }}>
                  I used to dig holes for a living.
                </h2>
                <p>
                  Now, I create full-stack applications and web sites! I'm just
                  a guy who's not afraid to roll up his sleeves and get his
                  hands dirty; looking to take his passion and experience in
                  building incredible things from the ground up and leverage it
                  in the world of software engineering. Self-taught programmer
                  who recently graduated App Academy's 24 week, full-stack
                  Javascript / Python bootcamp.
                </p>
              </div>
            )}
          </animated.div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 1,
            // backgroundImage: "url(/images/fulls/axp.jpeg)",
            // backgroundSize: "contain",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "50% 50%",
            width: "100%",
            height: "100vh",
          }}
        >
          <animated.div
            style={{ ...rest, width: "80%", height: size, zIndex: 1 }}
            className="test_container"
            onClick={() => set((open) => true)}
            onMouseLeave={() => set((open) => false)}
          >
            <p
              style={{
                display: open ? "none" : "block",
                position: "relative",
                left: 0,
                backgroundColor: "black",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              <i className="fas fa-info"></i> -- Drexel University
            </p>
            {open && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "black" }}>
                  I attended Drexel University.
                </h2>
                <p style={{ textIndent: "15px" }}>
                  I'd started down this path to become a doctor. I had dreams of
                  being a radiologist, at the time the only subject I had found
                  interesting was anatomy. I was fascinated with how the human
                  body works and how it interacts with the environment. After a
                  few microbiology and organic chemistry classes, I realized the
                  lab coat just didn't fit as well as I'd thought it would.
                </p>
              </div>
            )}
          </animated.div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0.1}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            zIndex: 1,
            // backgroundImage: "url(/images/fulls/construction.jpeg)",
            // backgroundSize: "contain",
            // backgroundRepeat: "no-repeat",
            // backgroundPosition: "50% 50%",
            width: "100%",
            height: "100vh",
          }}
        >
          <animated.div
            style={{ ...rest, width: "80%", height: size, zIndex: 1 }}
            className="test_container"
            onClick={() => set((open) => true)}
            onMouseLeave={() => set((open) => false)}
          >
            <p
              style={{
                display: open ? "none" : "block",
                position: "relative",
                left: 0,
                backgroundColor: "black",
                padding: "1rem",
                borderRadius: "10px",
              }}
            >
              <i className="fas fa-info"></i> -- Construction Time
            </p>
            {open && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2 style={{ color: "black" }}>I got a job in Construction!</h2>
                <p style={{ textIndent: "15px" }}>
                  I'd started down this path to become a doctor. I had dreams of
                  being a radiologist, at the time the only subject I had found
                  interesting was anatomy. I was fascinated with how the human
                  body works and how it interacts with the environment. After a
                  few microbiology and organic chemistry classes, I realized the
                  lab coat just didn't fit as well as I'd thought it would.
                </p>
              </div>
            )}
          </animated.div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img
            src="/images/parallax/one/book.png"
            style={{ display: "block", width: "20%", marginLeft: "55%" }}
          />
          <img
            src="/images/parallax/one/book.png"
            style={{ display: "block", width: "10%", marginLeft: "15%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={0.5} style={{ opacity: 0.7 }}>
          <img
            src="/images/parallax/two/drexel.png"
            style={{ display: "block", width: "20%", marginLeft: "20%" }}
          />
          <img
            src="/images/parallax/two/microscope.png"
            style={{ display: "block", width: "20%", marginLeft: "40%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img
            src="/images/parallax/two/microscope.png"
            style={{ display: "block", width: "10%", marginLeft: "10%" }}
          />
          <img
            src="/images/parallax/two/microscope.png"
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          />
          <img
            src="/images/parallax/two/stethoscope.png"
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.1} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            src="/images/parallax/four/tools.png"
            style={{ display: "block", width: "10%", marginLeft: "75%" }}
          />
          <img
            src="/images/parallax/four/toolbox.png"
            style={{ display: "block", width: "25%", marginLeft: "10%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.4} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            src={svg("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "50%" }}
          />
          <img
            src="/images/parallax/four/loader.png"
            style={{ display: "block", width: "25%", marginLeft: "80%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <img src={svg("earth")} style={{ width: "60%" }} />
        </ParallaxLayer>

        {/* <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundImage: svg("clients", true),
          }}
        /> */}

        <ParallaxLayer
          offset={0}
          speed={0.1}
          // onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <div className="wrapper">
            <div className="placeholder">
              <animated.div
                style={{ ...rest, width: size, height: size }}
                className="test_container"
                onClick={() => set((open) => true)}
              >
                <p style={{ display: open ? "none" : "block" }}>Click me</p>
                {transition((style, item) => (
                  <>
                    <animated.div
                      className="item"
                      style={{
                        ...style,
                        background: item.css,
                        color: "black",
                      }}
                    ></animated.div>
                  </>
                ))}
              </animated.div>
            </div>
            <div className="placeholder">
              <p>This is a placeholder for the right side</p>
              <button
                className="button"
                onClick={() => parallax.current.scrollTo(1)}
              >
                Scroll
              </button>
            </div>
          </div> */}
          {/* <img src={svg("server")} style={{ width: "20%" }} /> */}
        </ParallaxLayer>

        {/* <ParallaxLayer
          offset={1}
          speed={0.1}
          // onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={svg("bash")} style={{ width: "40%" }} />
        </ParallaxLayer> */}
        {/* 
        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // onClick={() => parallax.current.scrollTo(0)}
        >
          <img src="/images/fulls/construction.jpeg" style={{ width: "40%", borderRadius: '10px' }} />
        </ParallaxLayer> */}
        {/* <ParallaxLayer
          offset={3}
          speed={-0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // onClick={() => parallax.current.scrollTo(0)}
        >
          <img
            src="/images/parallax/five/world_animation.gif"
            style={{ width: "100%", objectFit: "contain" }}
          />
        </ParallaxLayer> */}
      </Parallax>
    </div>
  );
}
