import React from "react";
import fetchNews from "../../utils/fetchNews";
import { categories } from "../../constants";
import NewsList from "./NewsList";
import response from "../../response.json";

const HomePage = async () => {
  const news: NewsResponse =
    response || (await fetchNews(categories.join(",")));

  // const news: NewsResponse = await fetchNews(categories.join(","));

  console.log("---------");
  return (
    <div>
      <NewsList news={news} />
    </div>
  );
};

export default HomePage;
