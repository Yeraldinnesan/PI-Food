import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDiets,
  getRecipeDetail,
  getAllRecipes,
  setCurrentPage,
  clearRecipeDetail,
  deleteRecipe,
} from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

const Detail = () => {
  //crear un action que setee un get detail id and use it in the home handler
  // const [isFav, setIsFav] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const recDetail = useSelector((state) => state.recipeDetail);
  const favorites = useSelector((state) => state.favorites);

  const { id } = useParams();
  //   console.log("id", id);

  function removeLinks(html) {
    // Crea un elemento div temporal
    const temp = document.createElement("div");
    // Asigna la cadena de texto HTML al contenido del elemento div
    temp.innerHTML = html;
    // Obtiene todas las etiquetas a del elemento div
    const links = temp.getElementsByTagName("a");
    // Recorre todas las etiquetas a y elimina el atributo href
    for (let i = 0; i < links.length; i++) {
      links[i].removeAttribute("href");
    }
    // Devuelve el contenido del elemento div sin los enlaces
    return temp.innerHTML;
  }
  const htmlWithoutLinks = removeLinks(recDetail?.summary);

  const handleDelete = () => {
    dispatch(clearRecipeDetail());
    dispatch(deleteRecipe(id));
    dispatch(getAllDiets());
    dispatch(getAllRecipes());
    alert("Receta eliminada correctamente");
    dispatch(clearRecipeDetail());
    history.push("/home");
    dispatch(setCurrentPage(1));
  };
  useEffect(() => {
    dispatch(getRecipeDetail(id));
    dispatch(getAllDiets());
  }, [dispatch, id]);

  const homeHandler = () => {
    // dispatch(clearRecipeDetail()); // Clear the recipeDetail state before getting the new recipe detail
    dispatch(setCurrentPage(1));
    dispatch(getAllRecipes());
  };
  return (
    <div>
      <div>
        <Link to="/home">
          <button onClick={homeHandler()}>🏠 Home</button>
        </Link>
        {id.length > 6 ? (
          <>
            <Link to={"/update/" + id}>
              <button>🛠 Update</button>
            </Link>

            <button onClick={() => handleDelete()}>🗑 Delete</button>
          </>
        ) : null}
      </div>
      {recDetail && recDetail.name ? (
        <div>
          <h1>{recDetail.name}</h1>
          <h2>{recDetail.healthScore}</h2>
          <img src={recDetail.image}></img>
          <h4>Cooking Time: {recDetail.cookingTime}</h4>
          <div>
            <h4>Diets</h4>
            {recDetail.diets?.map((ele, index) => (
              <h3 key={index}>{ele}</h3>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {recDetail.steps ? (
        <div>
          <h4>Steps</h4>
          <div>
            <p>{recDetail.steps}</p>
          </div>
        </div>
      ) : null}
      {recDetail.summary ? (
        <div>
          <h4>Summary:</h4>
          <div dangerouslySetInnerHTML={{ __html: htmlWithoutLinks }}></div>
        </div>
      ) : null}
    </div>
  );

  //   return (
  //     <div>
  //       <div>
  //         <button onClick={homeHandler()}>
  //           <Link to="/home">🏠</Link>
  //         </button>

  //         <button>🗑</button>
  //       </div>

  //       <div>
  //         <h1>{recDetail.name}</h1>
  //         <h2>{recDetail.healthScore}</h2>
  //         <img src={recDetail.image}></img>
  //         <h4>Cooking Time: {recDetail.cookingTime}</h4>
  //         <div>
  //           <h4>Diets</h4>
  //           {recDetail.diets?.map((ele, index) => (
  //             <h3 key={index}>{ele}</h3>
  //           ))}
  //         </div>
  //       </div>
  //       <div>
  //         {recDetail.steps ? <h4>Steps</h4> : <br />}

  //         <div>
  //           {recDetail.steps ? (
  //             <p>{recDetail.steps}</p>
  //           ) : (
  //             <>
  //               <br />
  //               <br />
  //             </>
  //           )}
  //         </div>
  //       </div>
  //       <h4>Summary:</h4>
  //       <div dangerouslySetInnerHTML={{ __html: htmlWithoutLinks }}></div>
  //     </div>
  //   );
};

export default Detail;
