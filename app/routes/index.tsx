import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";
type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = () => {
  let data: IndexData = {
    resources: [
      {
        name: "Remix Docs",
        url: "https://remix.run/docs"
      },
      {
        name: "React Router Docs",
        url: "https://reactrouter.com/docs"
      },
      {
        name: "Remix Discord",
        url: "https://discord.gg/VBePs6d"
      }
    ],
    demos: [
      {
        to: "demos/actions",
        name: "Actions"
      },
      {
        to: "demos/about",
        name: "Nested Routes, CSS loading/unloading"
      },
      {
        to: "demos/params",
        name: "URL Params and Error Boundaries"
      },
      {
        to: 'blog/media-queries',
        name: 'Media Queries'
      }
    ]
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData<IndexData>();

  return (
    <div className="remix__page">
      <main>
        <h2>Welcome!</h2>
        <p style={{textAlign: 'justify'}}>
          My name is Mathias Gheno Azzolini and I'm a Software Engineer.
          Since high school I've been working with IT.
          I'm graduated in Analysis and Development of Systems at IFRS and I'm postgraduate in Software Engineering at UFRGS.
          Currently I've been working with JavaScript technologies such as Node.js, TypeScript, React.js and much more.
          I'm {new Date().getFullYear() - 1995} years old and live in Porto Alegre, Brazil. I love eletronic music such as Psy Trance and Techno and I also love cats!
        </p>
        <p style={{textAlign: 'justify'}}>
          In this website you're going to find blog post about technology.
          If you want to contact me professionally you can send me a message at <a href="">Linkedin</a>.
          If you just want to learn from me you can check my blog posts <a href="/blog">here</a> or at <a
          href="https://medium.com/@mathiasghenoazzolini">Medium</a>.
          If you want to see shit posting you can follow me at <a href="https://twitter.com/mathiasgheno">Twitter</a>.
        </p>
      </main>
      {false && (
        <aside>
          <h2>Demos In This App</h2>
          <ul>
            {data.demos.map(demo => (
              <li key={demo.to} className="remix__page__resource">
                <Link to={demo.to} prefetch="intent">
                  {demo.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2>Resources</h2>
          <ul>
            {data.resources.map(resource => (
              <li key={resource.url} className="remix__page__resource">
                <a href={resource.url}>{resource.name}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
