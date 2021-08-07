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
        p {
          font-weight: normal;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </>
  );
}
