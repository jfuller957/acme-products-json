const express = require('express');
const app = express();
const path = require('path')
const db = require('./db')

app.get('/', (req, res, next) =>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/products', async(req,res,next) => {
  try{
    res.send(await db.findAll());
  }
  catch(ex){
    next(ex);
  }
})

app.listen(3000, ()=> console.log('listening on port 3000'))
