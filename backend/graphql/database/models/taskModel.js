import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const articleModel = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default model("Article", articleModel);
