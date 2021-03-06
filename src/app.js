const express = require("express");
const cors = require("cors");
const {uuid,isUuid} = require("uuidv4");


// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];



app.get("/repositories", (request, response) => {
  // TODO
 
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs }= request.body;
  // TODO
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes:0,

  }
  repositories.push(repository);
  return response.json(repository);


});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const {url,title,techs} = request.body;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0){
     return response.status(400).json({erro:'Repository not found.'})
  }
  const repository = {
     id,
     url,
     title, 
     techs,
    };

  repositories[repositoryIndex] = repository;
  return response.json(repository);

});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex<0){
    return res.status(400).json({error:'Repository not found.'});
  }

  repositories.splice(repositoryIndex,1);
  return res.status(204).send();
  // TODO
});


app.post("/repositories/:id/like",  (request, response, next) => {
  // TODO
  const {id} = request.params;
 

  if(!isUuid(id)){
    return response.status(400).send();
  }

  const repository = repositories.find(repository => repository.id === id);
  
  
  if(!repository){
    return response.status(400).send();
  }

   repository.likes ++ ;

   return response.json(repository);
   next();
  

});

module.exports = app;
