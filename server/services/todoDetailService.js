import Todo from "../models/todo";

class TodoDetailService {
  constructor() {}

  /**
   *
   * @param {*} conditions
   * @param {*} obj
   * @returns
   */
  create(conditions, obj) {
    return new Promise((resolve, reject) => {
      Todo.findByIdAndUpdate(conditions, {
        $push: { details: obj },
      })
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

export default new TodoDetailService();
