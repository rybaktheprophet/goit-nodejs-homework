const { readFile, writeFile } = require("node:fs/promises");
const { resolve } = require("node:path");

const CONTACTS_PATH = resolve("./models/contacts.json");

const listContacts = async () => {
  try {
    const data = await readFile(CONTACTS_PATH, {
      encoding: "utf8",
    });

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await readFile(CONTACTS_PATH, {
      encoding: "utf8",
    });

    return JSON.parse(data).filter(({ id }) => contactId === id);
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await readFile(CONTACTS_PATH, {
      encoding: "utf8",
    });

    const contacts = JSON.parse(data);

    const newcontacts = contacts.filter(({ id }) => id !== contactId);

    await writeFile(CONTACTS_PATH, JSON.stringify(newcontacts));

    return contacts;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async ({ id, name, email, phone }) => {
  const contact = {
    id,
    name,
    email,
    phone,
  };

  try {
    const data = await readFile(CONTACTS_PATH, {
      encoding: "utf8",
    });

    const contacts = JSON.parse(data);

    contacts.push(contact);

    await writeFile(CONTACTS_PATH, JSON.stringify(contacts));

    return contact;
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  try {
    const data = await readFile(CONTACTS_PATH, {
      encoding: "utf8",
    });

    const contacts = JSON.parse(data);

    const [contact] = contacts.filter(({ id }) => id === contactId);

    if (name !== undefined) {
      contact.name = name;
    }
    if (email !== undefined) {
      contact.email = email;
    }
    if (phone !== undefined) {
      contact.phone = phone;
    }

    writeFile(CONTACTS_PATH, JSON.stringify(contacts));

    return contact;
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
