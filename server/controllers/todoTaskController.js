import mongoose from "mongoose";
import TodoTaskService from "../services/todoTaskService";
import TodoService from "../services/todoService";
import Todo from "../models/todo";

/********* TODO TASK **********/
/**
 * create todo task
 * @param {*} req
 * @param {*} res
 */
export function createTodoTask(req, res) {
  TodoService.getById(req.params.id)
    .then((todo) => {
      let maxOrderNumber = Math.max(...todo.tasks.map((item) => item["t_order_number"]));
      if (!isFinite(maxOrderNumber) || !maxOrderNumber) {
        maxOrderNumber = 0;
      }

      let conditions = req.params.id;
      let obj = [
        {
          _id: mongoose.Types.ObjectId(),
          t_content: req.body.t_content,
          t_status: req.body.t_status,
          t_order_number: maxOrderNumber + 1,
        },
      ];

      TodoTaskService.create(conditions, obj)
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

  //   let conditions = req.params.id;

  //   let obj = [
  //     {
  //       _id: mongoose.Types.ObjectId(),
  //       t_content: req.body.t_content,
  //       t_status: req.body.t_status,
  //       t_order_number: req.body.t_order_number,
  //     },
  //   ];

  //   // create
  //   Todo.findByIdAndUpdate(conditions, {
  //     $push: { tasks: obj },
  //   })
  //     .then((response) => {
  //       return res.status(200).json({
  //         status: true,
  //         data: response,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
}

/**
 * update todo task
 * @param {*} req
 * @param {*} res
 */
export function updateTodoTaskStatus(req, res) {
  TodoService.getById(req.params.id)
    .then((todo) => {
      // To completed
      let status = req.body.t_status;
      let orderNumber = 0;
      if (status === 1) {
        let minOrder = Math.min(...todo.tasks.map((item) => item["t_order_number"]));
        if (!isFinite(minOrder) || !minOrder) {
          orderNumber = -1;
        }
        // case only contains incomplete
        else if (minOrder > 0) {
          orderNumber = -1;
        } else {
          orderNumber = minOrder - 1;
        }
      } else {
        let maxOrder = Math.max(...todo.tasks.map((item) => item["t_order_number"]));
        if (!isFinite(maxOrder) || !maxOrder) {
          orderNumber = 1;
        }
        // case only contains completed
        else if (maxOrder < 0) {
          orderNumber = 1;
        } else {
          orderNumber = maxOrder + 1;
        }
      }

      let conditions = { _id: req.params.id, "tasks._id": req.body._id };
      let obj = {
        "tasks.$.t_status": status,
        "tasks.$.t_order_number": orderNumber,
      };

      TodoTaskService.update(conditions, obj)
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
}

/**
 * update todo task
 * @param {*} req
 * @param {*} res
 */
export function updateTodoTaskContent(req, res) {
  let conditions = { _id: req.params.id, "tasks._id": req.body._id };
  let obj = {
    "tasks.$.t_content": req.body.t_content,
  };

  TodoTaskService.update(conditions, obj)
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

export function updateTodoTaskOrderNumber(req, res) {
  let isUp = req.body.isUp;

  let id = req.body._id;
  let orderNumber = 0;

  let idSwap = null;
  let orderNumberSwap = 0;

  TodoService.getById(req.params.id)
    .then((todo) => {
      if (isUp) {
        todo.tasks.forEach((item, index, array) => {
          if (item._id.toString() === id) {
            orderNumber = array[index].t_order_number;

            idSwap = array[index - 1]._id;
            orderNumberSwap = array[index - 1].t_order_number;
          }
        });
      } else {
        todo.tasks.forEach((item, index, array) => {
          if (item._id.toString() === id) {
            orderNumber = array[index].t_order_number;

            idSwap = array[index + 1]._id;
            orderNumberSwap = array[index + 1].t_order_number;
          }
        });
      }

      console.log(id);
      console.log(orderNumber);
      console.log(idSwap);
      console.log(orderNumberSwap);

      let conditions = { _id: req.params.id, "tasks._id": req.body._id };
      let obj = {
        "tasks.$.t_order_number": orderNumberSwap,
      };

      TodoTaskService.update(conditions, obj)
        .then(() => {
          conditions = { _id: req.params.id, "tasks._id": idSwap };
          obj = {
            "tasks.$.t_order_number": orderNumber,
          };

          TodoTaskService.update(conditions, obj)
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
    .catch((err) => {
      console.log(err);
    });
}

/**
 * delete todo task
 * @param {*} req
 * @param {*} res
 */
export function deleteTodoTask(req, res) {
  let conditions = { _id: req.params.id };
  let obj = { tasks: { _id: req.body._id } };
  TodoTaskService.delete(conditions, obj)
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
