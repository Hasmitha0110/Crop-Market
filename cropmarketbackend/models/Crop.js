import mongoose from 'mongoose';

const CropSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // basic product info
  type: { type: String, required: true },         // e.g., "Tomato"
  variety: { type: String },                      // optional more specific variety
  description: { type: String },

  // pricing/quantity
  pricePerUnit: { type: Number, required: true }, // price per unit (e.g., per kg)
  unit: { type: String, default: 'Kg' },          // unit name
  quantity: { type: Number, required: true },     // total available (numeric)

  // qualifiers
  qualityOrSize: { type: String },                // e.g., "Large", "Medium"
  organic: { type: Boolean, default: false },

  // status & availability
  status: {
    type: String,
    enum: ['available', 'sold', 'coming_soon'],
    default: 'available'
  },
  availableFrom: { type: Date },                  // optional: when it will be available

  // contact/location/delivery
  contact: { type: String },                      // phone or contact text
  address: { type: String },                      // location to pick up
  deliveryAvailable: { type: Boolean, default: false },

  // discount
  discountPercent: { type: Number, min: 0, max: 100, default: 0 },

  // timestamps
}, { timestamps: true });

export default mongoose.model('Crop', CropSchema);
