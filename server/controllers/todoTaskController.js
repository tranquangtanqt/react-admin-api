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
export function updateStatusTask(req, res) {
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

// /**
//  * update todo task
//  * @param {*} req
//  * @param {*} res
//  */
// export function updateTodoTaskContent(req, res) {
//   let conditions = { _id: req.params.id, "tasks._id": req.body._id };
//   let obj = {
//     "tasks.$.t_content": req.body.t_content
//   };

//   Todo.findOneAndUpdate(
//     conditions,
//     { $set: obj },
//     { new: true } //Thêm điều kiện để trả về Object
//   )
//     .then((response) => {
//       return res.status(200).json({
//         status: true,
//         message: "Updated todo task",
//         data: response,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         status: false,
//         message: "Server error. Please try again.",
//         error: err.message,
//       });
//     });
// }

/**
 * delete todo task
 * @param {*} req
 * @param {*} res
 */
export function deleteTodoTask(req, res) {
  let conditions = { _id: req.params.id };
  let obj = { tasks: { _id: req.body._id } };
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
