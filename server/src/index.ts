import http, { IncomingMessage, ServerResponse } from "http";
import "dotenv/config";

const hostname = "localhost";
const port = 3000;

const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    switch (request.url) {
      case "/":
        if (request.method == "GET") {
          response.end("Hello bye everyone");
        }
        break;
      case "/test":
        if (request.method == "GET") {
          console.log("got here");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Access-Control-Allow-Methods", "GET");
          response.setHeader("Access-Control-Allow-Headers", "Content-Type");
          response.end(JSON.stringify("We are connected"));
        }
        break;

      default:
        response.statusCode = 404;
        response.end();
        break;
    }
  }
);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
