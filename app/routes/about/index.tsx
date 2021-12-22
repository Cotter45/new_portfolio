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
import { pages } from "../../about";
import aboutStyles from '~/styles/about.css';
import useWindowSize from "~/utils/window-size";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: aboutStyles },
    {
      rel: "preload",
      href: "/images/parallax/min/in_loader.png",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/parallax/min/construction.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/parallax/min/construction2.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/parallax/min/break.png",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/parallax/min/build.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/parallax/min/dawg.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/parallax/min/firefighter.jpeg",
      as: "image",
    },
    {
      rel: "preload",
      href: "/images/parallax/min/family.jpeg",
      as: "image",
    },
  ];
};

export let meta: MetaFunction = () => {
  return {
    title: "About",
    description: "An interactive story of my recent years.",
  };
};

interface PageProps {
  offset: number;
  onClick: () => void;
  title: string;
  text: string;
  customTop: string;
  customBottom: string;
}

interface ImageProps {
  offset: number;
  onClick: () => void;
  images: string[];
  title: string;
  text: string;
}

const Page = ({ offset, onClick, title, text, customTop, customBottom }: PageProps) => (
  <ParallaxLayer
    offset={offset}
    speed={0.2}
  >
    <ParallaxLayer speed={-0.1} style={{ cursor: 'pointer' }}>
      <div className={`slopeBegin ${customTop}`} />
    </ParallaxLayer>

    <ParallaxLayer speed={-.1} onClick={onClick}>
      <div className={`slopeEnd ${customBottom}`}/>
    </ParallaxLayer>

    <ParallaxLayer
      className='text'
      speed={1}
      // style={{ marginLeft: '1%'}}
    >
      {/* <h3 className='title' >{title}</h3> */}
      <p className='clip-p' >{title}</p>
    </ParallaxLayer>
  </ParallaxLayer>
);

const phillyImages = [
  "/images/fulls/philly_tiles/1.png",
  "/images/fulls/philly_tiles/2.png",
  "/images/fulls/philly_tiles/3.png",
  "/images/fulls/philly_tiles/4.png",
  "/images/fulls/philly_tiles/5.png",
  "/images/fulls/philly_tiles/6.png",
  "/images/fulls/philly_tiles/7.png",
  "/images/fulls/philly_tiles/8.png",
  "/images/fulls/philly_tiles/9.png",
  "/images/fulls/philly_tiles/10.png",
  "/images/fulls/philly_tiles/11.png",
  "/images/fulls/philly_tiles/12.png",
  "/images/fulls/philly_tiles/13.png",
  "/images/fulls/philly_tiles/14.png",
  "/images/fulls/philly_tiles/15.png",
  "/images/fulls/philly_tiles/16.png",
  "/images/fulls/philly_tiles/17.png",
  "/images/fulls/philly_tiles/18.png",
];

const constructionImages = [
  "/images/fulls/construction_tiles/1.jpg",
  "/images/fulls/construction_tiles/2.jpg",
  "/images/fulls/construction_tiles/3.jpg",
  "/images/fulls/construction_tiles/4.jpg",
  "/images/fulls/construction_tiles/5.jpg",
  "/images/fulls/construction_tiles/6.jpg",
  "/images/fulls/construction_tiles/7.jpg",
  "/images/fulls/construction_tiles/8.jpg",
  "/images/fulls/construction_tiles/9.jpg",
  "/images/fulls/construction_tiles/10.jpg",
  "/images/fulls/construction_tiles/11.jpg",
  "/images/fulls/construction_tiles/12.jpg",
  "/images/fulls/construction_tiles/13.jpg",
  "/images/fulls/construction_tiles/14.jpg",
  "/images/fulls/construction_tiles/15.jpg",
  "/images/fulls/construction_tiles/16.jpg",
  "/images/fulls/construction_tiles/17.jpg",
  "/images/fulls/construction_tiles/18.jpg",
];

