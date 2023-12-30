 const express=require('express');
 const fs=require('fs');
 const data=JSON.parse(fs.readFileSync("data.json","utf-8"))
 const products=data.products;
 const server=express();

   server.use((req,res,next)=>{
      console.log(req.method,req.ip,req.hostname,new Date(),req.get('User-Agent'));
       next();
    });
server.use(express.json());

// products REST API  C R U D APIS
  
// CREATE (POST)

server.post('/products',(req,res)=>{
   products.push(req.body);
  res.json(products);
})
// READ (GET)
 server.get('/products',(req,res)=>{
       res.json(products);
 })
  // UPDATE (PUT)
  server.put('/products/:id',(req,res)=>{
         const ind=Number((req.params.id))     
          const index=products.findIndex(p=> p.id===ind);
             products.splice(index,1,{...req.body,id:ind})
             res.status(201).json(products);
  })

 // DELETE ()
 server.delete('/products/:id',(req,res)=>{
       const id=Number((req.params.id));
       const index=products.findIndex(p=> p.id===id);
        const prod=products[index];
        products.splice(index,1);
        res.status(201).json(products);
 })

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