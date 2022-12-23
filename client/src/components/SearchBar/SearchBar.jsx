import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipebyName, setCurrentPage } from "../../redux/actions";
import "../SearchBar/searchbar.css";

const SearchBar = (props) => {
  //check props
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);

  //--------------> LOCAL STATE
  const [name, setName] = useState("");

  //--------------------------> HANDLERS <--------------------------

  const updateName = (e) => {
    e.preventDefault();
    // obtenemos el valor del campo de búsqueda
    const input = e.target.value;

    // si el valor del campo de búsqueda es vacío, establecemos el estado name en una cadena vacía
    if (input === "") {
      setName("");
      return;
    }

    // validamos el valor del campo de búsqueda
    const regex = /^[a-zA-Z]+$/; // expresión regular que solo permite letras, números y espacios
    if (!regex.test(input)) {
      // mostramos el mensaje de alerta solo si el valor del campo de búsqueda no es vacío
      alert(
        "El campo de búsqueda no puede contener caracteres especiales o estar vacío"
      );
      return;
    }

    setName(input);
  };

  useEffect(() => {
    dispatch(getRecipebyName(name));
  }, [name]);

  return (
    <div className="searchBar-wrap">
      <input
        type="text"
        value={name}
        placeholder="🔎 Search . . ."
        onChange={updateName}
      />
    </div>
  );
};

export default SearchBar;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getRecipebyName, setCurrentPage } from "../../redux/actions";
// import "../SearchBar/searchbar.css";

// const SearchBar = (props) => {
//   //check props
//   const dispatch = useDispatch();
//   const allRecipes = useSelector((state) => state.allRecipes);

//   //--------------> LOCAL STATE
//   const [name, setName] = useState("");

//   //--------------------------> HANDLERS <--------------------------

//   const inputHandler = (e) => {
//     e.preventDefault();
//     setName(e.target.value);
//   };

//   // const onSubmitHandler = (e) => {
//   //   e.preventDefault();
//   //   setName(name);
//   //   dispatch(getRecipebyName(name));
//   //   setName("");
//   //   dispatch(setCurrentPage(1));
//   // };

//   useEffect(() => {
//     dispatch(getRecipebyName(name));
//   }, [name]);

//   return (
//     <div className="searchBar-wrap">
//       <input
//         type="text"
//         value={name}
//         placeholder="🔎 Search . . ."
//         onChange={(e) => inputHandler(e)}
//       />

//       {/* <div className="dropdown">
//         {allRecipes
//           .filter((el) => {
//             const searchTerm = name.toLowerCase();
//             const recName = el.name.toLowerCase();

//             return (
//               searchTerm &&
//               recName.includes(searchTerm) &&
//               recName !== searchTerm
//             );
//           })
//           .slice(0, 5)
//           .map((el) => (
//             <select
//               // onClick={(e) => onSubmitHandler(e)}
//               className="dropdown-row"
//             >
//               {el.name}
//             </select>
//           ))}
//       </div> */}
//     </div>
//   );
// };

// export default SearchBar;
