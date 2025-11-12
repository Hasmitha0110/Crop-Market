import Crop from '../models/Crop.js';
import User from '../models/User.js'; // for populating owner info if needed

// Create a crop (protected)
export const createCrop = async (req, res) => {
  try {
    const owner = req.userId;
    const data = {
      owner,
      type: req.body.type,
      variety: req.body.variety,
      description: req.body.description,
      pricePerUnit: req.body.pricePerUnit,
      unit: req.body.unit || 'Kg',
      quantity: req.body.quantity,
      qualityOrSize: req.body.qualityOrSize,
      organic: !!req.body.organic,
      status: req.body.status || 'available',
      availableFrom: req.body.availableFrom ? new Date(req.body.availableFrom) : undefined,
      contact: req.body.contact,
      address: req.body.address,
      deliveryAvailable: !!req.body.deliveryAvailable,
      discountPercent: req.body.discountPercent || 0,
    };

    const crop = await Crop.create(data);
    res.status(201).json(crop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all crops for buyers (public) with search & filter & pagination
// Query params: search, status, page, limit, type
export const getCropsPublic = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20, type } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (type) filter.type = { $regex: type, $options: 'i' };

    if (search) {
      // search in type, variety, description, address
      filter.$or = [
        { type: { $regex: search, $options: 'i' } },
        { variety: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Math.max(0, page - 1)) * limit;
    const total = await Crop.countDocuments(filter);
    const crops = await Crop.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('owner', 'name district contact');

    res.json({ total, page: Number(page), limit: Number(limit), crops });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get crops for the logged-in farmer
export const getMyCrops = async (req, res) => {
  try {
    const owner = req.userId;
    const { search, status } = req.query;
    const filter = { owner };

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { type: { $regex: search, $options: 'i' } },
        { variety: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const crops = await Crop.find(filter).sort({ updatedAt: -1 });
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a crop (only owner)
export const updateCrop = async (req, res) => {
  try {
    const owner = req.userId;
    const { id } = req.params;

    const crop = await Crop.findById(id);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    if (String(crop.owner) !== String(owner)) return res.status(403).json({ message: 'Not authorized' });

    // only pick allowed fields
    const update = {
      type: req.body.type,
      variety: req.body.variety,
      description: req.body.description,
      pricePerUnit: req.body.pricePerUnit,
      unit: req.body.unit,
      quantity: req.body.quantity,
      qualityOrSize: req.body.qualityOrSize,
      organic: req.body.organic,
      status: req.body.status,
      availableFrom: req.body.availableFrom ? new Date(req.body.availableFrom) : crop.availableFrom,
      contact: req.body.contact,
      address: req.body.address,
      deliveryAvailable: req.body.deliveryAvailable,
      discountPercent: req.body.discountPercent,
    };

    // remove undefined keys
    Object.keys(update).forEach(k => update[k] === undefined && delete update[k]);

    const updated = await Crop.findByIdAndUpdate(id, update, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a crop (only owner)
export const deleteCrop = async (req, res) => {
  try {
    const owner = req.userId;
    const { id } = req.params;

    const crop = await Crop.findById(id);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    if (String(crop.owner) !== String(owner))
      return res.status(403).json({ message: 'Not authorized' });

    await Crop.findByIdAndDelete(id);
    res.json({ message: 'Crop removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update only status quickly
export const updateStatus = async (req, res) => {
  try {
    const owner = req.userId;
    const { id } = req.params;
    const { status } = req.body; // 'sold' or 'available' etc.

    const crop = await Crop.findById(id);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    if (String(crop.owner) !== String(owner)) return res.status(403).json({ message: 'Not authorized' });

    crop.status = status;
    await crop.save();
    res.json(crop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
