import Modal from "react-modal";
import css from "./modal.module.css";
import { deleteContact } from "../../redux/operations";

import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#242424",
    borderRadius: "30px",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(113, 106, 106, 0.5)",
  },
};

export const ModalWindow = ({ isOpen, setIsOpen, id }) => {
  Modal.setAppElement("#root");

  function closeModal() {
    setIsOpen(false);
  }
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldCloseOnEsc={true}
        className={css.box}
      >
        <h2 className={css.title}>Are you sure you want to delete?</h2>

        <div className={css.wrapper}>
          <button
            onClick={() => {
              dispatch(deleteContact(id));
              toast.success("Successfully deleted!");
            }}
            className={css.btn1}
          >
            Yes
          </button>
          <button onClick={closeModal} className={css.btn2}>
            No
          </button>
        </div>
      </Modal>
    </div>
  );
};
