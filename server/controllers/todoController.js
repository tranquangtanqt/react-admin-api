import TodoService from "../services/todoService";
import mongoose from "mongoose";
import Todo from "../models/todo";

/**
 * Get all todo
 * @param {*} req
 * @param {*} res
 */
export function getAll(req, res) {
  TodoService.getAll()
    .then((response) => {
      return res.status(200).json({
        status: true,
        data: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * create new todo
 * @param {*} req
 * @param {*} res
 * @returns
 */
export function createTodo(req, res) {
  TodoService.getAll()
    .then((response) => {
      let orderNumberArr = response.map((o) => o.order_number);
      let max = Math.max(...orderNumberArr);
      const todo = new Todo({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        order_number: max + 1,
      });

      TodoService.create(todo)
        .then(() => {
          return res.status(200).json({
            status: true,
            data: null,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * getById todo
 * @param {*} req
 * @param {*} res
 */
export function getById(req, res) {
  TodoService.getById(req.params.id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * update todo
 * @param {*} req
 * @param {*} res
 */
export function updateTitle(req, res) {
  let conditions = { _id: req.body._id };
  let obj = {
    title: req.body.title,
  };

  TodoService.update(conditions, obj)
    .then((response) => {
      return res.status(200).json({
        status: true,
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

/**
 * update todo order number
 * @param {*} req
 * @param {*} res
 */
export function updateOrderNumber(req, res) {
  let id = req.body._id;
  let isUp = req.body.isUp;

  let orderNumber = 0;
  let idSwap = null;
  let orderNumberSwap = 0;

  TodoService.getAll()
    .then((todos) => {
      if (isUp) {
        todos.forEach((item, index, array) => {
          if (item._id.toString() === id) {
            orderNumber = array[index].order_number;
            idSwap = array[index - 1]._id;
            orderNumberSwap = array[index - 1].order_number;
          }
        });
      } else {
        todos.forEach((item, index, array) => {
          if (item._id.toString() === id) {
            orderNumber = array[index].order_number;
            idSwap = array[index + 1]._id;
            orderNumberSwap = array[index + 1].order_number;
          }
        });
      }

      let conditions = { _id: req.body._id };
      let obj = {
        order_number: orderNumberSwap,
      };

      TodoService.update(conditions, obj)
        .then(() => {
          conditions = { _id: idSwap };
          obj = {
            order_number: orderNumber,
          };

          TodoService.update(conditions, obj)
            .then((response) => {
              return res.status(200).json({
                status: true,
                data: response,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * delete todo
 * @param {*} req
 * @param {*} res
 */
export function deleteTodo(req, res) {
  TodoService.delete(req.body._id)
    .then((response) => {
      return res.status(200).json({
        status: true,
        data: response,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}