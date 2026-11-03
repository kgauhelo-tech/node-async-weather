export const fetchHeadlines = (): Promise<string[]> => {
  const url: string = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.sabcnews.com%2Fsabcnews%2Fsouth-africa%2Ffeed%2F`;

  return new Promise<string[]>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Error fetching news");

        return response.json();
      })
      .then((data: any) => {
        const headlines: string[] = data.items.map((item: any) => item.title);
        resolve(headlines);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
