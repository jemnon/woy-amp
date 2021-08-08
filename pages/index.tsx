import Link from 'next/link';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import Layout from '../components/Layout';
import { getAllAmpPosts } from '../lib/api';

const Index = ({ posts }: any): JSX.Element => {
  const router = useRouter();

  if (!router.isFallback && !posts) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Head>
        <meta name="robots" content="noindex" />
        {router.isFallback ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {posts.map((post: any, key: number) => (
              <li key={`post-${key}`}>
                <Link href={`/web-stories/${post.slug}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </Head>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const data = await getAllAmpPosts();
  return {
    props: {
      posts: data ?? null,
    },
  };
}
