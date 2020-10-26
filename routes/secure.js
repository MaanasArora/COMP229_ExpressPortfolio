const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const User = require("../models/user");
const Contact = require("../models/contact");

router.get("/login", function (req, res, next) {
  res.render("secure/login", {
    title: "Secure Login View (Maanas Arora)",
    incorrectRedirect: req.query.incorrect,
  });
});

router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) throw err;

    if (user) {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
          res.cookie("username", user.username);
          res.redirect("/secure/list");
        } else {
          res.redirect("/secure/login?incorrect=True");
        }
      });
    } else {
      res.redirect("/secure/login?incorrect=True");
    }
  });
});

router.get("/list", function (req, res, next) {
  if (req.cookies.username) {
    Contact.find({}, function (err, contacts) {
      if (err) throw err;

      res.render("secure/list", {
        title: "Contact List (Maanas Arora)",
        contacts: contacts,
      });
    });
  } else {
    res.redirect("/secure/login");
  }
});

router.get("/update", function (req, res, next) {
  if (req.cookies.username) {
    res.render("secure/update", { title: "Contact Update (Maanas Arora)" });
  } else {
    res.redirect("/secure/login");
  }
});

module.exports = router;
