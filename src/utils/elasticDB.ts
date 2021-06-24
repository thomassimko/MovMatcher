import { Client } from '@elastic/elasticsearch';
import { SearchResponse } from '@elastic/elasticsearch/api/types';

const client = new Client({ node: 'http://192.168.2.227:9200' });

export async function searchMovie(queryText: string) {
  const response = await client.search<SearchResponse<Movie>>({
    index: 'movies',
    body: {
      query: {
        match: {
          title: queryText,
        },
      },
    },
  });
  // eslint-disable-next-line no-underscore-dangle
  return response.body.hits.hits.map((item) => item._source);
}

export async function searchMovieFuzzy(queryText: string): Promise<Movie[]> {
  const withoutPunct = queryText.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ' ');

  const response = await client.search<SearchResponse<Movie>>({
    index: 'movies',
    body: {
      query: {
        match: {
          title: {
            query: withoutPunct,
            fuzziness: 2,
          },
        },
      },
    },
  });
  // eslint-disable-next-line no-underscore-dangle
  return response.body.hits.hits.map((item) => item._source);
}
