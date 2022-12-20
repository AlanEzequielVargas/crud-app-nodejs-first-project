const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

const jsonPath = path.resolve('./files/tasks.json');

app.use(express.json());

//GET
app.get('/tasks', async (req, res) => {
   res.send(JSON.parse(await fs.readFile(jsonPath, 'utf8')));
   res.end();
})
//POST
app.post('/tasks', async (req, res) => {
   const taskByUser = req.body;
   const tasksArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
   tasksArray.push({ ...taskByUser, id: (tasksArray.length === 0 ? 1 : tasksArray[tasksArray.length - 1].id + 1) });
   await fs.writeFile(jsonPath, JSON.stringify(tasksArray));
   res.end();
})
//DELETE
app.delete('/tasks' , async (req,res) => {
   const taskToDelete = req.body;
   const tasksArray = JSON.parse(await fs.readFile(jsonPath , 'utf8'));
   const indexOfTaskToDelete = tasksArray.findIndex((task) => task.id === taskToDelete.id);
   tasksArray.splice(indexOfTaskToDelete , 1);
   await fs.writeFile(jsonPath , JSON.stringify(tasksArray));
   res.end();
})
//PUT
app.put('/tasks', async (req , res) => {
   const actualizedTaskId = req.body.id;
   const tasksArray = JSON.parse(await fs.readFile(jsonPath , 'utf8'));
   const indexOfTaskToReplace = tasksArray.findIndex((task) => task.id === actualizedTaskId);
   tasksArray[indexOfTaskToReplace].status = !tasksArray[indexOfTaskToReplace].status;
   await fs.writeFile(jsonPath , JSON.stringify(tasksArray));
   res.end();
})


const PORT = 8000;
app.listen(PORT, () => {
   console.log(`el servidor esta escuchando en el puerto ${PORT}`);
})































