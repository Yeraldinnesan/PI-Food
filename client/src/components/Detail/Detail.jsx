import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDiets,
  getRecipeDetail,
  getAllRecipes,
  setCurrentPage,
} from "../../redux/actions";
import { useEffect } from "react";
import Loading from "../Loading/Loading";

const Detail = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
  console.log("id", id);
  const recipeDetail = useSelector((state) => state.detail);

  const homeHandler = () => {
    // dispatch(actions.ClearId());
    dispatch(getAllRecipes());
    dispatch(setCurrentPage(1));
  };

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
  const htmlWithoutLinks = removeLinks(recipeDetail.summary);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    dispatch(getAllDiets());
  }, []);

  return (
    <div>
      <div>
        <button onClick={homeHandler()}>
          <Link to="/home">🏠</Link>
        </button>

        <button>🗑</button>
      </div>

      <div>
        <h1>{recipeDetail.name}</h1>
        <h2>{recipeDetail.healthScore}</h2>
        <img src={recipeDetail.image}></img>
        <h4>Cooking Time: {recipeDetail.cookingTime}</h4>
        <div>
          <h4>Diets</h4>
          {recipeDetail.diets?.map((ele, index) => (
            <h3 key={index}>{ele}</h3>
          ))}
        </div>
      </div>

      <div>
        {recipeDetail.steps ? <h4>Steps</h4> : <br />}

        <div>
          {recipeDetail.steps ? (
            <p>{recipeDetail.steps}</p>
          ) : (
            <>
              <br />
              <br />
            </>
          )}
        </div>
      </div>
      <h4>Summary:</h4>
      <div dangerouslySetInnerHTML={{ __html: htmlWithoutLinks }}></div>
    </div>
  );
};

export default Detail;
