const express = require("express");
const {
  postValidatorContact,
  putValidatorContact,
} = require("../../src/validation/contacts.js");
const {
  getControler,
  getByIdControler,
  postControler,
  deletControler,
  putControler,
} = require("../../src/controlers/contact.js");

const router = express.Router();

router.get("/", getControler);

router.get("/:contactId", getByIdControler);

router.post("/", postValidatorContact, postControler);

router.delete("/:contactId", deletControler);

router.put("/:contactId", putValidatorContact, putControler);

module.exports = router;
