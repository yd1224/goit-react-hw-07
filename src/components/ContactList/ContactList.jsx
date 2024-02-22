import { Contact } from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";
const getVisibleContacts = (contacts, inputValue) => {
  console.log("filter", contacts);
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
};

export const ContactList = ({ onDelete }) => {
  const contacts = useSelector((state) => state.contacts.items);
  const loading = useSelector((state) => state.contacts.loading);
  const error = useSelector((state) => state.contacts.error);
  console.log("contacts", contacts);
  const inputValue = useSelector((state) => state.filters.name);
  console.log(inputValue);
  const visibleContacts = getVisibleContacts(contacts, inputValue);

  return (
    <>
      {loading && (
        <div className={css.colorRingWrapperBox}>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#646cff", "#a0a1c3", "#4044d0", "#40a8d0", "#021f29"]}
          />
        </div>
      )}
      {error && <p className={css.error}>Ooooops... Try reloading the page</p>}
      <ul>
        {visibleContacts.map((contact) => {
          return (
            <li className={css.list} key={contact.id}>
              <Contact user={contact} onDelete={onDelete} />
            </li>
          );
        })}{" "}
      </ul>
    </>
  );
};
