import { getPosts } from '../lib/api';

const Index = (): JSX.Element => <></>;

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
