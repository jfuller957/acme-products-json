const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')('./products.json');

app.use(express.json());

app.use((req, res, next) => {
  next();
})

app.get('/', (req, res, next) =>{
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/products', async(req,res,next) => {
  try{
    const data = await db.findAll();
    res.send(data);
  }
  catch(ex){
    next(ex);
  }
});

app.listen(3000, ()=> console.log('listening on port 3000'));
