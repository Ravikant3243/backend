 const express=require('express');
 const fs=require('fs');
 const product=fs.readFileSync("data.json","utf-8")
 const server=express();
  // middleware function

    server.use((req,res,next)=>{
      console.log(req.method,req.ip,req.hostname,new Date(),req.get('User-Agent'));
      next(); // to not stop further execution
    });
//     const auth=(req,res,next)=>{
//      console.log(req.query); // express ka fayda ye hai ki ye querry ko ek object bna deaga.
        //   yeh  auth method querry ko acces kar rha . to password hidden nahi hai. isliye password querry se nahi body se bhejenge
        // jo ki hidden rahega
//      if(req.query.password==='123'){
//         next();
//      }

//      else {
//          res.sendStatus(401);
//      }

//    };
   // server.use(auth); ye to sabpe authentication hai
//   server.get('/',(req,res)=>{
//        res.json({"type":'GET'});  
//     // res.sendFile('/Users/ravik/Desktop/backend/index.html')
// })
 
    server.use(express.json()); // enable server to read only json data   of body
    const auth=(req,res,next)=>{
     console.log(req.body); // sirf itna code error dega iske liye express ko body ke data ko read karne ke liye enable karna padega.

    if(req.body.password==='123'){
       next();
    }

    else {
        res.sendStatus(401);
    }

  };
server.get('/',auth,(req,res)=>{
    res.json({"type":"GET","body":{"password":"123"}});  
 // res.sendFile('/Users/ravik/Desktop/backend/index.html')
})
 server.post('/',auth,(req,res)=>{
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