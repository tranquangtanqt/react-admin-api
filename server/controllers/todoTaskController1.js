import Todo from "../models/todo";
import mongoose from "mongoose";

/********* TODO TASK **********/
/**
 * create todo task
 * @param {*} req
 * @param {*} res
 */
export function createTodoTask(req, res) {
  let conditions = req.params.id;
  console.log(req.body);
  let obj = [
    {
      _id: mongoose.Types.ObjectId(),
      t_content: req.body.t_content,
      t_status: req.body.t_status,
      t_order_number: req.body.t_order_number
    },
  ];

  // create
  Todo.findByIdAndUpdate(
    conditions,
    {
      $push: { tasks: obj },
    },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Created todo task",
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
 * update todo task
 * @param {*} req
 * @param {*} res
 */
export function updateStatusTask(req, res) {
  console.log(req.body);
  let conditions = { _id: req.params.id, "tasks._id": req.body._id };
  let obj = {
    "tasks.$.t_status": req.body.t_status,
    "tasks.$.t_order_number": req.body.t_order_number,
  };

  Todo.findOneAndUpdate(
    conditions,
    { $set: obj },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Updated status inComplete to completed",
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
 * update todo task
 * @param {*} req
 * @param {*} res
 */
export function updateTodoTaskContent(req, res) {
  let conditions = { _id: req.params.id, "tasks._id": req.body._id };
  let obj = {
    "tasks.$.t_content": req.body.t_content
  };

  Todo.findOneAndUpdate(
    conditions,
    { $set: obj },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Updated todo task",
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
export function deleteTodoTask(req, res) {
  let conditions = { _id: req.params.id };
  let obj = { tasks: {"_id": req.body._id} };
  Todo.findOneAndUpdate(
    conditions,
    { $pull: obj },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Deleted todo task",
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