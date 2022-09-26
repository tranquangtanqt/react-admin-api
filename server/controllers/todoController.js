import Todo from "../models/todo";
import mongoose from "mongoose";

// create new todo
export function createTodo(req, res) {
  const todo = new Todo({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
  });

  return todo
    .save()
    .then((newTodo) => {
      return res.status(201).json({
        status: true,
        message: "New todo created successfully",
        data: newTodo,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
}

// Get all todo
export function getAll(req, res) {
  Todo.find()
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "A list of all todo",
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

// Get all todo
export function getById(req, res) {
    Todo.findById(req.params.id)
      .then((response) => {
        return res.status(200).json({
          status: true,
          message: "A record of all todo",
          data: response,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
