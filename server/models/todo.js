import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const todoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  }
});

export default mongoose.model('Todo', todoSchema);