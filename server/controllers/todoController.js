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
      d_title: req.body.details.d_title,
      d_content: req.body.details.d_content,
    },
  ]

  // create
  Todo.findByIdAndUpdate(
    conditions, 
    {
      $push: {
        details: obj,
      }
    },
    {new: true}                 //Thêm điều kiện để trả về Object
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
  });;
}

/**
 * update todo detail
 * @param {*} req 
 * @param {*} res 
 */
export function updateTodoDetail(req, res) {
  let conditions = {"_id": req.params.id , "details._id" : req.body._id};
  let obj = {
    "details.$.d_title": req.body.d_title,
    "details.$.d_content": req.body.d_content
  };

  Todo.findOneAndUpdate(
    conditions, 
    {
      $set: obj
    },
    {new: true}             //Thêm điều kiện để trả về Object
  )
  .then((response) => {
    return res.status(200).json({
      status: true,
      message: "Updated todo details",
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
  });;
}

