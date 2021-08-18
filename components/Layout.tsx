import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <style jsx global>{`
        html,
        body {
          line-height: 1.6;
          padding: 0;
          margin: 0;
          font-family: 'Lato', -apple-system, BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
        }
        body {
          font-size: 1.5rem;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: 'Noto Serif TC', -apple-system, BlinkMacSystemFont,
            Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          font-weight: 900;
          line-height: 1.25;
          margin-bottom: 0.35em;
        }
        h1 {
          font-size: 2.25rem;
        }
        h2 {
          font-size: 2rem;
        }
        h3 {
          font-size: 1.875rem;
        }
        h4 {
          font-size: 1.75rem;
        }
        h5 {
          font-size: 1.625rem;
        }
        h6 {
          font-size: 1.5rem;
        }
        .headline p {
          font-weight: 900;
          font-size: 1.875rem;
        }
        .markdown,
        .markdown p {
          text-align: center;
          font-size: 1.5rem;
        }
        .markdown ul {
          padding-left: 0;
          list-style: none;
        }
        p {
          font-weight: normal;
          font-size: 1.5rem;
          line-height: 1.5;
          margin: 0;
        }
        a {
          color: #bb5b34;
        }
      `}</style>
    </>
  );
}
