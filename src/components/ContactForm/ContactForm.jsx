import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { addContact } from "../../redux/operations";
import { useDispatch } from "react-redux";
export const ContactForm = () => {
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

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        dispatch(addContact(values));
        actions.resetForm();
      }}
      validationSchema={contactSchema}
    >
      <Form className={css.form}>
        <label htmlFor={userId1}>Name</label>
        <Field className={css.input} type="text" name="name" id={userId1} />
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
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};
