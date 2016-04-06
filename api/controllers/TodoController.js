/**
 * TodoController
 *
 * @description :: Server-side logic for managing Todoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getTodos: function(req, res) {
    TodoService.getTodos(function(todos) {
      res.json(todos);
    });
    console.log("getTodos");
  },

  addTodo: function(req, res) {
    var todoVal = (req.body.value) ? req.body.value : undefined;
    TodoService.addTodo(todoVal, function(success) {
      res.json(success);
    });
    console.log("addTodo");
  },

  removeTodo: function(req, res) {
    var todoVal = (req.body.value) ? req.body.value : undefined;
    TodoService.removeTodo(todoVal, function(success) {
      res.json(success);
    });
    console.log("removeTodo");
  }
};

