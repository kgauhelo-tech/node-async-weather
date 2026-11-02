import http, { IncomingMessage, ServerResponse } from "http";

const PORT = 4000;

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.url?.startsWith("/")) {
    }
    res.writeHead(400, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        errorMessage: "Please ensure that you have the correct endpoint",
      }),
    );
  },
);
