import css from "./Contact.module.css";
import { FaUserLarge } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { deleteContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";
export const Contact = ({ user: { name, number, id } }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));
  return (
    <div className={css.profile}>
      <div className={css.box}>
        <div className={css.wrapper}>
          <FaUserLarge size={20} />
          <p className={css.name}>{name}</p>
        </div>
        <div className={css.wrapper}>
          <FaPhoneAlt size={20} />
          <p className={css.label}>{number}</p>
        </div>
      </div>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
