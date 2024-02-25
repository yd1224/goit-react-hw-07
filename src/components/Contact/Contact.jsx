import css from "./Contact.module.css";
import { FaUserLarge } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
import { ModalWindow } from "../Modal/modal";
import { MdDeleteForever } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

export const Contact = ({ user: { name, phone, id }, onhandleScroll }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  const handleDelete = () => {
    openModal();
  };

  return (
    <>
      <div className={css.profile}>
        <div className={css.box}>
          <div className={css.wrapper}>
            <FaUserLarge size={20} />
            <p className={css.name}>{name}</p>
          </div>
          <div className={css.wrapper}>
            <FaPhoneAlt size={20} />
            <p className={css.label}>{phone}</p>
          </div>
        </div>

        <div className={css.wrapper2}>
          <FaPencil
            onClick={() => onhandleScroll(id)}
            size={28}
            className={css.change}
          />
          <MdDeleteForever
            size={32}
            className={css.delete}
            onClick={handleDelete}
          >
            Delete
          </MdDeleteForever>
        </div>
      </div>
      <ModalWindow
        isOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        id={id}
      ></ModalWindow>
    </>
  );
};
