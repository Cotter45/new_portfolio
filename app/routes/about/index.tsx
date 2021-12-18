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

interface PageProps {
  offset: number;
  gradient: string;
  onClick: () => void;
}

interface ImageProps {
  offset: number;
  onClick: () => void;
}

const Page = ({ offset, gradient, onClick }: PageProps) => (
  <>
    <ParallaxLayer offset={offset} speed={0.2} style={{ cursor: 'pointer' }}>
      <div className='slopeBegin' />
    </ParallaxLayer>

    <ParallaxLayer offset={offset} speed={0.6} onClick={onClick}>
      <div className={`slopeEnd ${gradient}`} />
    </ParallaxLayer>

    <ParallaxLayer
      className='text number'
      offset={offset}
      speed={0.3}
      style={{ marginLeft: '5%'}}
    >
      <span>0{offset + 1}</span>
    </ParallaxLayer>
  </>
);

const Image = ({ offset, onClick }: ImageProps) => (
  <>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '41%', marginTop: '15%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/1.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '25%', marginTop: '15%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/2.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '8.5%', marginTop: '15%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/3.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '-8%', marginTop: '15%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/4.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '-24.5%', marginTop: '15%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/5.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '-41%', marginTop: '15%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/6.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '41%', marginTop: '-1.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/7.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '25%', marginTop: '-1.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/8.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '8.5%', marginTop: '-1.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/9.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '-8%', marginTop: '-1.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/10.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '-24.5%', marginTop: '-1.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/11.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '-41%', marginTop: '-1.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/12.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '41%', marginTop: '-17.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/13.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '25%', marginTop: '-17.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/14.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '8.5%', marginTop: '-17.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/15.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '-8%', marginTop: '-17.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/16.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={-0.1} style={{ marginLeft: '-24.5%', marginTop: '-17.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/17.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer onClick={onClick} offset={0} speed={0} style={{ marginLeft: '-41%', marginTop: '-17.5%' }}>
      <img width='16.5%' src="/images/fulls/philly_tiles/18.png" alt="tile" />
    </ParallaxLayer>
    <ParallaxLayer
      className='text number'
      offset={offset}
      speed={0}
      style={{ marginLeft: '5%'}}
    >
      <span>From outside Philadelphia</span>
    </ParallaxLayer>
  </>
);


export default function About() {
  const [open, set] = useState(false);
  const parallax = useRef<IParallax>(null);

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

  const scroll = (to: number) => {
    if (parallax.current) {
      parallax.current.scrollTo(to);
    }
  };

  return (
    <div style={{ background: "black", width: '100%', position: 'absolute', height: '90vh' }}>
      <Parallax
        className='container'
        ref={parallax}
        pages={6}
      >
        <Image offset={0} onClick={() => scroll(1)} />
        <Page offset={1} gradient="teal" onClick={() => scroll(2)} />
        <Page offset={2} gradient="tomato" onClick={() => scroll(3)} />
        <Page offset={3} gradient="pink" onClick={() => scroll(4)} />
        <Page offset={4} gradient="tomato" onClick={() => scroll(5)} />
        <Page offset={5} gradient="pink" onClick={() => scroll(0)} />
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
