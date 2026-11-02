import { article } from "../models/headlinesModel";

export function fetchHeadlines(
  callback: (error: Error | null, headlines: string[]) => void,
) {
  setTimeout(async () => {
    try {
      const url: string = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.sabcnews.com%2Fsabcnews%2Fsouth-africa%2Ffeed%2F`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error fetching news");

      const data: any = await response.json();

      const headlines: string[] = data.items.map((item: any) => item.title);

      callback(null, headlines);
    } catch (error) {
      callback(error as Error, []);
    }
  }, 0);
}
