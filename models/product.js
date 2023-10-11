const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    // name: { type: String, required: true },
    title:{ type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: false },
    rating:{ type: Number, required: false },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    thumbnail: { type: String, required: false },
    images: [ { type: String } ]
    
});

// Virtual for author's URL
ProductSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/inventory/product/${this._id}`;
  });
  
  
// Export model
module.exports = mongoose.model("Product", ProductSchema);