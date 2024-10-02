const events = require("express").Router();
const { Event } = require('../models');

// Event Index route - GET
events.get("/", async (req, res) => {
  try {
    // Find all in ascending order - ASC
    const allEvents = await Event.findAll({
      order: [["date", "ASC"]],
    });
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Event Show Route - GET
events.get("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({
      where: { event_id: req.params.id },
    });
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create Event Route - POST
events.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(201).json({
      message: "New Event added.",
      data: newEvent,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Event Update Route - PUT
events.put("/:id", async (req, res) => {
  try {
    const updatedEvents = await Event.update(req.body, {
      where: {
        event_id: req.params.id,
      },
    });
    if (updatedEvents[0]) {
      res.status(200).json({
        message: `Successfully updated event with ID ${req.params.id}`,
      });
    } else {
      res.status(404).json({
        message: `Event with ID ${req.params.id} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Event Delete Route - DELETE
events.delete("/:id", async (req, res) => {
  try {
    const deletedEvents = await Event.destroy({
      where: {
        event_id: req.params.id,
      },
    });
    if (deletedEvents) {
      res.status(200).json({
        message: `Deleted event with ID ${req.params.id} successfully.`,
      });
    } else {
      res.status(404).json({
        message: `Event with ID ${req.params.id} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = events;