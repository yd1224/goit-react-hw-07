import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchPending(state, action) {
      state.error = false;
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.error = false;
      state.loading = false;
      state.items.push(...action.payload);
    },
    fetchError(state, action) {
      state.error = true;
      state.loading = false;
    },
    deleteContact: (state, action) => {
      const index = state.findIndex((contact) => contact.id === action.payload);
      state.splice(index, 1);
    },
    addContact: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            ...text,
          },
        };
      },
    },
  },
});
export const {
  deleteContact,
  addContact,
  fetchPending,
  fetchSuccess,
  fetchError,
} = contactsSlice.actions;
export const FetchContacts = (controller) => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const options = {
      signal: controller,
    };
    const response = await axios.get(
      "https://65d789d327d9a3bc1d7b4592.mockapi.io/contacts",
      options
    );
    dispatch(fetchSuccess(response.data));
    console.log("response", response);
  } catch (error) {
    if (error.code !== "ERR_CANCELED") {
      dispatch(fetchError());
    }
  }
};
export const contactsReducer = contactsSlice.reducer;
