import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const todoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  order_number: Number,
  details: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      d_title: {
        type: String,
      },
      d_content: {
        type: String,
      },
      d_order_number: {
        type: Number
      }
    },
  ],
  tasks: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      t_content: {
        type: String,
      },
      t_status: { //0: chưa hoàn thành, 1: hoàn thành
        type: Number,
      },
      t_order_number: {
        type: Number,
      }
    },
  ],
});

export default mongoose.model("Todo", todoSchema);