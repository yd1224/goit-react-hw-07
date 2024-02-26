import { ContactList } from "./components/ContactList/ContactList";
import { SearchBox } from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactForm/ContactForm";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { FetchContacts } from "./redux/operations";
import { useSelector } from "react-redux";
import { selectContactsNumber, selectError } from "./redux/selectors";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState("delete");
  const [id, setId] = useState("");
  const contactsNumber = useSelector(selectContactsNumber);

  useEffect(() => {
    dispatch(FetchContacts());
  }, [dispatch]);

  const SearchRef = useRef();

  const handleScroll = (id) => {
    const dims = SearchRef.current.getBoundingClientRect();

    window.scrollTo({
      top: dims.top,
      behavior: "smooth",
    });
    setFlag("change");
    setId(id);
  };

  const error = useSelector(selectError);

  useEffect(() => {
    if (error.length > 0) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div>
      <div className="wrapper">
        <h1>Phonebook</h1>
        <h2 className="num">{contactsNumber} contacts</h2>
      </div>

      <ContactForm ref={SearchRef} flag={flag} id={id} setFlag={setFlag} />
      <SearchBox />
      <ContactList handleScroll={handleScroll} />
      <Toaster position="top-right"></Toaster>
    </div>
  );
}

export default App;
