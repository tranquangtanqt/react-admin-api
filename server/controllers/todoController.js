import Todo from "../models/todo";
import mongoose from "mongoose";

/********* TODO **********/
/**
 * create new todo
 * @param {*} req
 * @param {*} res
 * @returns
 */
export function createTodo(req, res) {
  const todo = new Todo({
    _id: mongoose.Types.ObjectId(),
    title: req.body.title,
    order_number:  req.body.order_number,
  });

  return todo
    .save()
    .then((newTodo) => {
      return res.status(200).json({
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

/**
 * Get all todo
 * @param {*} req
 * @param {*} res
 */
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

/**
 * getById todo
 * @param {*} req
 * @param {*} res
 */
export function getById(req, res) {
  Todo.findById(req.params.id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "A record of list todo",
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

/**
 * delete todo task
 * @param {*} req
 * @param {*} res
 */
export function deleteTodo(req, res) {
  let conditions = { _id: req.body._id };
  Todo.deleteOne(conditions)
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Deleted todo",
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

/**
 * update todo
 * @param {*} req
 * @param {*} res
 */
 export function updateTodoTitle(req, res) {
  let conditions = { _id: req.body._id};
  let obj = {
    "title": req.body.title
  };

  Todo.findByIdAndUpdate(
    conditions,
    { $set: obj },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Updated todo",
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

/**
 * update todo order number
 * @param {*} req
 * @param {*} res
 */
 export function updateTodoOrderNumber(req, res) {
  let conditions = { _id: req.body._id };
  let obj = {
    "order_number": req.body.order_number,
  };

  Todo.findByIdAndUpdate(
    conditions,
    { $set: obj }
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Updated order number completed",
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
