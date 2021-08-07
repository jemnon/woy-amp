export async function fetchGraphQL(
  query: string,
  preview = false,
): Promise<any> {
  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;

  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${
        preview
          ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
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
}

const POST_GRAPHQL_FIELDS = `
  bodyPreview
  slug
  title
  publishDate
  enableAmp
  totalTime
  servings
  ingredients
  optionalIngredients
  instructions
  webStoryCollection(limit: 1) {
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
      storyPagesCollection(limit: 30) {
        items {
          title
          description
          asset {
            url
          }
        }
      }
    }
  }
`;

export async function getAllAmpPosts(preview = false): Promise<any> {
  const query = `{
    postCollection(where: { enableAmp: true }, preview: ${
      preview ? 'true' : 'false'
    }) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`;
  const response = await fetchGraphQL(query, preview);
  console.log(
    '[fetch graphql all amp posts resp]: ',
    response?.data?.postCollection?.items,
  );
  return response?.data?.postCollection?.items;
}

export async function getPostBySlug(
  slug?: string,
  preview = false,
): Promise<any> {
  const query = `{
    postCollection(where: { slug: "${slug}" }, preview: ${
    preview ? 'true' : 'false'
  }, limit: 1) {
      items {
        ${POST_GRAPHQL_FIELDS}
      }
    }
  }`;
  const response = await fetchGraphQL(query, preview);
  console.log(
    '[fetch graphql all post by slug resp]: ',
    response?.data?.postCollection?.items[0],
  );
  return response?.data?.postCollection?.items[0];
}
