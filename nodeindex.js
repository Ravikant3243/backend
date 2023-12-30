const http = require("http");
const fs = require("fs");
const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;
const server = http.createServer((req, res) => {
  console.log("server started");
   console.log(products);
  console.log(req.url);
    if(req.url.startsWith('/product')){
      const arr=req.url.split('/');
      const ind=Number(arr[2]); // +id se bhi ho jata
      const product=products.find(p=> p.id===ind); 
      console.log(product);
      let modifiedindex=index.replace("**title**",product.title)
       .replace("**rating**",product.rating) 
       .replace("**price**",product.price)
       .replace("**url**",product.thumbnail);
        res.setHeader("Content-Type", "text/html");
        res.end(modifiedindex);
         return ;
   } 

    switch (req.url) {
    case "/":
      res.setHeader("Content-Type", "text/html");
      res.end(index);
      break;
    case "/api":
      res.setHeader("Content-Type", "application/json");
       res.end(JSON.stringify(data));
      break;
      
    default:
      res.writeHead(
        404,
        "jo bhi message , nahi v likhega to vo default likh dega"
      );
      res.end();
  }
});
server.listen(8080);
