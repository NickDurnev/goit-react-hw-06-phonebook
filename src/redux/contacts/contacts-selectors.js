const getContacts = state => state.contacts.items;
const getFilter = state => state.contacts.filter;

const getFilteredContacts = state => {
    const contacts = getContacts(state);
    const filter = getFilter(state);
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );
};

export default getFilteredContacts;