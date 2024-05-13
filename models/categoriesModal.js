const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    subcategories: [{type: Schema.Types.ObjectId, ref: "SubCategory"}],
  },
  { timestamps: true }
);
categorySchema.pre(/^find/, function (next) {
  this.populate("subcategories");
  next();
});
module.exports = mongoose.model("Category", categorySchema);






















// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const categorySchema = new Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     cableSize: {
//       type: Number,
//     },
//     cableLength: {
//       type: Number,
//     },
//     vmp: {
//       type: Number,
//     },
//     isc: {
//       type: Number,
//     },
//     operatingTempreture: {
//       type: Number,
//     },
//     classType: {
//       type: String,
//     },
//     conductorType: {
//       type: String,
//     },
//     ConductorSize: {
//       type: Number,
//     },
//     ConductorLength: {
//       type: Number,
//     },
//     seriesModules: {
//       type: Number,
//     },
//     parallelStrings: {
//       type: Number,
//     },
//     r20: {
//       type: Number,
//     },
//     rTempreture: {
//       type: Number,
//     },
//     u20: {
//       type: Number,
//     },
//     uTempreture: {
//       type: Number,
//     },
//     ploss20: {
//       type: Number,
//     },
//     plossTempreture: {
//       type: Number,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Category", categorySchema);
