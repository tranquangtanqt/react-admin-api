import mongoose from "mongoose";
import TodoDetailService from "../services/todoDetailService";
import TodoService from "../services/todoService";
/********* TODO DETAIL **********/

/**
 * create todo detail
 * @param {*} req
 * @param {*} res
 */
export function createTodoDetail(req, res) {
  TodoService.getById(req.params.id)
    .then((todo) => {
      let maxOrderNumber = Math.max(...todo.details.map((item) => item["d_order_number"]));
      if(!isFinite(maxOrderNumber) || !maxOrderNumber) {
        maxOrderNumber = 0;
      }
      
      let conditions = req.params.id;
      let obj = [
        {
          _id: mongoose.Types.ObjectId(),
          d_title: req.body.d_title,
          d_content: req.body.d_content,
          d_order_number: maxOrderNumber + 1,
        },
      ];

      TodoDetailService.create(conditions, obj)
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

  TodoDetailService.update(conditions, obj)
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
 * update todo detail
 * @param {*} req
 * @param {*} res
 */
export function updateTodoDetailOrderNumber(req, res) {
  let isUp = req.body.isUp;

  let idDetail = req.body._id;
  let orderNumber = 0;

  let idDetailSwap = null;
  let orderNumberSwap = 0;

  TodoService.getById(req.params.id)
    .then((todoDetails) => {
      if (isUp) {
        todoDetails.details.forEach((item, index, array) => {
          if (item._id.toString() === idDetail) {
            orderNumber = array[index].d_order_number;

            idDetailSwap = array[index - 1]._id;
            orderNumberSwap = array[index - 1].d_order_number;
          }
        });
      } else {
        todoDetails.details.forEach((item, index, array) => {
          if (item._id.toString() === idDetail) {
            orderNumber = array[index].d_order_number;

            idDetailSwap = array[index + 1]._id;
            orderNumberSwap = array[index + 1].d_order_number;
          }
        });
      }

      let conditions = { _id: req.params.id, "details._id": req.body._id };
      let obj = {
        "details.$.d_order_number": orderNumberSwap,
      };

      TodoDetailService.update(conditions, obj)
        .then(() => {
          conditions = { _id: req.params.id, "details._id": idDetailSwap };
          obj = {
            "details.$.d_order_number": orderNumber,
          };

          TodoDetailService.update(conditions, obj)
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
 * delete todo detail
 * @param {*} req
 * @param {*} res
 */
 export function deleteTodoDetail(req, res) {
  let conditions = { _id: req.params.id };
  let obj = { details: {"_id": req.body._id} };

  TodoDetailService.delete(conditions, obj)
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