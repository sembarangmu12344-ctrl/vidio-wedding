const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// Get all templates
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }

    const templates = await Template.find(filter).sort({ usageCount: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get template by ID
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findOne({ id: req.params.id, isActive: true });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create template (admin)
router.post('/', async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update template (admin)
router.put('/:id', async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Increment template usage
router.post('/:id/use', async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
      { id: req.params.id },
      { $inc: { usageCount: 1 } },
      { new: true }
    );

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json({ message: 'Template usage recorded', template });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
