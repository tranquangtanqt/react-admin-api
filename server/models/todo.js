import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const todoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  details: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      d_title: {
        type: String,
      },
      d_content: {
        type: String,
      },
    },
  ],
  tasks: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      t_name: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Todo", todoSchema);
