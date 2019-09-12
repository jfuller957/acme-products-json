const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')('./products.json', (item, items)=> {
  if(!item.name){
    return "Product name required"
  }
});

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

app.post('/api/products', async(req, res, next) => {
  try {
    res.send(await db.create(req.body));
  }
  catch(ex) {
    next(ex);
  }
});

app.delete('/api/products/:id', async(req, res, next) => {
  try {
    await db.destroy(req.params.id);
    res.sendStatus(204);
  }
  catch(ex) {
    next(ex);
  }
});

app.use((req, res, next)=> {
  console.log(err);
  res.status(500).send({ message: err.message})
});

app.listen(3000, ()=> console.log('listening on port 3000'));
