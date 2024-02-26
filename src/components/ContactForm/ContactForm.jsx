import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, forwardRef, useEffect, useState } from "react";
import * as Yup from "yup";
import { addContact, changeContact } from "../../redux/operations";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/selectors";
import { useRef } from "react";

// Use forwardRef properly to forward the ref
const ContactForm = forwardRef(({ flag, id, setFlag }, ref) => {
  const btnRef = useRef();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const contactSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .matches(
        /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
        "Phone type is wrong"
      )
      .required("Required"),
  });

  const userId1 = useId();
  const userId2 = useId();
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (flag === "change") {
      const contact = contacts.find((item) => item.id === id);

      btnRef.current.innerText = "Save changes";
      if (contact) {
        setName(contact.name);
        setPhone(contact.phone);
      }
    } else {
      // Reset initial values if flag is not "change"
      setName("");
      setPhone("");
    }
  }, [flag, id, contacts, name, phone]);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: name,
          phone: phone,
        }}
        onSubmit={(values, actions) => {
          if (flag === "change") {
            dispatch(changeContact({ values, contacts, id }));
            setFlag("delete");
          } else {
            dispatch(addContact({ values, contacts }));
          }

          actions.resetForm();
        }}
        validationSchema={contactSchema}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <label htmlFor={userId1}>Name</label>
            <Field
              className={css.input}
              type="text"
              name="name"
              id={userId1}
              innerRef={ref} // Assign ref to the input field
            />
            <ErrorMessage className={css.err} name="name" component="p" />
            <label htmlFor={userId2}>Number</label>
            <Field
              className={css.input}
              type="text"
              name="phone"
              id={userId2}
              placeholder="Enter a number (e.g., 111-22-33)"
            />
            <ErrorMessage className={css.err} name="phone" component="p" />
            <button
              ref={btnRef}
              className={css.btn}
              type="submit"
              disabled={isSubmitting}
            >
              Add contact
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
});
ContactForm.displayName = "ContactForm";
export default ContactForm;
