export const fetchGraphQL = async (query: string): Promise<any> => {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(fetchUrl, fetchOptions).then(response =>
      response.json(),
    );
    return data;
  } catch (error) {
    throw new Error('Could not fetch data from Contentful!');
  }
};

const POST_GRAPHQL_FIELDS = `
  slug
  title
  publishDate
  enableAmp
  webStoryCollection {
    items {
      coverPageTitle
      coverPageAsset {
        url
      }
      lastPageUrl
      lastPageDescription
      lastPageAsset {
        url
      }
    }
  }
`;

export const getPosts = async (): Promise<any> => {
  const query = `{
    postCollection(where: { enableAmp: true }) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`;
  const response = await fetchGraphQL(query);
  return response?.data?.postCollection.items;
};

export const getPostBySlug = async (slug: string): Promise<any> => {
  const query = `{
    postCollection(where: { slug: "${slug}" }, limit: 1) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`;
  const response = await fetchGraphQL(query);
  return response?.data?.postCollection.items;
};