const Image = ({ offset, onClick, images, title, text }: ImageProps) => (
  <>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "41%", marginTop: "15%" }}
    >
      <img width="16.5%" src={images[0]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "25%", marginTop: "15%" }}
    >
      <img width="16.5%" src={images[1]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "8.5%", marginTop: "15%" }}
    >
      <img width="16.5%" src={images[2]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "-8%", marginTop: "15%" }}
    >
      <img width="16.5%" src={images[3]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "-24.5%", marginTop: "15%" }}
    >
      <img width="16.5%" src={images[4]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "-41%", marginTop: "15%" }}
    >
      <img width="16.5%" src={images[5]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "41%", marginTop: "-1.5%" }}
    >
      <img width="16.5%" src={images[6]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "25%", marginTop: "-1.5%" }}
    >
      <img width="16.5%" src={images[7]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "8.5%", marginTop: "-1.5%" }}
    >
      <img width="16.5%" src={images[8]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "-8%", marginTop: "-1.5%" }}
    >
      <img width="16.5%" src={images[9]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "-24.5%", marginTop: "-1.5%" }}
    >
      <img width="16.5%" src={images[10]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "-41%", marginTop: "-1.5%" }}
    >
      <img width="16.5%" src={images[11]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "41%", marginTop: "-17.5%" }}
    >
      <img width="16.5%" src={images[12]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "25%", marginTop: "-17.5%" }}
    >
      <img width="16.5%" src={images[13]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "8.5%", marginTop: "-17.5%" }}
    >
      <img width="16.5%" src={images[14]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "-8%", marginTop: "-17.5%" }}
    >
      <img width="16.5%" src={images[15]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={-0.1}
      style={{ marginLeft: "-24.5%", marginTop: "-17.5%" }}
    >
      <img width="16.5%" src={images[16]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      onClick={onClick}
      offset={offset}
      speed={0}
      style={{ marginLeft: "-41%", marginTop: "-17.5%" }}
    >
      <img width="16.5%" src={images[17]} alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      className="title"
      offset={offset}
      speed={-.2}
    >
      {/* <span>{title}</span> */}
      {/* <span>{text}</span> */}
    </ParallaxLayer>
  </>
);

export default function About() {
  const screen = useWindowSize();
  // const [open, set] = useState(false);
  const parallax = useRef<IParallax>(null);
  const parallax1 = useRef<IParallax>(null);
  const parallax2 = useRef<IParallax>(null);
  const parallax3 = useRef<IParallax>(null);
  const [temp, setTemp] = useState(0);
  const [temp1, setTemp1] = useState(0);
  const [temp2, setTemp2] = useState(0);

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
    }
  };

  const sideScroll = (to: number) => {
    if (parallax1.current) {
      setTemp(temp + 1)
      parallax1.current.scrollTo(temp);
      if (temp === 2) setTemp(0);
    }
  };

  const sideScroll2 = (to: number) => {
    if (parallax2.current) {
      setTemp1(temp1 + 1)
      parallax2.current.scrollTo(temp1);
      if (temp1 === 2) setTemp1(0);
    }
  };

  const sideScroll3 = (to: number) => {
    if (parallax3.current) {
      setTemp2(temp2 + 1)
      parallax3.current.scrollTo(temp2);
      if (temp2 === 2) setTemp2(0);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(function () {
      // Hide the address bar!
      window.scrollTo(0, 1);
    }, 0);

    return () => clearTimeout(timeout);
  })

  return (
    <div
      style={{
        width: "100%",
        position: "absolute",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Parallax className="lax" ref={parallax} pages={10} config={config.slow}>
        {/* PAGE ONE */}
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={8}
          style={{
            background: svg("stars", true),
          }}
        />
        <ParallaxLayer onClick={() => scroll(1)} offset={0} speed={0} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
            <ParallaxLayer
              offset={0}
              speed={-0.4}
              // factor={2}
              style={{
                position: "relative",
                height: "fit-content",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <div className="lax-container">
                <h1 style={{ color: "lightgray", margin: 0, fontSize: "4rem" }}>
                  Sean Cotter
                </h1>
              <img
                className="scrollimage"
                width="50%"
                src="/images/linkedin_pic.jpg"
                alt="profile"
                />
                <p>Click or Scroll to navigate</p>
                {/* <p className="text">
                  I'm a full stack web developer based outside of Philadelphia, PA.
                  During almost all of my free time I can be found at my computer
                  with a scratch.js file just exploring new API's and what they have
                  to offer or getting really sweaty playing some games with my
                  friends. If I'm not at my desk I'm exploring the nearest farmers
                  market with my family or playing fire trucks with my 2 year old
                  son... who just might love those trucks more than me!
                </p> */}
                <h2 style={{ fontSize:'2rem'}}>Full Stack Web Developer</h2>
              </div>
            </ParallaxLayer>
        </ParallaxLayer>
        {/* PAGE TWO */}
        <ParallaxLayer
          offset={1}
          speed={0.6}
          style={{
            zIndex: 1,
            height: "5vh",
            width: "100%",
          }}
        >
          <i className="fas fa-arrow-right fa-2x"></i>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={0}
          onClick={() => sideScroll(1)}
          className="split-page"
        >
          <div
            style={{
              background: "black",
              width: "100vw",
              position: "absolute",
              top: 0,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Parallax horizontal ref={parallax1} pages={3} config={config.slow}>
              <ParallaxLayer
                offset={0}
                speed={0}
                factor={3}
                style={{
                  background: svg("stars", true),
                }}
              />

              <ParallaxLayer
                offset={0}
                speed={0.5}
                onClick={() => sideScroll(1)}
                className="split-page"
              >
                <div className="split-text">
                  <h2>This is my family</h2>
                  <p>
                    They are truly one of a kind, I wouldn't be half the man I
                    am today without them. This is me, my wife Cait and our son
                    Liam.
                  </p>
                </div>
                <div
                  className="split-picture"
                  style={{
                    backgroundImage: "url(/images/parallax/min/family.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </ParallaxLayer>
              <ParallaxLayer
                offset={1}
                speed={0.5}
                onClick={() => sideScroll(2)}
                className="split-page"
              >
                <div
                  className="split-picture"
                  style={{
                    backgroundImage:
                      "url(/images/parallax/min/firefighter.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="split-text">
                  <h2>My little hero</h2>
                  <p>
                    Liam is obsessed with fire engines, fire fighters, police,
                    ambulances... It's really anything that makes loud noises, I
                    think.
                  </p>
                </div>
              </ParallaxLayer>
              <ParallaxLayer
                offset={2}
                speed={0.5}
                onClick={() => scroll(2)}
                className="split-page"
              >
                <div className="split-text">
                  <h2>And Spud</h2>
                  <p>
                    The best dog in the world. He was the discount puppy at the
                    discount puppy store that my wife and I bought when we
                    didn't have 2 pennies to rub together. He may derp but he
                    good boi.
                  </p>
                </div>
                <div
                  className="split-picture"
                  style={{
                    backgroundImage: "url(/images/parallax/min/dawg.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </ParallaxLayer>
            </Parallax>
          </div>
        </ParallaxLayer>
        {/* PAGE THREE */}
        <ParallaxLayer
          offset={2}
          speed={0.6}
          style={{
            zIndex: 1,
            height: "5vh",
            width: "100%",
          }}
        >
          <i className="fas fa-arrow-right fa-2x"></i>
        </ParallaxLayer>
        <ParallaxLayer
          offset={2}
          speed={0}
          onClick={() => sideScroll2(1)}
          className="split-page"
        >
          <div
            style={{
              background: "black",
              width: "100vw",
              position: "absolute",
              top: 0,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Parallax horizontal ref={parallax2} pages={3} config={config.slow}>
              <ParallaxLayer
                offset={0}
                speed={0}
                factor={6}
                style={{
                  background: svg("stars", true),
                }}
              />

              <ParallaxLayer
                offset={0}
                speed={0.5}
                onClick={() => sideScroll2(1)}
                className="split-page"
              >
                <div
                  className="split-picture"
                  style={{
                    backgroundImage: "url(/images/parallax/min/build.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="split-text">
                  <h2>I've always loved to build things</h2>
                  <p>
                    I've always loved to build things... A trait that I hope my
                    son develops in time, even if - as my wife says - "You can
                    buy that for $10 more and it'll take half the time!".
                  </p>
                </div>
              </ParallaxLayer>
              <ParallaxLayer
                offset={1}
                speed={0.5}
                onClick={() => sideScroll2(2)}
                className="split-page"
              >
                <div
                  className="split-picture"
                  style={{
                    backgroundImage: "url(/images/parallax/min/break.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="split-text">
                  <h2>Oooh covid projects...</h2>
                  <p>
                    There's just something about that moment where you can sit
                    back and appreciate the progress you've made.
                  </p>
                </div>
              </ParallaxLayer>
              <ParallaxLayer
                offset={2}
                speed={0.5}
                onClick={() => scroll(3)}
                className="split-page"
              >
                <div className="split-text"></div>
                <div
                  className="split-picture"
                  style={{
                    backgroundImage: "url(/images/parallax/min/dawg.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </ParallaxLayer>
            </Parallax>
          </div>
        </ParallaxLayer>
        {/* PAGE FOUR */}
        <ParallaxLayer
          offset={3}
          speed={0.6}
          style={{
            zIndex: 1,
            height: "5vh",
            width: "100%",
          }}
        >
          <i className="fas fa-arrow-right fa-2x"></i>
        </ParallaxLayer>
        <ParallaxLayer
          offset={3}
          speed={0}
          onClick={() => sideScroll3(1)}
          className="split-page"
        >
          <div
            style={{
              background: "black",
              width: "100vw",
              position: "absolute",
              top: 0,
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Parallax horizontal ref={parallax3} pages={3} config={config.slow}>
              <ParallaxLayer
                offset={0}
                speed={0}
                factor={6}
                style={{
                  background: svg("stars", true),
                }}
              />

              <ParallaxLayer
                offset={0}
                speed={0.5}
                onClick={() => sideScroll3(1)}
                className="split-page"
              >
                <div className="split-text">
                  <h2>I used to work in construction</h2>
                  <p>blob</p>
                </div>
                <div
                  className="split-picture"
                  style={{
                    backgroundImage:
                      "url(/images/parallax/min/construction2.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </ParallaxLayer>
              <ParallaxLayer
                offset={1}
                speed={0.5}
                onClick={() => sideScroll3(2)}
                className="split-page"
              >
                <div
                  className="split-picture"
                  style={{
                    backgroundImage:
                      "url(/images/parallax/min/construction.jpeg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="split-text">
                  <h2>For almost 9 years...</h2>
                </div>
              </ParallaxLayer>
              <ParallaxLayer
                offset={2}
                speed={0.5}
                onClick={() => scroll(4)}
                className="split-page"
              >
                <div className="split-text"></div>
                <div
                  className="split-picture"
                  style={{
                    backgroundImage: "url(/images/parallax/min/in_loader.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </ParallaxLayer>
            </Parallax>
          </div>
        </ParallaxLayer>
        {/* PAGE FIVE */}
        <ParallaxLayer sticky={{ start: 4, end: 7 }}>
          <img
            src="/images/fulls/computer.png"
            alt="slpash"
            className="sticky-left"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={4}>
          {/* <img src='/images/fulls/computer.png' alt='slpash' className='sticky-right' /> */}
          <div className="sticky-right-text">
            <h2>About Me</h2>
            <p>
              Overall I'm just a guy who's not afraid to roll up his sleeves and get his
              hands dirty, looking to take his passion and experience in
              building incredible things from the ground up and leverage it in
              the world of software engineering. Self-taught programmer
              who recently graduated App Academy's 24 week Full Stack Software Engineering 
              program covering Javascript, Python and popular frameworks.
            </p>
            <p>
              During almost all of my free time I can be found at my computer
              with a scratch.js file just exploring new API's and what they have
              to offer or getting really sweaty playing some games with my
              friends. If I'm not at my desk I'm exploring the nearest farmers
              market with my family or playing fire trucks with my 2 year old
              son, who just might love those trucks more than me!
            </p>
            <p>
              I'd say I'm just a happy go lucky guy with a fantastic
              family/support system and maybe too many hobbies. I can't wait to
              see what we can do with tomorrow, let alone the rest of our time
              here.
            </p>
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={5}>
          <img
            src="/images/fulls/computer.png"
            alt="slpash"
            className="sticky-right"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={6}>
          <img
            src="/images/fulls/computer.png"
            alt="slpash"
            className="sticky-right"
          />
        </ParallaxLayer>
        <ParallaxLayer offset={7}>
          <img
            src="/images/fulls/computer.png"
            alt="slpash"
            className="sticky-right"
          />
        </ParallaxLayer>
        {/* <Image
          title="My name is Sean Cotter"
          text="My name is Sean Cotter."
          images={phillyImages}
          offset={1}
          onClick={() => scroll(1)}
        /> */}
        {/* 
        <Page
          customTop={"page1"}
          customBottom={"page1-bottom"}
          title="I'm a full stack web developer."
          text="Also known as a guy who's not afraid to roll up his sleeves and get his hands dirty. Self-taught programmer who recently graduated App Academy's Full Stack - Javascript and Python - 24 week Software Engineering bootcamp.

          During almost all of my free time I can be found at my computer with a scratch.js file just exploring new API's and what they have to offer or getting really sweaty playing some games with my friends. If I'm not at my desk I'm exploring the nearest farmers market with my family or playing fire trucks with my 2 year old son, who just might love those trucks more than me!

          All in all, I'm just a happy go lucky guy with a fantastic family/support system and maybe too many hobbies."
          offset={1}
          onClick={() => scroll(2)}
        />
        <Image
          text="Fun Fact:"
          title="I used to work in construction!"
          images={constructionImages}
          offset={2}
          onClick={() => scroll(3)}
        />
        <Page
          customTop="page2"
          customBottom={"page2-bottom"}
          title="I worked in Construction for ~ 9 years."
          text="In this time, a lot changed for me and my little family. What started out as just a j-o-b becoming a traffic flagger because I didn't know what else to do, I had found a passion for building and the teamwork it takes to see a massive, beautiful project come to life. I learned serious discipline, usually waking up at 4am, leaving at 5am, and arriving home most times after 7pm. This was hard work, and I loved it. It also provided my family the means to buy our first car, then our first house and also support my wife through her bachelors degree."
          offset={3}
          onClick={() => scroll(4)}
        />
        <Page
          customTop="page3"
          customBottom={"page3-bottom"}
          title="From the moment we had our baby boy..."
          text="Everything changed. My wife had quit her job in the city to find work closer to home and I had begun picking up side projects wondering if there were ways I could make money without the crazy hours I was accustomed to. "
          offset={4}
          onClick={() => scroll(5)}
        />
        <Page
          customTop="asdf"
          customBottom="asdf"
          title="1"
          text="hello"
          offset={5}
          onClick={() => scroll(0)}
        /> */}
      </Parallax>
    </div>
  );
}

{/* <animated.div
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
      <h2 style={{ color: "black" }}>I used to dig holes for a living.</h2>
      <p>
        Now, I create full-stack applications and web sites! I'm just a guy
        who's not afraid to roll up his sleeves and get his hands dirty; looking
        to take his passion and experience in building incredible things from
        the ground up and leverage it in the world of software engineering.
        Self-taught programmer who recently graduated App Academy's 24 week,
        full-stack Javascript / Python bootcamp.
      </p>
    </div>
  )}
</animated.div>; */}

// const springApi = useSpringRef();
// const { size, ...rest } = useSpring({
//   ref: springApi,
//   config: config.wobbly,
//   from: {
//     size: "20%",
//     background: "transparent",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: open ? "white" : "black",
//   },
//   to: {
//     size: open ? "60%" : "20%",
//     background: open ? "white" : "transparent",
//     color: open ? "black" : "white",
//   },
// });

// const transApi = useSpringRef();
// const transition = useTransition(open ? data : [], {
//   ref: transApi,
//   trail: 400 / data.length,
//   from: { opacity: 0, scale: 0 },
//   enter: { opacity: 1, scale: 1 },
//   leave: { opacity: 0, scale: 0 },
// });

// useChain(open ? [springApi, transApi] : [transApi, springApi], [
//   0,
//   open ? 0.1 : 0.6,
// ]);
