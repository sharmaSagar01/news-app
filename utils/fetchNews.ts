import { gql } from "graphql-request";
import sortNewsByImage from "./sortNewsByImage";

const fetchNews = async (
  category?: Category | string,
  keywords?: string,
  isDynamic?: boolean
) => {
  // GraphQL Query
  const query = gql`
    query MyQuery(
      $access_key: String!
      $categories: String!
      $keywords: String
    ) {
      myQuery(
        access_key: $access_key
        categories: $categories
        countries: "gb"
        sort: "published_desc"
        keywords: $keywords
      ) {
        data {
          author
          category
          country
          description
          image
          language
          published_at
          source
          title
          url
        }
        pagination {
          count
          offset
          limit
          total
        }
      }
    }
  `;
  // Fetch function with Next.js 13 caching..
  const res = await fetch(
    "https://agueda.stepzen.net/api/live-news/__graphql",
    {
      method: "POST",
      cache: isDynamic ? "no-cache" : "default",
      next: isDynamic ? { revalidate: 0 } : { revalidate: 20 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Apikey ${process.env.STEPZEN_API_KEY}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          access_key: process.env.MEDIASTACK_API_KEY,
          categories: category,
          keywords: keywords,
        },
      }),
    }
  );

  console.log("LOADING NEW DATA FROM API for category >>>", category, keywords);

  const newsResponse = await res.json();

  const news = sortNewsByImage(newsResponse.data.myQuery);
  return news;
};

export default fetchNews;

// stepzen import curl http://api.mediastack.com/v1/news?access_key=7b30605f2d4927f9c708d77da2d78f01&sources=business,sports
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=7b30605f2d4927f9c708d77da2d78f01&countries=us%2Cgb&limit=100&offset=0&sort=published_desc"
// stepzen import curl "http://api.mediastack.com/v1/news?access_key=7b30605f2d4927f9c708d77da2d78f01"
