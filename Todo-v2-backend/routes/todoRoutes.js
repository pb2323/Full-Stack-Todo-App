const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

const todoControllers = require("../controllers/todoControllers");

router.get("/todos", authenticate, todoControllers.getTodos);
router.get("/todos/completed", authenticate, todoControllers.getCompletedTodos);
router.post("/todos/create", authenticate, todoControllers.createTodo);
router.put("/todos/update/:todoId", authenticate, todoControllers.updateTodos);
router.delete(
  "/todos/delete/:todoId",
  authenticate,
  todoControllers.deleteTodo
);

module.exports = router;
