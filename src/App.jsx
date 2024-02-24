import { ContactList } from "./components/ContactList/ContactList";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchContacts } from "./redux/operations";
import { useSelector } from "react-redux";
import { selectContactsNumber } from "./redux/selectors";
function App() {
  const dispatch = useDispatch();
  const contactsNumber = useSelector(selectContactsNumber);
  useEffect(() => {
    dispatch(FetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div className="wrapper">
        <h1>Phonebook</h1>
        <h2 className="num">{contactsNumber} contacts</h2>
      </div>

      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
