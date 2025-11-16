//express

const express = require('express');
const mongoose = require ('mongoose');

//create an instance of expres
const app = express();


app.use (express.json());

    //sample in memory storage for todo items
  //  let todos =[];

    
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/mernaapp')
.then(()=>
{
    console.log('connected to mongodb');
})
.catch((err)=>
{
    console.error('failed to connect to mongodb', err);
});
//create a new todo item

//create scehema
const todoSchema = new mongoose.Schema({
    title:{type:String, required:true},
    description: String
});

//create model
const Todomodel = mongoose.model('Todo', todoSchema);


app.post('/todos' ,async (req,res)=>
{
   const {title,description}=req.body;
  //  const newTodo = {
  //      id:todos.length+1,
   //     title,
  //      description
  //  };

//todos.push(newTodo);
//console.log(todos);
try
{
   const newTodo =  new Todomodel({title,description});

   await newTodo.save();
   res.status(201).json(newTodo);
}
catch(err)
{
  console.log('error creating todo', err);
    res.status(500).json({message:err.message});
}




    })


//get all items

app.get('/todos',async(req,res)=> 
{

    try{
        const todos =await Todomodel.find();
        res.json(todos);
    }

    catch (err){
        res.status(500).json({message:err.message});
    }
 
});

//update a tofo item

app.put('/todos/:id', async (req,res)=>
{
    try{
          const {title,description}=req.body;
      const id = req.params.id;

      const updatedtodo =  await Todomodel.findByIdAndUpdate(
        id,
        {title,description}
      )

      if(!updatedtodo)
      {
        
        return res.status(404).json({message:'todo not found'});
      }
    }
    catch(err)
    {
        console.log('error updating todo', err);
        res.status(500).json({message:err.message});
    }
     


});



    
//set the port
const port = 3000;

app.listen(port, ()=> {
    console.log("server is listening to port"+port);

})
