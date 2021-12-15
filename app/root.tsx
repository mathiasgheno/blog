import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from "remix";
import type { LinksFunction } from "remix";
import { Button } from './components/Button/Button';

import globalStylesUrl from "~/styles/global.css";
import darkStylesUrl from "~/styles/dark.css";
import {FC, useEffect, useState} from "react";

import { links as ButtonLinks } from './components/Button/Button';
import {getTheme} from "./utils/getTheme";

// https://remix.run/api/app#links
export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    // {
    //   rel: "stylesheet",
    //   href: darkStylesUrl,
    //   media: "(prefers-color-scheme: dark)"
    // },
    ...ButtonLinks(),
  ];
};

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export const ErrorBoundary = ({ error }: { error: Error }) => {return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
};

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <h1>
          {caught.status}: {caught.statusText}
        </h1>
        {message}
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

const Layout: FC = ({ children }) => {
  const [theme, setTheme] = useState<'Light' | 'Dark'>('Light');

  const handleThemeChange = () => {
    if(theme === 'Dark') setTheme('Light');
    if(theme === 'Light') setTheme('Dark');
  }

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return (
    <div className="remix-app">
      <header className="remix-app__header">
        <div className="container remix-app__header-content">
          <Link to="/" title="Remix" style={{fontSize: '22px'}}>
            Mathias G. Azzolini
          </Link>
          <div style={{display: 'flex', gap: '20px'}}>
            <nav aria-label="Main navigation" className="remix-app__header-nav">
              <ul style={{height: '100%'}}>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
              </ul>
            </nav>
            <div>
              <Button
                onClick={handleThemeChange}
                withoutStyles
                icon={theme}
              />
            </div>
          </div>
        </div>
      </header>
      <div className="remix-app__main">
        <div className="container remix-app__main-content">{children}</div>
      </div>
    </div>
  );
};
