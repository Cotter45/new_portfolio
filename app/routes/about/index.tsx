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

// Little helpers ...
const url = (name: string, wrap = false) =>
  `${
    wrap ? "url(" : ""
  }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
    wrap ? ")" : ""
  }`;

import data from "../../data";


export default function About() {
  const [open, set] = useState(false);
  const parallax = useRef<IParallax>(null!);

  const springApi = useSpringRef();
  const { size, ...rest } = useSpring({
    ref: springApi,
    config: config.stiff,
    from: {
      size: "20%",
      background: "transparent",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: open ? "white" : "black",
    },
    to: {
      size: open ? "80%" : "20%",
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

  useEffect(() => {
    if (!open) return;

    const close = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".test_container")) set(false);
    };

    document.addEventListener("click", close);

    return () => {
      document.removeEventListener("click", close);
    };
  });

  return (
    <div style={{ width: "90%", height: "100%", background: "#253237" }}>
      <Parallax ref={parallax} pages={5}>
        <ParallaxLayer
          offset={4}
          speed={1}
          style={{ backgroundColor: "#805E73" }}
        />
        <ParallaxLayer
          offset={3}
          speed={1}
          style={{ backgroundColor: "#87BCDE" }}
        />
        <ParallaxLayer
          offset={2}
          speed={1}
          style={{ backgroundColor: "#805E73" }}
        />
        <ParallaxLayer
          offset={1}
          speed={1}
          style={{ backgroundColor: "#87BCDE" }}
        />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={5}
          style={{
            backgroundImage: url("stars", true),
            backgroundSize: "cover",
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{ pointerEvents: "none", opacity: 0.5 }}
          horizontal={true}
        >
          <img
            src="/images/parallax/one/book.png"
            style={{ width: "15%", marginTop: "60%", marginLeft: "100%" }}
          />
          <img
            src="/images/parallax/one/book.png"
            style={{ width: "15%", marginTop: "40%", marginLeft: "150%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={-0.1}
          speed={0.1}
          // onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <animated.div
            style={{ ...rest, width: "80%", height: size }}
            className="test_container"
            onMouseEnter={() => set((open) => true)}
            onMouseLeave={() => set((open) => false)}
          >
            <p style={{ display: open ? "none" : "block" }}>The Story of Me</p>
            {open && (
              <div>
                <h2>I used to dig holes for a living.</h2>
                <p>
                  Now, I create full-stack applications and web sites! I'm just
                  a guy who's not afraid to roll up his sleeves and get his
                  hands dirty; looking to take his passion and experience in
                  building incredible things from the ground up and leverage it
                  in the world of software engineering. Self-taught programmer
                  who recently graduated App Academy's 24 week, full-stack
                  Javascript / Python bootcamp. Below you'll find snapshots of
                  all my recent projects as well as links to the source code and
                  the live sites. Let's collaborate - reach out using the
                  contact form below!
                </p>
              </div>
            )}
            {/* {transition((style, item) => (
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
            ))} */}
          </animated.div>
          <p>This is a placeholder for the right side</p>
          <button
            className="button"
            onClick={() => parallax.current.scrollTo(1)}
          >
            Scroll or Click Here
          </button>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "55%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "15%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "70%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "40%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "10%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "75%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "60%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "25%", marginLeft: "30%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "10%", marginLeft: "80%" }}
          />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img
            src={url("cloud")}
            style={{ display: "block", width: "20%", marginLeft: "5%" }}
          />
          <img
            src={url("cloud")}
            style={{ display: "block", width: "15%", marginLeft: "75%" }}
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
          <img src={url("earth")} style={{ width: "60%" }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundImage: url("clients", true),
          }}
        />

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
          {/* <img src={url("server")} style={{ width: "20%" }} /> */}
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          // onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={url("bash")} style={{ width: "40%" }} />
        </ParallaxLayer>

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
          <img src={url("clients-main")} style={{ width: "40%" }} />
        </ParallaxLayer>
        <ParallaxLayer
          offset={3}
          speed={-0}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          // onClick={() => parallax.current.scrollTo(0)}
        >
          <img src='/images/parallax/five/world_animation.gif' style={{ width: "100%", objectFit: 'contain' }} />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
