import { createSlice } from "@reduxjs/toolkit";
import {
  FetchContacts,
  deleteContact,
  addContact,
  changeContact,
} from "./operations";
// import { nanoid } from "nanoid";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: "",
  },
  extraReducers: (builder) =>
    builder
      .addCase(FetchContacts.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(FetchContacts.fulfilled, (state, action) => {
        state.error = false;
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(FetchContacts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(changeContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      }),
});
export const contactsReducer = contactsSlice.reducer;

// export const FetchContacts = (controller) => async (dispatch) => {
//   try {
//     dispatch(fetchPending());
//     const options = {
//       signal: controller,
//     };
//     const response = await axios.get(
//       "https://65d789d327d9a3bc1d7b4592.mockapi.io/contacts",
//       options
//     );
//     dispatch(fetchSuccess(response.data));
//   } catch (error) {
//     if (error.code !== "ERR_CANCELED") {
//       dispatch(fetchError());
//     }
//   }
// };

// reducers: {
//     fetchPending(state, action) {
//       state.error = false;
//       state.loading = true;
//     },
//     fetchSuccess(state, action) {
//       state.error = false;
//       state.loading = false;
//       state.items.push(...action.payload);
//     },
//     fetchError(state, action) {
//       state.error = true;
//       state.loading = false;
//     },
//     deleteContact: (state, action) => {
//       const index = state.findIndex((contact) => contact.id === action.payload);
//       state.splice(index, 1);
//     },
//     addContact: {
//       reducer(state, action) {
//         state.push(action.payload);
//       },
//       prepare(text) {
//         return {
//           payload: {
//             id: nanoid(),
//             ...text,
//           },
//         };
//       },
//     },
//   },
