const mongoose = require("mongoose");
const { Schema } = mongoose;

const subcategoryDataSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cableLength: { type: Number },
  vmp: { type: Number },
  Impp: { type: Number },
  operationTemp: { type: Number },
  classSelected: { type: String },
  childSelected: { type: String },
  areaSelected: { type: Number },
  conductorCableLength: { type: Number },
  seriesModule: { type: Number },
  r20: { type: Number },
  rTempreture: { type: Number },
  uTempreture: { type: Number },
  ploss: { type: Number },
  plossTemp: { type: Number },
  kt: { type: Number },
  pmax: { type: Number },
  uMax: { type: Number },
  uMaxLength: { type: Number },
  classSelectedModule: { type: String },
  childSelectedModule: { type: String },
  areaSelectedModule:  { type: Number },
  r20Module:  { type: Number },
  rTempretureModule:  { type: Number },
  nominalPower:  { type: Number },
});


const subcategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  data: [subcategoryDataSchema],
});

module.exports = mongoose.model("SubCategory", subcategorySchema);
