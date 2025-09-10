const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let filePath = "";

  switch (req.url.toLowerCase()) {
    case "/":
      filePath = "./index.html";
      break;
    case "/contact":
      filePath = "./contact.html";
      break;
    case "/shop":
      filePath = "./shop.html";
      break;
    case "/about":
      filePath = "./about.html";
      break;
    case "/faq":
      filePath = "./faq.html";
      break;
    default:
      filePath = "./notfound.html";
      break;
  }

  let data = fs.readFileSync(filePath, "utf-8");
  res.end(data);
});

const port = 8001;
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
