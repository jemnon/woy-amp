import Head from 'next/head';
import Layout from '../components/Layout';

const Index = (): JSX.Element => (
  <Layout>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
  </Layout>
);

export default Index;

/* interface StaticProps {
  redirect: {
    destination: string;
    permanent: boolean;
  };
}

export const getStaticProps = async (): Promise<StaticProps> => {
  const data = await getPosts();
  const slug = data[0]?.slug;
  return {
    redirect: {
      destination: `/${slug}`,
      permanent: false,
    },
  };
}; */
