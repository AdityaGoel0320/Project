const express = require('express');
const multer = require('multer');
const Material = require('../models/Material');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/materials', async (req, res) => {
  try {
    const materials = await Material.find({});
    res.json(materials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/materials/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (material == null) {
      return res.status(404).json({ message: 'Cannot find material' });
    }
    res.json(material);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/materials', upload.single('image'), async (req, res) => {
  const material = new Material({
    name: req.body.name,
    technology: req.body.technology,
    colors: req.body.colors.split(','),
    pricePerGram: req.body.pricePerGram,
    applicationTypes: req.body.applicationTypes.split(','),
    imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
  });

  try {
    const newMaterial = await material.save();
    res.status(201).json(newMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/materials/:id', upload.single('image'), async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (material == null) {
      return res.status(404).json({ message: 'Cannot find material' });
    }

    if (req.body.name != null) {
      material.name = req.body.name;
    }
    if (req.body.technology != null) {
      material.technology = req.body.technology;
    }
    if (req.body.colors != null) {
      material.colors = req.body.colors.split(',');
    }
    if (req.body.pricePerGram != null) {
      material.pricePerGram = req.body.pricePerGram;
    }
    if (req.body.applicationTypes != null) {
      material.applicationTypes = req.body.applicationTypes.split(',');
    }
    if (req.file != null) {
      material.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedMaterial = await material.save();
    res.json(updatedMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/materials/:id', async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (material == null) {
      return res.status(404).json({ message: 'Cannot find material' });
    }

    await material.remove();
    res.json({ message: 'Material deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
