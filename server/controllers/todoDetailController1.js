import Todo from "../models/todo";
import mongoose from "mongoose";

/********* TODO DETAIL **********/
/**
 * create todo detail
 * @param {*} req
 * @param {*} res
 */
export function createTodoDetail(req, res) {
  let conditions = req.params.id;
  let obj = [
    {
      _id: mongoose.Types.ObjectId(),
      d_title: req.body.d_title,
      d_content: req.body.d_content,
      d_order_number: req.body.d_order_number
    },
  ];

  // create
  Todo.findByIdAndUpdate(
    conditions,
    {
      $push: { details: obj },
    },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Created todo detail",
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
 * update todo detail
 * @param {*} req
 * @param {*} res
 */
export function updateTodoDetail(req, res) {
  let conditions = { _id: req.params.id, "details._id": req.body._id };
  let obj = {
    "details.$.d_title": req.body.d_title,
    "details.$.d_content": req.body.d_content,
  };

  Todo.findOneAndUpdate(
    conditions,
    { $set: obj },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Updated todo detail",
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
 * update todo detail
 * @param {*} req
 * @param {*} res
 */
 export function updateTodoDetailOrderNumber(req, res) {
  let conditions = { _id: req.params.id, "details._id": req.body._id };
  let obj = {
    "details.$.d_order_number": req.body.d_order_number
  };

  Todo.findOneAndUpdate(
    conditions,
    { $set: obj },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Updated todo detail d_order_number",
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
 * delete todo detail
 * @param {*} req
 * @param {*} res
 */
export function deleteTodoDetail(req, res) {
  let conditions = { _id: req.params.id };
  let obj = { details: {"_id": req.body._id} };
  Todo.findOneAndUpdate(
    conditions,
    { $pull: obj },
    { new: true } //Thêm điều kiện để trả về Object
  )
    .then((response) => {
      return res.status(200).json({
        status: true,
        message: "Deleted todo detail",
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
