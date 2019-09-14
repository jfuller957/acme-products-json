const express = require('express');
const app = express();
const path = require('path');
const db = require('./db')('./products.json', (item, items)=> {
  if(!item.name){
    return 'A product needs a name...'
  }
  if(!item.price){
    return 'A product needs a price'
  }
  if(items.map(i => i.name).includes(item.name)){
    return 'A product already exists...make another...'
  }
});

app.use(express.json());

app.use((req, res, next) => {
  console.log(`you called ${req.url} as a ${req.method}`);
  next();
});

app.get('/', (req, res, next) =>{
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/products', async(req, res, next)=> {
  try {
    res.send(await db.findAll());
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

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send({ message: err.message})
});

app.listen(3000, ()=> console.log('listening on port 3000!'));
