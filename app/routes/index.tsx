import type { MetaFunction } from "remix";

import Particles from "../canvas/particles";
import ThreeD from "../canvas/three";

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Sean Cotter",
    description: "Welcome to my portfolio!",
    name: "apple-mobile-web-app-capable", content: "yes"
  };
};

export default function Index() {

  return (
    <>
      <Particles />
      <ThreeD />
    </>
  );
}
