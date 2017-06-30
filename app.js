const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/todos');
const Todo = mongoose.model('Todo', {
    text: String,
    priority: Number
});


app.use(express.static('./client'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/todos', (req, res) => {
    //query               
    Todo.find(function (err, todos) {
        res.json(todos);
    });
});
app.post('/todos', (req, res) => {
    const newTodo = new Todo(req.body);


    newTodo.save(function (err) {
        if (err) {
            res.send('An error has occured: ' + err);
        } else {
            res.send('ok');
        }
    });
});

app.delete('/todos/:id', function (req, res) {
    Todo.findByIdAndRemove({_id: req.params.id}, function(err) {
        if (err) {
            res.send('An error has occured: ' + err);
        } else {
            res.send('ok');
        }
    });
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});