import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import validate from "./validate";
import { Link } from "react-router-dom";
import {
  postRecipe,
  getAllDiets,
  getAllRecipes,
  setCurrentPage,
  clearRecipes,
} from "../../redux/actions/index";

export const CreateRecipe = (props) => {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.allRecipes);
  const diets = useSelector((state) => state.diets);
  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    summary: "",
    healthScore: 10,
    image: "",
    diets: [],
    steps: "",
  });
  const [errorInput, setErrorInput] = useState({
    name: "",
    summary: "",
    healthScore: 0,
    image: "",
    diets: [],
    steps: "",
  });

  useEffect(() => {
    dispatch(getAllDiets());
  }, [dispatch]);

  ///"handleCheckChange" se utiliza para manejar el cambio de estado de los campos de tipo checkbox que seleccionan las dietas de la receta. Actualiza el estado de "input" y "errorInput" con la nueva información.
  const handleCheckChange = (e) => {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });

      setErrorInput(
        validate({
          ...input,
          diets: [...input.diets, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((t) => t !== e.target.value),
      });

      setErrorInput(
        validate(
          {
            ...input,
            diets: input.diets.filter((t) => t !== e.target.value),
          },
          [...allRecipes]
        )
      );
    }
  };

  ///"handleChange" se utiliza para manejar el cambio de estado de los demás campos de "input". Actualiza el estado de "input" y "errorInput" con la nueva información.
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
    setErrorInput(
      validate({ ...input, [event.target.name]: event.target.value })
    );
  };

  ///"handleSubmit" se utiliza para manejar el envío del formulario. Valida la información de "input" y, si es válida, envía una acción de "postRecipes" al almacenamiento de Redux y navega a la página principal.
  const handleSubmit = (event) => {
    event.preventDefault();
    if (allRecipes.find((ele) => ele.name === input.name)) {
      alert("Esta receta ya existe");
      return;
    }

    dispatch(postRecipe(input));
    setInput({
      ...input,
      name: "",
      summary: "",
      healthScore: 10,
      image: "",
      diets: [],
      steps: "",
    });
    alert("receta creada correctamente");
    history.push("/home");
  };

  return (
    <div>
      <div>
        <Link to="/home">
          <button>Back to home</button>
        </Link>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Name:</label>

            <input
              type="text"
              name="name"
              placeholder="Escribe el nombre de tu receta.."
              value={input.name}
              onChange={(e) => handleChange(e)}
            />
            {errorInput.name ? <span>{errorInput.name}</span> : <span></span>}
            <label>Descripcion:</label>

            <textarea
              type="text"
              name="summary"
              placeholder="Descripcion de tu receta"
              value={input.summary}
              onChange={(e) => handleChange(e)}
            />
            {errorInput.summary ? (
              <span>{errorInput.summary}</span>
            ) : (
              <span></span>
            )}
            <label>Puntaje nutricional:</label>
            <input
              type="number"
              name="healthScore"
              placeholder="¿Que puntaje nutricional posee?"
              value={input.healthScore}
              onChange={(e) => handleChange(e)}
            />
            {errorInput.healthScore ? (
              <span>{errorInput.healthScore}</span>
            ) : (
              <span></span>
            )}
            <label>Imagen:</label>
            <input
              type="text"
              name="image"
              placeholder="Por favor un enlace con la foto de tu receta"
              value={input.image}
              onChange={(e) => handleChange(e)}
            />
            {errorInput.image ? <span>{errorInput.image}</span> : <span></span>}

            <label>Pasos de preparacion:</label>
            <textarea
              type="text"
              name="steps"
              placeholder="Pasos para realizar la receta"
              value={input.steps}
              onChange={(e) => handleChange(e)}
            />
            {errorInput.steps ? <span>{errorInput.steps}</span> : <span></span>}

            {!Object.entries(errorInput).length ? (
              <button type="submit">Create Recipe</button>
            ) : (
              <div>
                <button type="submit" disabled>
                  Create Recipe
                </button>
                <span>Incomplete required fields</span>
              </div>
            )}
          </div>

          <div>
            <div>
              <label>Types of Diets:</label>
              {diets?.map((element, index) => {
                return (
                  <label key={index}>
                    <input
                      key={element.id}
                      type="checkbox"
                      value={element.name}
                      name={element.name}
                      onChange={handleCheckChange}
                    />

                    {element.name}
                  </label>
                );
              })}
              {errorInput.diets ? (
                <span>{errorInput.diets}</span>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

//---------------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
// import {
//   postRecipe,
//   getAllDiets,
//   getAllRecipes,
//   setCurrentPage,
//   clearRecipes,
// } from "../../redux/actions/index";

// import Loading from "../Loading/Loading";
// import styles from "./CreateRecipe.module.css";

// const CreateRecipe = () => {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   // console.log(history);

//   const allRecipes = useSelector((state) => state.allRecipes);
//   const diets = useSelector((state) => state.diets);

//   //----------------------------> LOCAL STATES <------------------------------
//   const [errors, setErrors] = useState({
//     name: "",
//     summary: "",
//     diets: [],
//     cookingTime: 20,
//     healthScore: 10,
//     steps: "",
//     image: "",
//   });

//   const [input, setInput] = useState({
//     name: "",
//     summary: "",
//     diets: [],
//     cookingTime: 20,
//     healthScore: 10,
//     steps: "",
//     image: "",
//   });
//   //-------------------------> RENDERS ALL DIET IN SELECT <----------
//   useEffect(() => {
//     dispatch(getAllDiets());
//   }, []);

//   //-------------------------> HANDLERS <--------------------------

//   const InputChangeHandler = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     });
//     console.log(input);
//   };

//   const deleteDietHandler = (e) => {
//     e.preventDefault();
//     setInput({
//       ...input,
//       diets: input.diets.filter((el) => el !== e.target.value),
//     });
//     setErrors(
//       validateInputs({
//         ...input,
//         diets: input.diets.filter((el) => el !== e.target.value),
//       })
//     );
//   };

//   const selectDietsHandler = (e) => {
//     if (input.diets.includes(e.target.value)) return;
//     setInput({
//       ...input,
//       diets: input.diets.filter((type) => type !== e.target.value),
//     });
//     setErrors(
//       validateInputs({ ...input, diets: [...input.diets, e.target.value] })
//     );
//   };

//   const numberInputHandler = (e) => {
//     try {
//       if (
//         Number.isInteger(e.target.value) &&
//         e.target.value >= 10 &&
//         e.target.value <= 100
//       ) {
//         setInput({
//           ...input,
//           [e.target.name]: e.target.value,
//         });
//       }
//     } catch {
//       console.log("error");
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//     //Validates if a recipe with the same name already exists
//     if (
//       allRecipes.find(
//         (el) => el.name.toLowerCase() === input.name.toLowerCase()
//       )
//     ) {
//       alert("A recipe with the same name already exists");
//       setInput({
//         name: "",
//         summary: "",
//         diets: [],
//         cookingTime: 20,
//         healthScore: 10,
//         steps: "",
//         image: "",
//       });
//       history.push("/create");
//     } else {
//       dispatch(postRecipe(input));
//       alert("The recipe was created Succesfully!!!");
//       setInput({
//         name: "",
//         summary: "",
//         diets: [],
//         cookingTime: 20,
//         healthScore: 10,
//         steps: "",
//         image: "",
//       });
//       dispatch(setCurrentPage(1));
//       dispatch(clearRecipes());
//       history.push("/home");
//     }
//   };

//   //------------------>CHECK BOX EXAMPLE----------------------
//   /* <label><input
//   type='radio'
//   name={el}
//   value={el}
//   onChange={(e)=>{radioHandler(e)}}
//    <

//   const radioHandler = (e)=>{
//     e.target.checked ? setInput({...state, status: e.target.value}):null
//   }
// */

//   return (
//     <div>
//       <Link to="/home">
//         <button>Home</button>
//       </Link>
//       <h1>Create your own recipe!</h1>
//       {!diets.length ? (
//         <Loading />
//       ) : (
//         <form onSubmit={(e) => submitHandler(e)}>
//           <p className={styles.manField}>* Mandatory fields</p>
//           <div>
//             <label>Recipe name *</label>
//             <input
//               type="text"
//               value={input.name}
//               name="name"
//               placeholder="✏️ Name your recipe..."
//               onChange={(e) => InputChangeHandler(e)}
//             />
//             {errors.name && <p className={styles.ps}>{errors.name}</p>}
//           </div>
//           <hr />
//           <div>
//             <label>Image</label>
//             <input
//               type="url"
//               value={input.image}
//               name="image"
//               placeholder="Insert an image URL..."
//               onChange={(e) => InputChangeHandler(e)}
//             />
//             {errors.image && <p className={styles.ps}> {errors.image} </p>}
//           </div>
//           <hr />
//           <div>
//             <label>Description *</label>
//             <input
//               type="text"
//               value={input.summary}
//               name="summary"
//               onChange={(e) => InputChangeHandler(e)}
//               placeholder="✏️ Briefly descrive your recipe..."
//             />
//             {errors.summary && <p className={styles.ps}> {errors.summary} </p>}
//           </div>
//           <hr />
//           <div>
//             <label>Health Score</label>
//             <input
//               type="number"
//               value={input.healthScore}
//               name="healthScore"
//               min="10"
//               max="100"
//               onChange={(e) => numberInputHandler(e)}
//             />
//             🫀
//             {errors.healthScore && (
//               <p className={styles.ps}> {errors.healthScore} </p>
//             )}
//             <label>Cooking Time</label>
//             <input
//               type="number"
//               value={input.cookingTime}
//               name="cookingTime"
//               min="10"
//               max="720"
//               onChange={(e) => numberInputHandler(e)}
//             />
//             ⏰
//           </div>
//           <hr />
//           <div>
//             <label>Steps</label>
//             <input
//               type="text"
//               value={input.steps}
//               placeholder="✏️ Add the cooking instructions..."
//               onChange={(e) => InputChangeHandler(e)}
//             />
//           </div>
//           <hr />
//           <div>
//             <label>Diets *</label>
//             <select
//               className={styles.selector}
//               onChange={(e) => selectDietsHandler(e)}
//             >
//               <option disabled selected>
//                 select the diet types
//               </option>
//               {diets?.map((el) => {
//                 return (
//                   <option value={el.name} name={el.name}>
//                     {el.name}
//                   </option>
//                 );
//               })}
//             </select>
//             {errors.diets && <p className={styles.p}>{errors.diets}</p>}
//           </div>
//           {!input.diets.length ? (
//             ""
//           ) : (
//             <div>
//               {input.diets.map((el) => (
//                 <button
//                   value={el}
//                   name={el}
//                   className={styles.btnErr}
//                   onClick={(e) => deleteDietHandler(e)}
//                 >
//                   X {el}
//                 </button>
//               ))}
//             </div>
//           )}
//           <hr />
//           {input.name !== "" &&
//           !errors.name &&
//           !errors.diets &&
//           !errors.image &&
//           input.summary !== "" ? (
//             <button type="submit" className={styles.btn}>
//               Create
//             </button>
//           ) : (
//             <div>
//               <button type="submit" className={styles.btnErr} disabled>
//                 Create
//               </button>
//               <p className={styles.ps}> One or more fields are incomplete</p>
//             </div>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default CreateRecipe;
