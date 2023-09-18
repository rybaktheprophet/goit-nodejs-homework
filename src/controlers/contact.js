const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const getControler = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    res.json({
      message: "Not found",
      code: 404,
    });
  }
};

const getByIdControler = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const [contact] = await getContactById(contactId);

    if (!contact) {
      throw "";
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    res.json({
      message: "Not found",
      code: 404,
    });
  }
};

const postControler = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);

    res.json({
      status: "created",
      code: 201,
      data: { contact },
    });
  } catch (error) {
    res.status(400).json({ message: `missing required ${error} field` });
  }
};

const deletControler = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contacts = await removeContact(contactId);

    if (contacts === undefined) {
      throw "";
    }

    res.json({
      masege: "contact deleted",
      code: 200,
    });
  } catch (error) {
    res.json({
      message: "Not found",
      code: 404,
    });
  }
};

const putControler = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  try {
    const arr = Object.keys(req.body);
    if (arr.length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }

    const newContact = await updateContact(contactId, body);

    if (newContact === undefined) {
      throw "";
    }

    res.status(200).json({ message: newContact });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  getControler,
  getByIdControler,
  postControler,
  deletControler,
  putControler,
};
