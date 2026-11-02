import http, { IncomingMessage, ServerResponse } from "http";

const PORT = 4000;

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url?.startsWith("/promise")) {
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
