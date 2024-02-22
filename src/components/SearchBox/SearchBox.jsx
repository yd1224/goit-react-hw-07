import { useId } from "react";
import css from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue } from "../../redux/filtersSlice";
export const SearchBox = () => {
  const userId = useId();
  const dispatch = useDispatch();

  const filter = useSelector((state) => state.filters.name);
  const handleFilterChange = (evt) => dispatch(setInputValue(evt.target.value));

  return (
    <div className={css.divStyle}>
      <label htmlFor={userId}>Find contacts by name</label>
      <input
        className={css.input}
        type="text"
        name="userinput"
        value={filter}
        id={userId}
        onChange={(evt) => {
          handleFilterChange(evt);
          console.log(evt.target.value);
        }}
      />
    </div>
  );
};
