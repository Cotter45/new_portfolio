import type { MetaFunction } from "remix";
import Particles from "./particles";
import ThreeD from "./three";

// type IndexData = {
//   demos: Array<{ name: string; to: string }>;
// };

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
// export let loader: LoaderFunction = () => {
//   let data: IndexData = {
//     demos: [
//       {
//         to: "demos/actions",
//         name: "Actions"
//       },
//       {
//         to: "demos/about",
//         name: "Nested Routes, CSS loading/unloading"
//       },
//       {
//         to: "demos/params",
//         name: "URL Params and Error Boundaries"
//       }
//     ]
//   };

//   // https://remix.run/api/remix#json
//   return json(data);
// };

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Sean Cotter",
    description: "Welcome to my portfolio!"
  };
};

export default function Index() {

  return (
    <>
      <Particles />
      <ThreeD />
      <div className="container column" id="no_scroll">
        <aside className='container column splash_text'>
          {/* <h1>Sean Cotter</h1> */}
          {/* <p>This is my personal portfolio site. Here you can find 
            my story, my projects, contact me and more. I hope you enjoy it!
          </p> */}
        </aside>
        <img id='selfie' src='/images/linkedin_pic.jpg' alt='me' />
      </div>
    </>
  );
}
