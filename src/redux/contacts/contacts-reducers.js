import { createReducer, combineReducers } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import actions from './contacts-actions';

const items = createReducer([], {
    [actions.addContact]: (state, { payload }) => {
        const names = state.map(contact => contact.name.toLowerCase());
    if (names.includes(payload.name.toLowerCase())) {
      toast.error(`${payload.name} is already in contacts`);
      return;
        }
    return [...state, payload]
    },
    [actions.deleteContact]: (state, { payload }) => state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
    [actions.changeFilter]: (_, {payload}) => payload,
});

export default combineReducers({
    items,
    filter,
})

