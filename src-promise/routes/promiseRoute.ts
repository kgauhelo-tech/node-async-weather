import { IncomingMessage, ServerResponse } from "http";
import { fetchWeather } from "../controllers/weather";
import { fetchHeadlines } from "../controllers/headlines";

export const promiseRoute = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/promise") && req.method === "GET") {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const latitude = Number(parsedUrl.searchParams.get("lat"));
    const longitude = Number(parsedUrl.searchParams.get("lon"));

    if (isNaN(latitude) || isNaN(longitude)) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          errorMessage:
            "Missing or invalid latitude or longitude query parameters",
        }),
      );
      return;
    }

    const weatherPromise = fetchWeather({ latitude, longitude });
    const headlinesPromise = fetchHeadlines();

    return Promise.all([weatherPromise, headlinesPromise])
      .then(([weatherData, headlinesData]) => {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ weather: weatherData, headlines: headlinesData }),
        );
      })
      .catch((error) => {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ errorMessage: `Error fetching data ${error}` }),
        );
      });
  }
  res.writeHead(400, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      errorMessage: "Make sure you use the correct endpoint",
    }),
  );
};
