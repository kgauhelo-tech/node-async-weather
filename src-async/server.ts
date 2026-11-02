import http, { IncomingMessage, ServerResponse } from "http";
// import { dataRoute } from "./routes/data";

// TODO; Test the endpoint

const PORT: number = 4000;
const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/async")) {
    // dataRoute(req, res);
  } else {
    res.writeHead(400, {
      "content-type": "application/json",
    });
    res.end(JSON.stringify({ message: "Endpoint does not exist" }));
  }
};

const server = http.createServer(requestListener);

server.listen(PORT);
