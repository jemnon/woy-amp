import { useRouter } from 'next/router';
// import ErrorPage from 'next/error';
import Head from 'next/head';
import Markdown from 'react-markdown';
import Layout from '../components/Layout';
import { getPosts, getPostBySlug } from '../lib/api';

export const config = { amp: true };

const ctaLabel = 'Get Recipe';

export default function Post(props: any) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <Head>
        <script
          async
          key="amp-story"
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        />
        <script
          async
          key="amp-video"
          custom-element="amp-video"
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        />
      </Head>
      <amp-story
        standalone=""
        title={`${props.title}`}
        publisher="Whipser of Yum"
        publisher-logo-src="/logo-white.png"
        poster-portrait-src={`${props?.webStoryCollection?.items[0]?.coverPageAsset?.url}`}
      >
        <amp-story-page id="cover">
          <amp-story-grid-layer template="fill">
            <amp-img
              alt=""
              src={`${props?.webStoryCollection?.items[0]?.coverPageAsset?.url}`}
              width="720"
              height="1280"
              layout="responsive"
            />
          </amp-story-grid-layer>
          <amp-story-grid-layer className="darken" template="thirds">
            <div className="justify-center" grid-area="middle-third">
              <div>
                <div className="site-box">
                  <h1 className="title">whisperofyum.com</h1>
                </div>
                <h2 className="headline">
                  {props?.webStoryCollection?.items[0]?.coverPageTitle}
                </h2>
              </div>
            </div>
          </amp-story-grid-layer>
          <amp-story-page-attachment
            class="cta"
            layout="nodisplay"
            cta-text={ctaLabel}
            href={`https://www.whisperofyum.com/post/${props?.slug}`}
          />
        </amp-story-page>
        {props?.webStoryCollection?.items[0]?.storyPagesCollection?.items?.map(
          (page: any, key: number) => (
            <amp-story-page id={`page${key + 1}`} key={`page-${key}`}>
              <amp-story-grid-layer template="fill">
                <amp-img
                  alt=""
                  src={`${page.asset.url}`}
                  width="720"
                  height="1280"
                  layout="responsive"
                />
              </amp-story-grid-layer>
              <amp-story-grid-layer template="thirds">
                <div grid-area="upper-third">
                  <div className="box">
                    <Markdown className="markdown">
                      {page?.description}
                    </Markdown>
                  </div>
                </div>
              </amp-story-grid-layer>
              <amp-story-page-attachment
                class="cta"
                layout="nodisplay"
                cta-text={ctaLabel}
                href={`https://www.whisperofyum.com/post/${props?.slug}`}
              />
            </amp-story-page>
          ),
        )}
        <amp-story-page id="last-page">
          <amp-story-grid-layer template="fill">
            <amp-img
              alt=""
              src={`${props?.webStoryCollection?.items[0]?.lastPageAsset?.url}`}
              width="720"
              height="1280"
              layout="responsive"
            />
          </amp-story-grid-layer>
          <amp-story-grid-layer className="darken" template="thirds">
            <div className="justify-center" grid-area="middle-third">
              <div>
                <div className="site-box">
                  <h3 className="title">whisperofyum.com</h3>
                </div>
                <h4 className="headline">
                  <Markdown>
                    {props?.webStoryCollection?.items[0]?.lastPageDescription}
                  </Markdown>
                </h4>
              </div>
            </div>
          </amp-story-grid-layer>
          <amp-story-page-attachment
            class="cta"
            layout="nodisplay"
            cta-text={ctaLabel}
            href={`https://www.whisperofyum.com/post/${props?.slug}`}
          />
        </amp-story-page>
      </amp-story>
      <style jsx>{`
        amp-story {
          color: #fff;
        }
        .justify-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .headline,
        .headline p {
          text-align: center;
        }
        .headline {
          font-size: 1.875rem;
          font-weight: 900;
          margin-bottom: 0;
        }
        .darken {
          background-color: rgba(0, 0, 0, 0.26);
        }
        .box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          width: 100%;
          height: auto;
          background-color: rgba(17, 17, 17, 0.75);
        }
        .site-box {
          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 1.5rem;
          text-align: center;
          color: #fff;

          padding: 0.5rem;
          padding-top: 0.25rem;
          paddinb-bottom: 0.25rem;
          margin-bottom: 0.75rem;

          width: 100%;
          height: 100%;

          background-color: #bb5b34;
        }
        .site-box .title {
          font-size: 1.5rem;
          margin-bottom: 0;
        }
      `}</style>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<any> {
  const data = await getPosts();
  return {
    paths: data?.map(({ slug }: any) => `/${slug}`) ?? [],
    fallback: true,
  };
}

export async function getStaticProps({ params }: any): Promise<any> {
  const [data] = await getPostBySlug(params?.slug);
  return {
    props: {
      ...data,
    },
    revalidate: 1,
  };
}

export async function getServerSideProp({ params }: any): Promise<any> {
  const [data] = await getPostBySlug(params?.slug);
  return {
    props: {
      ...data,
    },
  };
}
