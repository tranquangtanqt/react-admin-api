import Todo from "../models/todo";

class TodoTaskService {
  constructor() {}

  /**
   *
   * @param {*} conditions
   * @param {*} obj
   * @returns
   */
  create(conditions, obj) {
    return new Promise((resolve, reject) => {
      Todo.findByIdAndUpdate(
        conditions,
        {
          $push: { tasks: obj },
        },
        { new: true } //Thêm điều kiện để trả về Object
      )
        .then((response) => {
          let tasks = this.orderTaks(response.tasks);
          resolve(tasks);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * 
   * @param {*} tasks 
   * @returns 
   */
  orderTaks(tasks) {
    let result = {
      completed: null,
      inComplete: null,
    };

    let completedList = tasks.filter((item) => item["t_status"] === 0);
    let inCompleteList = tasks.filter((item) => item["t_status"] === 1);
    result.completed = completedList.sort((a, b) => b["t_order_number"] - a["t_order_number"]);
    result.inComplete = inCompleteList.sort((a, b) => b["t_order_number"] - a["t_order_number"]);
    return result;
  }

  /**
   *
   * @param {*} conditions
   * @param {*} obj
   * @returns
   */
  update(conditions, obj) {
    return new Promise((resolve, reject) => {
      Todo.findOneAndUpdate(conditions, { $set: obj })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   *
   * @param {*} conditions
   * @param {*} obj
   * @returns
   */
  delete(conditions, obj) {
    return new Promise((resolve, reject) => {
      Todo.findOneAndUpdate(conditions, { $pull: obj })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new TodoTaskService();
