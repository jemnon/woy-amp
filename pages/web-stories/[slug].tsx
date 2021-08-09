import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';
import AmpAnalytics from '../../components/amp/AmpAnalytics';
import { siteMeta } from '../../lib/constants';
import { getAllAmpPosts, getPostBySlug } from '../../lib/api';
import { getAggregteRating } from '../../lib/aggregate-rating';
import { GA_TRACKING_ID } from '../../lib/gtag';

export const config = { amp: true };

const ctaLabel = 'Get Recipe';

const parseIngredientsMD = (content?: string): any => {
  const parseContent = content?.split('-').filter(item => item !== '');
  return parseContent;
};

export default function Post({ post }: any): JSX.Element {
  const router = useRouter();

  if (!router.isFallback && !post) {
    return <ErrorPage statusCode={404} />;
  }

  const aggregateRating = getAggregteRating(post?.comments?.comments);

  const schemaJson = {
    '@context': 'http://schema.org',
    '@type': 'Recipe',
    name: post?.title,
    author: {
      '@type': 'Person',
      name: siteMeta.AUTHOR,
    },
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: `${aggregateRating?.ratingsAvg}`,
        reviewCount: `${aggregateRating?.ratingsTotal}`,
      },
    }),
    datePublished: post?.publishDate,
    description: post?.bodyPreview,
    image: post?.webStoryCollection?.items[0]?.coverPageAsset?.url,
    ...(post?.ingredients && {
      recipeIngredient: parseIngredientsMD(post?.ingredients),
    }),
    recipeInstructions: post?.instructions,
    recipeYield: post?.servings,
  };

  return (
    <Layout>
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <>
          <Head>
            <title>{post?.title}</title>
            <link
              rel="canonical"
              href={`${siteMeta.COM_URL}/post/${post?.slug}`}
            />
            <meta property="og:locale" content="en_US" />
            <meta name="description" content={post?.bodyPreview} />
            <meta
              name="url"
              content={`${siteMeta.APP_URL}/web-stories/${post?.slug}`}
            />
            <meta name="title" content={`${post?.title} | ${siteMeta.TITLE}`} />
            <meta
              name="image"
              content={post?.webStoryCollection?.items[0]?.coverPageAsset?.url}
            />
            <meta property="og:description" content={post?.bodyPreview} />
            <meta
              property="og:url"
              content={`${siteMeta.APP_URL}/web-stories/${post?.slug}`}
            />
            <meta
              property="og:title"
              content={`${post?.title} | ${siteMeta.TITLE}`}
            />
            <meta
              property="og:image"
              content={post?.webStoryCollection?.items[0]?.coverPageAsset?.url}
            />
            <meta name="twitter:description" content={post?.bodyPreview} />
            <meta
              name="twitter:url"
              content={`${siteMeta.APP_URL}/web-stories/${post?.slug}`}
            />
            <meta
              name="twitter:title"
              content={`${post?.title} | ${siteMeta.TITLE}`}
            />
            <meta
              name="twitter:image"
              content={post?.webStoryCollection?.items[0]?.coverPageAsset?.url}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
            />
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
            <script
              async
              key="amp-video"
              custom-element="amp-analytics"
              src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
            />
          </Head>
          <amp-story
            standalone=""
            title={`${post?.title}`}
            publisher="Whipser of Yum"
            publisher-logo-src="/logo-black.png"
            poster-portrait-src={`${post?.webStoryCollection?.items[0]?.coverPageAsset?.url}`}
          >
            <amp-story-page id="cover" auto-advance-after="8s">
              <amp-story-grid-layer template="fill">
                <amp-img
                  alt={post?.title}
                  animate-in="zoom-in"
                  scale-start="1.1"
                  scale-end="1.4"
                  animate-in-duration="10s"
                  src={`${post?.webStoryCollection?.items[0]?.coverPageAsset?.url}`}
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
                      {post?.webStoryCollection?.items[0]?.coverPageTitle}
                    </h2>
                  </div>
                </div>
              </amp-story-grid-layer>
              <amp-story-page-attachment
                class="cta"
                layout="nodisplay"
                cta-text={ctaLabel}
                href={`https://whisperofyum.com/post/${post?.slug}`}
              />
            </amp-story-page>
            {post?.webStoryCollection?.items[0]?.storyPagesCollection?.items?.map(
              (page: any, key: number) => (
                <amp-story-page
                  id={`page${key + 1}`}
                  key={`page-${key}`}
                  auto-advance-after="8s"
                >
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
                    href={`https://www.whisperofyum.com/post/${post?.slug}`}
                  />
                </amp-story-page>
              ),
            )}
            <amp-story-page id="last-page">
              <amp-story-grid-layer template="fill">
                <amp-img
                  alt={post?.title}
                  animate-in="zoom-in"
                  scale-start="1.1"
                  scale-end="1.4"
                  animate-in-duration="10s"
                  src={`${post?.webStoryCollection?.items[0]?.lastPageAsset?.url}`}
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
                        {
                          post?.webStoryCollection?.items[0]
                            ?.lastPageDescription
                        }
                      </Markdown>
                    </h4>
                  </div>
                </div>
              </amp-story-grid-layer>
              <amp-story-page-attachment
                class="cta"
                layout="nodisplay"
                cta-text={ctaLabel}
                href={`https://www.whisperofyum.com/post/${post?.slug}`}
              />
            </amp-story-page>
            <AmpAnalytics
              type="googleanalytics"
              script={{
                vars: {
                  account: GA_TRACKING_ID,
                  gtag_id: GA_TRACKING_ID,
                  config: {
                    [GA_TRACKING_ID as string]: { groups: 'default' },
                  },
                },
                triggers: {
                  trackPageview: {
                    on: 'visible',
                    request: 'pageview',
                  },
                },
              }}
            />
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
        </>
      )}
    </Layout>
  );
}

export async function getStaticPaths(): Promise<any> {
  const data = await getAllAmpPosts();
  return {
    paths: data?.map(({ slug }: any) => `/web-stories/${slug}`) ?? [],
    fallback: true,
  };
}

export async function getStaticProps({
  params,
  preview = false,
}: any): Promise<any> {
  const data = await getPostBySlug(params?.slug, preview);
  return {
    props: {
      preview,
      post: data ?? null,
    },
    revalidate: 1,
  };
}
