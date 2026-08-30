const express = require('express');
const router = express.Router();
const Invitation = require('../models/Invitation');

// Get all invitations (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const invitations = await Invitation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Invitation.countDocuments();

    res.json({
      invitations,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get invitation by slug
router.get('/:slug', async (req, res) => {
  try {
    const invitation = await Invitation.findOne({ slug: req.params.slug });
    
    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    // Increment views
    invitation.views += 1;
    await invitation.save();

    res.json(invitation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new invitation
router.post('/', async (req, res) => {
  try {
    const invitation = new Invitation(req.body);
    await invitation.save();
    res.status(201).json(invitation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update invitation
router.put('/:slug', async (req, res) => {
  try {
    const invitation = await Invitation.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true, runValidators: true }
    );

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    res.json(invitation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete invitation
router.delete('/:slug', async (req, res) => {
  try {
    const invitation = await Invitation.findOneAndDelete({ slug: req.params.slug });

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    res.json({ message: 'Invitation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit RSVP
router.post('/:slug/rsvp', async (req, res) => {
  try {
    const invitation = await Invitation.findOne({ slug: req.params.slug });

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    invitation.rsvp.push(req.body);
    await invitation.save();

    res.status(201).json({ 
      message: 'RSVP submitted successfully',
      rsvp: invitation.rsvp[invitation.rsvp.length - 1]
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get RSVPs for an invitation
router.get('/:slug/rsvp', async (req, res) => {
  try {
    const invitation = await Invitation.findOne({ slug: req.params.slug });

    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    res.json({ rsvp: invitation.rsvp });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
