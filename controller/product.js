// products REST API  C R U D APIS
 
const fs=require('fs');
const data=JSON.parse(fs.readFileSync("data.json","utf-8"))
const products=data.products;
exports.createProduct=(req,res)=>{
    products.push(req.body);
    res.json(products);
 }
 exports.updateProduct=(req,res)=>{
    const ind=Number((req.params.id))     
     const index=products.findIndex(p=> p.id===ind);
        products.splice(index,1,{...req.body,id:ind})
        res.status(201).json(products);
 }
exports.getAllProducts=(req,res)=>{
      res.json(products);
  }
  exports.getProduct=(req,res)=>{
     const id=+req.params.id;
     
      const curr=products.find(p=> p.id===id);
      res.json(curr);
   }
  exports.deleteProduct=(req,res)=>{
       const id=Number((req.params.id));
       const index=products.findIndex(p=> p.id===id);
        const prod=products[index];
        products.splice(index,1);
        res.status(201).json(products);
 }
 