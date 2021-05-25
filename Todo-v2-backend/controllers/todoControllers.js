const Todo = require("../models/Todos");
const User = require("../models/User");

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ user: req.user.id, isCompleted: false });
      return res.json({ todos: todos, status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
  getCompletedTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ user: req.user.id, isCompleted: true });
      return res.json({ todos: todos, status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
  createTodo: async (req, res) => {
    try {
      const todo = new Todo({ ...req.body.data });
      todo.user = req.user.id;
      const user = req.user;
      user.todos.push(todo.id);
      await user.save();
      await todo.save();
      return res.json({
        message: "Todo created successfully",
        status: 200,
        todo: todo,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server Error");
    }
  },
  updateTodos: async (req, res) => {
    try {
      const todoId = req.params.todoId;
      const todo = await Todo.updateOne(
        { _id: todoId },
        { ...req.body.data },
        { new: true }
      );
      return res.json({ todo, status: 200 });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const todoId = req.params.todoId;
      await Todo.deleteOne({ _id: todoId, user: req.user.id });
      return res.json({ message: "Todo deleted successfully", status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
};
