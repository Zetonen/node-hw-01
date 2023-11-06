import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

export const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = (path, contacts) =>
  fs.writeFile(path, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};

export const addContact = async (date) => {
  const contacts = await listContacts();
  const contact = { ...date, id: nanoid() };
  contacts.push(contact);
  updateContacts(contactsPath, contacts);
  return contact || null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const [contact] = contacts.splice(contactIndex, 1);
  updateContacts(contactsPath, contacts);
  return contact || null;
};
