import { useRouter } from 'next/router';

export const config = { amp: true };

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  return <p>Post: {slug}</p>;
};

export default Post;
