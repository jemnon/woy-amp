import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import { getPosts, getPostBySlug } from '../lib/api';

export const config = { amp: true };

interface PostProps {
  coverPageTitle?: string;
  publishDate?: string;
  slug?: string;
  title?: string;
}

const Post = ({ coverPageTitle, publishDate, slug, title }: PostProps) => {
  /* const router = useRouter();

  if (!slug) {
    return <ErrorPage statusCode={404} />;
  } */

  return <p>Title: {slug}</p>;
};

export default Post;

export const getStaticProps = async ({
  params,
}: any): Promise<Record<string, any>> => {
  const [{ slug, title, publishDate, webStoryCollection }] =
    await getPostBySlug(params.slug);

  const [{ coverPageTitle, coverPageAsset }] = webStoryCollection.items;
  return {
    props: {
      coverPageTitle,
      url: coverPageAsset.url,
      publishDate,
      slug,
      title,
    },
  };
};

export const getStaticPaths = async (): Promise<Record<string, any>> => {
  const data = await getPosts();
  return {
    paths: data?.map(({ slug }: any) => `/${slug}`) ?? [],
    fallback: true,
  };
};
