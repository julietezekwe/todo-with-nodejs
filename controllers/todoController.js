var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to db

mongoose.connect('mongodb://test:test@ds239368.mlab.com:39368/todo');

//create schema like blueprint

var todoSchema = new mongoose.Schema({
    item: String,
});

var Todo = mongoose.model('Todo', todoSchema);



//var data = [{item: 'get milk'}, {item: 'cook'}, {item: 'drink it all'}];
var urlEncodedParse = bodyParser.urlencoded({ extended : false});

module.exports = function(app){
 app.get('/todo', function(req, res){
     Todo.find({}, function(err, data){
         if(err) throw err;
         console.log('item exists');
         res.render('todo', {todos: data});
     });
 
 });
 app.post('/todo', urlEncodedParse, function(req, res){
   var newTodo = Todo(req.body).save(function(err, data){
     if(err) throw err;
     res.json(data);
   });

  
});
app.delete('/todo/:item', function(req, res){
     

         Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
             if(err) throw err;
             res.json(data);
     });
     
   });
};