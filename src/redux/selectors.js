import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;
export const selectFilters = (state) => state.filters.name;

export const selectContactsNumber = createSelector(
  [selectContacts],
  (contacts) => {
    return contacts.length;
  }
);

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, inputValue) => {
    return contacts.filter((contact) => {
      const nameWords = contact.name.toLowerCase();
      const searchTermArray = inputValue.toLowerCase().split(" ");
      if (
        searchTermArray.every(
          (word) =>
            nameWords.split(" ").includes(word) ||
            nameWords.split(" ").some((a) => a.startsWith(word))
        )
      ) {
        return true;
      }
    });
  }
);

// export const selectVisibleContacts = (state) => {
//   const contacts = selectContacts(state);
//   const inputValue = selectFilters(state);
//   return contacts.filter((contact) => {
//     const nameWords = contact.name.toLowerCase();
//     const searchTermArray = inputValue.toLowerCase().split(" ");
//     if (
//       searchTermArray.every(
//         (word) =>
//           nameWords.split(" ").includes(word) ||
//           nameWords.split(" ").some((a) => a.startsWith(word))
//       )
//     ) {
//       return true;
//     }
//   });
// };

// export const selectContactsNumber = (state) => {
//   console.log("selectContactsNumber");
//   const contacts = selectContacts(state);
//   return contacts.length;
// };
