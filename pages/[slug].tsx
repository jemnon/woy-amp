import Head from 'next/head';
import Layout from '../components/Layout';
import { getPosts, getPostBySlug } from '../lib/api';

export const config = { amp: true };

interface PostProps {
  coverPageTitle?: string;
  publishDate?: string;
  slug?: string;
  title?: string;
}

const Post = (props: any) => {
  console.log('props: ', props);
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
        {/* <script
          async
          key="amp-analytics"
          custom-element="amp-analytics"
          src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
        />
        <script
          async
          key="amp-smartlinks"
          custom-element="amp-smartlinks"
          src="https://cdn.ampproject.org/v0/amp-smartlinks-0.1.js"
        /> */}
      </Head>
      <amp-story
        standalone
        title={props.title}
        publisher="Whipser of Yum"
        poster-portrait-src={
          props.webStoryCollection.items[0].coverPageAsset.url
        }
      >
        <amp-story-page id="cover">
          <amp-story-grid-layer template="fill">
            <amp-img
              alt=""
              src={props.webStoryCollection.items[0].coverPageAsset.url}
              width="720"
              height="1280"
              layout="responsive"
            />
          </amp-story-grid-layer>
          <amp-story-grid-layer class="darken-cover" template="thirds">
            <div grid-area="middle-third">
              <h1>{props.webStoryCollection.items[0].coverPageTitle}</h1>
            </div>
          </amp-story-grid-layer>
        </amp-story-page>
        <amp-story-page id="page-1">
          <amp-story-grid-layer template="thirds">
            <div grid-area="upper-third">page 1 text</div>
          </amp-story-grid-layer>
        </amp-story-page>
      </amp-story>
    </Layout>
  );
};

export default Post;

export const getStaticProps = async ({ params }: any): Promise<any> => {
  const [data] = await getPostBySlug(params.slug);

  return {
    props: {
      ...data,
    },
  };
};

export const getStaticPaths = async (): Promise<any> => {
  const data = await getPosts();
  return {
    paths: data?.map(({ slug }: any) => `/${slug}`) ?? [],
    fallback: true,
  };
};
