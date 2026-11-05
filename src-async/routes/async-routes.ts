import { IncomingMessage, ServerResponse } from "http";
import { fetchWeather } from "../controllers/weather";
import { fetchHeadlines } from "../controllers/headlines";

// test this implementation using: `http://localhost:4000/async?at=-28.1036&lon=26.8669`

export const asyncRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method === "GET" && req.url?.startsWith("/async")) {
    try {
      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      const latitude = Number(parsedUrl.searchParams.get("lat"));
      const longitude = Number(parsedUrl.searchParams.get("lon"));

      if (isNaN(latitude) || isNaN(longitude)) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            errorMessage:
              "Make sure to provide valid latitude and longitude values",
          }),
        );
        return;
      }

      const weatherData = await fetchWeather({ latitude, longitude });
      const headlineData = await fetchHeadlines();
      const returnData = { weatherData, headlineData };

      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(returnData));
      return;
    } catch (error) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ errorMessage: `${error}` }));
      return;
    }
  }

  res.writeHead(400, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      errorMessage: "Make sure you use the correct endpoint",
    }),
  );
};
