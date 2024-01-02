const productController=require('./controller/product');
 const express=require('express');
  const server=express();
  server.use((req,res,next)=>{
      console.log(req.method,req.ip,req.hostname,new Date(),req.get('User-Agent'));
       next();
    });
   server.use(express.json());

// products REST API  C R U D APIS
  
// CREATE (POST)
  server.post('/products',productController.createProduct)
  // READ (GET)
  server.get('/products',productController.getAllProducts)
  server.get('/products/:id',productController.getProduct)
  // UPDATE (PUT)
  server.put('/products/:id',productController.updateProduct)

 // DELETE ()
 server.delete('/products/:id',productController.deleteProduct)

server.get('/',(req,res)=>{
   res.json({"type":'GET'});
}) 
 server.post('/',(req,res)=>{
    res.json({"type":'POST'});
 })
  server.delete('/',(req,res)=>{
     res.json({"type":'delete'});
  })
  server.put('/',(req,res)=>{
     res.json({"type":'PUT'});
  })
 server.listen(8080,()=>{
     console.log("server started");
 });