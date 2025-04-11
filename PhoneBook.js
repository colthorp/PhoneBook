import { sortContacts } from "./utils/sort.js";

let contacts = [];

document.addEventListener('DOMContentLoaded', () => {
  loadContacts();

  document.getElementById('contact-form').addEventListener('submit', addContacts);
  document.getElementById('search').addEventListener('input', () => {
    searchContacts(contacts, displayContacts);
  });
});

/**Load Contacts*/
function loadContacts() {
    contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    sortContacts(contacts, saveContacts, displayContacts); 
}

/**Save Contacts*/
function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

/**Add Contacts*/
function addContacts(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name && phone && email) {
        const newContact = {
            id: Date.now(),
            name,
            phone,
            email
        };

        contacts.push(newContact);
        sortContacts(contacts, saveContacts, displayContacts);
        saveContacts();
        document.getElementById('contact-form').reset();
    }
}

/**Display Contacts*/
function displayContacts(contactToDisplay) {
    const tbody = document.querySelector('#contacts-table tbody');
    tbody.innerHTML = '';

    contactToDisplay.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td class="action-buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>    
        `;
        tbody.appendChild(row);

        const editButton = row.querySelector('.edit');
        const deleteButton = row.querySelector('.delete');

        editButton.addEventListener('click', () => editContact(contact.id));
        deleteButton.addEventListener('click', () => deleteContact(contact.id));
    });
}

/**Edit Contact*/ 
function editContact(id) {
    const contactToEdit = contacts.find(contact => contact.id === id);

    if (contactToEdit) {
        document.getElementById('name').value = contactToEdit.name;
        document.getElementById('phone').value = contactToEdit.phone;
        document.getElementById('email').value = contactToEdit.email;

        deleteContact(id);
    } 
}

/**Delete Contacts*/
function deleteContact(id) {
    contacts = contacts.filter(contact => contact.id !== id);
    sortContacts(contacts, saveContacts, displayContacts);
    saveContacts();
    displayContacts(contacts);
}

/**Search Contacts */
function searchContacts() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
    );

    displayContacts(filteredContacts);
}
