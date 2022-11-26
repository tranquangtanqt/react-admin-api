import Todo from "../models/todo";

class TodoService {
  constructor() {}

  /**
   *
   * @returns
   */
  getAll() {
    return new Promise((resolve, reject) => {
      Todo.find()
        .then((response) => {
          response.sort((a, b) => b["order_number"] - a["order_number"]);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * createTodo
   * @param {*} todo
   * @returns
   */
  create(todo) {
    return new Promise((resolve, reject) => {
      todo
        .save()
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * getById
   * @param {*} id
   * @returns
   */
  getById(id) {
    return new Promise((resolve, reject) => {
      Todo.findById(id)
        .then((response) => {
          response.details.sort((a, b) => a["d_order_number"] - b["d_order_number"]);
          response.tasks.sort((a, b) => b["t_order_number"] - a["t_order_number"]);
          for (let i = 0; i < response.tasks.length - 1; i++) {
            let item1 = response.tasks[i];
            if(item1["t_status"] === 0) {
              continue;
            }
            for (let j = i + 1; j < response.tasks.length; j++) {
              let item2 = response.tasks[j];
              if(item2["t_status"] === 0) {
                continue;
              }
              if(item2["t_order_number"] < item1["t_order_number"]) {
                let temp = response.tasks[i];
                response.tasks[i] = response.tasks[j];
                response.tasks[j] = temp;
              }
            }
          }
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * update
   * @param {*} conditions
   * @param {*} obj
   * @returns
   */
  update(conditions, obj) {
    return new Promise((resolve, reject) => {
      Todo.findByIdAndUpdate(
        conditions,
        { $set: obj },
        { new: true } //Thêm điều kiện để trả về Object
      )
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * delete todo
   * @param {*} conditions
   * @returns
   */
  delete(id) {
    return new Promise((resolve, reject) => {
      Todo.deleteOne({ _id: id })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new TodoService();
