export default function sortNewsByImage(news: NewsResponse) {
  const newsWithImage = news.data.filter((item) => item.image !== null);
  const newWithoutImage = news.data.filter((item) => item.image === null);

  const sortedNewsResponse = {
    pagination: news.pagination,
    data: [...newsWithImage, ...newWithoutImage],
  };

  return sortedNewsResponse;
}
