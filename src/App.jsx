import { ContactList } from "./components/ContactList/ContactList";
import { SearchBox } from "./components/SearchBox/SearchBox";
import { ContactForm } from "./components/ContactForm/ContactForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { FetchContacts, fetchPending } from "./redux/contactsSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController();

    dispatch(FetchContacts(controller.signal));

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
}

export default App;
