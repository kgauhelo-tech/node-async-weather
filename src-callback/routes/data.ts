import { IncomingMessage, ServerResponse } from "http";
import { fetchHeadlines } from "../controllers/headlines";
import { fetchData } from "../controllers/main-controller";

// test using: http://localhost:4000/callback?lat=-28.1036&lon=26.8669

export const dataRoute = async (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/callback") && req.method === "GET") {
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
    }

    const returnData = await fetchData({ latitude, longitude });

    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify(returnData));

    return;
  }

  res.writeHead(400, { "content-type": "application/json" });
  res.end(
    JSON.stringify({ errorMessage: "Make sure you use the correct endpoint" }),
  );
};
