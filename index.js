const contactsOperations = require("./contacts");
const argv = require('yargs/yargs')(process.argv.slice(2))
    .option('id', {
        type: 'string'
    })
    .argv

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts)
      break;

    case 'get':
        const contactById = await contactsOperations.getContactById(id);
        if(!contactById) {
            throw new Error(`Contact with id ${id} not found`)
        }
        console.log(contactById)
        break;

    case 'add':
        const newContact = await contactsOperations.addContact(name, email, phone);
        console.log(newContact)
      break;

    case 'remove':
        const removedContact = await contactsOperations.removeContact(id);
        console.log(removedContact)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
