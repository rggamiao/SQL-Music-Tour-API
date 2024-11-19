const bands = require("express").Router();
const express = require('express');
const router = express.Router();
const { where } = require("sequelize");
const db = require("../models");
const { Op } = require("sequelize");
const { Band, MeetGreet } = db;
const SetTime = require("../models/setTimes");
const Event = require("../models/events")

// Band Index route - GET
bands.get("/", async (req, res) => {
  try {
    // Find all in ascending order - ASC
    const foundBands = await Band.findAll({
      order: [["available_start_time", "ASC"]],
      // Functionality for query by name
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundBands);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Band Show Route with MeetGreet, Event, & SetTime render WIP - GET

bands.get("/:name", async (req, res) => {
  try {
    const foundBand = await Band.findOne({
      where: { name: req.query.name },
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          attributes: { exclude: ["band_id", "event_id"] },
          include: {
            model: Event,
            as: "event",
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
        {
          model: SetTime,
          as: "set_times",
          attributes: { exclude: ["band_id", "event_id"] },
          include: {
            model: Event,
            as: "event",
            where: {
              name: {
                [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
              },
            },
          },
        },
        {
          model: Stage,
          as: "stage",
          attributes: ["stage_id", "stage_name"],
          include: [
            {
              model: StageEvent,
              as: "stage_events",
              attributes: ["stage_event_id", "event_id"],
              include: {
                model: Event,
                as: "event",
                where: {
                  name: {
                    [Op.like]: `%${req.query.event ? req.query.event : ""}%`,
                  },
                },
              },
            },
          ],
        },
      ],
    });
    res.status(200).json(foundBand);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Create a Band Route - POST
bands.post("/", async (req, res) => {
  try {
    const newBand = await Band.create(req.body);
    res.status(200).json({
      message: "New bands added.",
      data: newBand,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Band Route - PUT
bands.put("/:id", async (req, res) => {
  try {
    const updatedBands = await Band.update(req.body, {
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedBands} band(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Route - DELETE
bands.delete("/:id", async (req, res) => {
  try {
    const deleteBands = await Band.destroy({
      where: {
        band_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Deleted ${deleteBands} band(s) successfully.`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = bands;