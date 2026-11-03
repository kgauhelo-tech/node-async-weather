import http, { IncomingMessage, ServerResponse } from "http";
import { promiseRoute } from "./routes/promiseRoute";

const PORT = 4000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/promise")) {
    promiseRoute(req, res);
  }
  res.writeHead(400, { "content-type": "application/json" });
  res.end(
    JSON.stringify({
      errorMessage: "Please ensure that you have the correct endpoint",
    }),
  );
};

const server = http.createServer(requestListener);

server.listen(PORT);
