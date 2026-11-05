export const fetchHeadlines = async () => {
  const url: string = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.sabcnews.com%2Fsabcnews%2Fsouth-africa%2Ffeed%2F`;

  const response = await fetch(url);

  if (!response.ok) throw new Error("Error fetching news data");

  const data: any = await response.json();

  const headlines = data.items.map((item: any) => item.title);

  return headlines;
};
