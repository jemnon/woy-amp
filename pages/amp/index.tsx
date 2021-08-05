import ContentfulApi from '../../utils/ContentfulApi';

export const config = { amp: true };

export default function AmpIndex(props: any) {
  console.log('props: ', props);
  return <div>amp index</div>;
}

export async function getStaticProps() {
  const data = await ContentfulApi.getPosts();
  return {
    props: {
      ...data,
    },
  };
}
