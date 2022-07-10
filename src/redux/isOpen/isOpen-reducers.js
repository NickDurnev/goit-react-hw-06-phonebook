import { createReducer, combineReducers} from "@reduxjs/toolkit";
import { setModalOpen, setDropListOpen } from "./isOpen-actions";

const modal = createReducer(false, {
    [setModalOpen]: (_, { payload }) => payload,
});

const dropList = createReducer(false, {
    [setDropListOpen]: (_, { payload }) => payload,
})

export default combineReducers({
    modal,
    dropList,
});