import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/contacts-reducers';
import themeReducer from "./theme/theme-reducers";
import isOpenReducer from "./isOpen/isOpen-reducers";

const contactsPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter']
}

const themePersistConfig = {
  key: 'theme',
  storage,
}

const rootReducer = combineReducers(({
    contacts: persistReducer(contactsPersistConfig, contactsReducer),
    theme: persistReducer(themePersistConfig, themeReducer),
    isOpen: isOpenReducer,
}));

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV === 'development',
});

export let persistor = persistStore(store);

