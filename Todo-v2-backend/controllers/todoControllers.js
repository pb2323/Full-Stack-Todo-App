const Todo = require("../models/Todos");
const User = require("../models/User");

module.exports = {
  getTodos: async (req, res) => {
    try {
      const todos = await Todo.find({ user: req.user.id });
      return res.json({ todos:todos, status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
  createTodo: async (req, res) => {
    try {
      const todo = new Todo({ ...req.body });
      todo.user = req.user.id;
      const user = req.user;
      user.todos.push(todo.id);
      await user.save();
      await todo.save();
      return res.json({ message: "Todo created successfully", status: 200 });
    } catch (err) {
      return res.status(500).send("Internal server Error");
    }
  },
  updateTodos: async (req, res) => {
    try {
      const todoId = req.parama.todoId;
      const todo = await Todo.updateOne(
        { id: todoId },
        { ...req.body },
        { new: true }
      );
      return res.json({ todo, status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
  deleteTodo: async (req, res) => {
    try {
      const todoId = req.parama.todoId;
      await Todo.deleteOne({ _id: todoId, user: req.user.id });
      return res.json({ message: "Todo deleted successfully", status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
};
