import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_CREATED = "FILTER_CREATED";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY";
export const SORT_BY_HEALTHSCORE = "SORT_BY_HEALTHSCORE";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const CLEAR_RECIPES = "CLEAR_RECIPES";
export const POST_RECIPE = "POST_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const RECIPE_DETAIL = "RECIPE_DETAIL";
export const CLEAR_RECIPE_DETAIL = "RECIPE_DETAIL";
export const ADD_TO_FAVS = "ADD_TO_FAVS";
export const REMOVE_FROM_FAVS = "REMOVE_FROM_FAVS";
export const SET_LOADING = "SET_LOADING";

export const filterByDiet = (payload) => {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};
export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload,
  };
};

export const sortAlphabetically = (payload) => {
  return {
    type: SORT_ALPHABETICALLY,
    payload,
  };
};

export const sortByHealthScore = (payload) => {
  return {
    type: SORT_BY_HEALTHSCORE,
    payload,
  };
};

export const clearRecipes = () => {
  return {
    type: CLEAR_RECIPES,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
//-----------------------> FAVORITES FEATURE

export const addToFavs = (payload) => {
  return {
    type: ADD_TO_FAVS,
    payload,
  };
};

export const removeFromFavs = (payload) => {
  return {
    type: REMOVE_FROM_FAVS,
    payload,
  };
};

//------------------------------------------------
export const clearRecipeDetail = () => {
  return {
    type: CLEAR_RECIPE_DETAIL,
  };
};
//---------------------> ACTIONS THAT CONNECT FRONT AND BACK <-------------------

const recipesBaseUrl = "http://localhost:3001/recipes";
const dietsBaseUrl = "http://localhost:3001/diets";

export const getAllRecipes = () => {
  return async function (dispatch) {
    try {
      let res = await axios(recipesBaseUrl);
      return dispatch({
        type: GET_ALL_RECIPES,
        payload: res.data,
      });
    } catch (error) {
      window.alert("No recipes Found");
    }
  };
};

export const getAllDiets = () => {
  return async function (dispatch) {
    try {
      let res = await axios(dietsBaseUrl);

      return dispatch({
        type: GET_ALL_DIETS,
        payload: res.data,
      });
    } catch (error) {
      window.alert("No diets found");
    }
  };
};

export const getRecipebyName = (name) => {
  return async (dispatch) => {
    try {
      var res = await axios(`${recipesBaseUrl}?name=${name}`);
      return dispatch({
        type: "GET_RECIPES_BY_NAME",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const postRecipe = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(recipesBaseUrl, payload);
      console.log(res);
      return res;
    } catch (err) {
      window.alert("Recipe couldn't be created");
    }
  };
};
export const getRecipeDetail = (id) => {
  return async (dispatch) => {
    try {
      let res = await axios(`${recipesBaseUrl}/${id}`);
      return dispatch({
        type: RECIPE_DETAIL,
        payload: res.data,
      });
    } catch (err) {
      window.alert(`Oooops! Something went wrong`);
    }
  };
};

export const deleteRecipe = (id) => {
  return async function (dispatch) {
    const selectRecipe = await axios.delete(`${recipesBaseUrl}/${id}`);
    return dispatch({
      type: DELETE_RECIPE,
      payload: selectRecipe,
    });
  };
};

export const update = (id, payload) => {
  return async function () {
    const UPDATE = await axios.put(`${recipesBaseUrl}/${id}`, payload);
    return UPDATE;
  };
};

// export const getRecipeDetail = (id) => {
//   return async (dispatch) => {
//     try {
//       let res = axios(`recipesBaseUrl${id}`);
//       return dispatch({
//         type: "RECIPE_DETAIL",
//         payload: res.data,
//       });
//     } catch (err) {
//       window.alert(`Oooops! Something went wrong`);
//     }
//   };
// };

// export const getRecipesName = (name) => {
//   return (dispatch) => {
//     dispatch(loading(true));
//     axios(`${recipesBaseUrl}?name=${name}`)
//       .then((res) => {
//         dispatch(saveRecipes(res.data));
//         dispatch(loading(false));
//       })
//       .catch((err) => console.log("Error on the recipe by name request", err));
//   };
// };
