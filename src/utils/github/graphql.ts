// GitHub GraphQL API utilities
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export async function fetchGraphQL(query: string, variables: Record<string, any> = {}) {
  const token = process.env.GITHUB_TOKEN;
  
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data from GitHub GraphQL API');
  }

  return response.json();
}