import type { MetaFunction } from "remix";
import CanvasFun from "./canvas";
import Particles from "./particles";

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
    <div className="container column" id="no_scroll">
      <main>
        <CanvasFun />
        {/* <h2>Welcome to Remix!</h2>
        <p>We're stoked that you're here. 🥳</p>
        <p>
          Feel free to take a look around the code to see how Remix does things,
          it might be a bit different than what you’re used to. When you're
          ready to dive deeper, we've got plenty of resources to get you
          up-and-running quickly.
        </p>
        <p>
          Check out all the demos in this starter, and then just delete the{" "}
          <code>app/routes/demos</code> and <code>app/styles/demos</code>{" "}
          folders when you're ready to turn this into your next project.
        </p> */}
        <Particles />
        <aside className='container column splash_text'>
          <h3>I'm a Web Developer from Philadelphia</h3>
          <p>This is my personal portfolio site. Here you can find 
            my story, my projects, contact me and more. I hope you enjoy it!
          </p>
        </aside>
      </main>
    </div>
  );
}
