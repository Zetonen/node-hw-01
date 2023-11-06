import { program } from "commander";
import * as contactsService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const option = program.opts();
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsService.listContacts();
      return console.table(contacts);

    case "get":
      const contact = await contactsService.getContactById(id);
      return console.log(contact);

    case "add":
      const addContact = await contactsService.addContact({
        name,
        email,
        phone,
      });
      return console.log(addContact);

    case "remove":
      const removeContact = await contactsService.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
invokeAction(option);