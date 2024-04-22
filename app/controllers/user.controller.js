const { Op } = require("sequelize");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.getUsers = async (req, res) => {
  try {
    let data = await User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      limit: Number(req.query.limit ? req.query.limit : 10),
      offset: Number((((req.query.offset ? req.query.offset : 1) - 1) * (req.query.limit ? req.query.limit : 10))),
      order: [
        ["id", "ASC"]
      ],
    })
    res.status(200).json({
      response: {
        users: data,
        total: data.length
      }
    })
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.getUser = async (req, res) => {
  try {
    let data = await User.findOne({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      where: {
        id: {
          [Op.eq]: req.params.id
        }
      },
      include: {
        model:Role,
        where:{
          id: {
            [Op.eq]: req.params.id
        }
        }
      }
    })
    res.status(200).json({
      response: data
    })
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {

  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
