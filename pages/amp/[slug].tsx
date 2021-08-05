import { useRouter } from 'next/router';
import ContentfulApi from '../../utils/ContentfulApi';

export const config = { amp: true };

const Post = (props: any) => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Post: {JSON.stringify(props)}</p>;
};

export default Post;

export async function getStaticProps() {
  const data = await ContentfulApi.getPosts();
  return {
    props: {
      ...data,
    },
  };
}

export async function getStaticPaths() {
  const data = await ContentfulApi.getPosts();
  return {
    paths: data?.map(({ slug }: any) => `/amp/${slug}`) ?? [],
    fallback: true,
  };
}
