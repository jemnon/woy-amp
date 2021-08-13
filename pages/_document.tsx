import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useAmp } from 'next/amp';

import { GA_TRACKING_ID } from '../lib/gtag';

function AmpWrap({ ampOnly, nonAmp }: any) {
  const isAmp = useAmp();
  if (ampOnly) return isAmp && ampOnly;
  return !isAmp && nonAmp;
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&family=Noto+Serif+TC:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="91DNH8D3DcbnVKZTTmRsEWrDG9c2Dn4CUuFgwNYNCVY"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          {/* Non-AMP - Google Analytics */}
          <AmpWrap
            nonAmp={
              <>
                <script
                  async
                  src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}');
                    `,
                  }}
                />
              </>
            }
          />
        </body>
      </Html>
    );
  }
}
