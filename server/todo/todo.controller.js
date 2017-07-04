const Todo = require('./todo.model');
const todoController = {

  getTodo(req, res){
    Todo.find({}).sort({createAt: -1}).exec(function (err, todo) {
      if(err){
        return res.json({success: false, todo: todo, message: 'Todo get fail'});
      }else {
        return res.json({success: true, todo: todo, message: 'Todo get successfully'});
      }
    })
  },

  addTodo(req, res){
    var todo = new Todo({
      name: req.body.name,
      createAt: Date.now(),
    });
    todo.save((err) => {
      if(err){
        return res.json({success: false, message: 'Todo added fail'});
      }else {
        return res.json({success: true,  message: 'Todo add successfully'});
      }
    })
  },

  deleteTodo(req, res){
    var todoId = req.params.id;
    Todo.findOneAndRemove({_id:todoId}, function (err) {
      if(err){
        return res.json({success: false, message: 'Todo deleted fail'});
      }else {
        return res.json({success: true, message: 'successfully'});
      }
    })
  },

  updateTodo(req, res){
    var todoId = req.params.id;
    Todo.findOne({_id:todoId}, function (error, todo) {
      todo.name = req.body.name;
      todo.save(function (err) {
        if(err){
          return res.json({success: false, message: 'Todo updated fail'});
        }else {
          return res.json({success: true, message: 'successfully'});
        }
      })
    })
  },


  updateTodoDone(req, res){
    var todoId = req.params.id;
    Todo.findOne({_id:todoId}, function (error, todo) {
      todo.done = req.body.value;
      todo.save(function (err) {
        if(err){
          return res.json({success: false, message: 'Todo updated done fail'});
        }else {
          return res.json({success: true, message: 'successfully'});
        }
      })
    })
  },


  getDone(req, res){
    Todo.find({done: true}, function (err, todo) {
      if(err){
        return res.json({success: false, todo: todo, message: 'getCheck fail'});
      }else {
        return res.json({success: true, todo: todo, message: 'successfully'});
      }
    })
  },


  getActive(req, res){
    Todo.find({done: false}, function (err, todo) {
      if(err){
        return res.json({success: false, todo: todo, message: 'getCheck fail'});
      }else {
        return res.json({success: true, todo: todo, message: 'successfully'});
      }
    })
  }
}

module.exports = todoController;
