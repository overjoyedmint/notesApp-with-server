const path = require("path");
const fs = require("fs");
const http = require("http");

const server = http.createServer((request, response) => {
  let filePath = path.join(
    __dirname,
    "public",
    request.url === "/" ? "index.html" : request.url
  );
  let contentType = getContentType(filePath) || "text/html";
  let notFound = path.join(__dirname, "public", "404.html");
  fs.readFile(filePath, "utf8", (err, content) => {
    if (err) {
      if (err.code === "ENDENT") {
        fs.readFile(notFound, "utf8", (err, content) => {
          response.writeHead(200, { "Content-Type": "contentType" });
          response.end(content);
        });
      }else{
          response.writeHead(500)
          response.end('Error')
      }
    }
    if(!err){
      response.writeHead(200, {'Content-Type': contentType})
      response.end(content)
    }
  });

  //   if (request.url === "/") {
  //     let filePath = path.join(__dirname, "public", "index.html");
  //     fs.readFile(filePath, "utf8", (err, data) => {
  //       response.writeHead(200, { "Content-Type": "text/html" });
  //       response.end(data);
  //       console.log(filePath);
  //     });
  //   }
  //   if (request.url === "/index2.html") {
  //     let filePath = path.join(__dirname, "public", "index2.html");
  //     fs.readFile(filePath, "utf8", (err, data) => {
  //       response.writeHead(200, { "Content-Type": "text/html" });
  //       response.end(data);
  //       console.log(filePath);
  //     });
  //   }
});

const getContentType = (filePath) => {
  let extname = path.extname(filePath);
  if (extname === ".css") {
    return "text/css";
  }
};

const port = 5000;

server.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
