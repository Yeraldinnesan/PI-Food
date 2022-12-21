import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipebyName, setCurrentPage } from "../../redux/actions";

const SearchBar = (props) => {
  //check props
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);

  //--------------> LOCAL STATE
  const [name, setName] = useState("");

  //--------------------------> HANDLERS <--------------------------

  const inputHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setName(name);
    dispatch(getRecipebyName(name));
    setName("");
    dispatch(setCurrentPage(1));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        placeholder="Buscar..."
        onChange={(e) => inputHandler(e)}
      />
      <button
        type="submit"
        onClick={(e) => {
          onSubmitHandler(e);
        }}
      >
        Search
      </button>
      {allRecipes
        .filter((el) => {
          const searchTerm = name.toLowerCase();
          const recName = el.name.toLowerCase();

          return (
            searchTerm && recName.includes(searchTerm) && recName !== searchTerm
          );
        })
        .slice(0, 5)
        .map((el) => (
          <div onClick={(e) => onSubmitHandler(e)} className="dropdown-row">
            {el.name}
          </div>
        ))}
    </div>
  );
};

export default SearchBar;
