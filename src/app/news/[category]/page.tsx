import fetchNews from "../../../../utils/fetchNews";
import NewsList from "@/app/NewsList";

type Props = {
  params: { category: Category };
};

async function page({ params: { category } }: Props) {
  const news: NewsResponse = await fetchNews(category);
  return (
    <div>
      <h1 className="headerTitle">{category}</h1>
      <NewsList news={news} />
    </div>
  );
}

export default page;
