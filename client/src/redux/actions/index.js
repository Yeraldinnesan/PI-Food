import axios from "axios";
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_ALL_DIETS = "GET_ALL_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_CREATED = "FILTER_CREATED";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SORT_ALPHABETICALLY = "SORT_ALPHABETICALLY";

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
//---------------------> ACTIONS THAT CONNECT FRONT AND BACK <-------------------

const recipesBaseUrl = "http://localhost:3001/recipes";
const dietsBaseUrl = "http://localhost:3001/diets";

export const getAllRecipes = () => {
  return async function (dispatch) {
    try {
      let res = await axios.get(recipesBaseUrl);
      return dispatch({
        type: GET_ALL_RECIPES,
        payload: res.data,
      });
    } catch (error) {
      return error;
    }
  };
};

export const getAllDiets = () => {
  return async function (dispatch) {
    try {
      let res = await axios.get(dietsBaseUrl);

      return dispatch({
        type: GET_ALL_DIETS,
        payload: res.data,
      });
    } catch (error) {
      return error;
    }
  };
};

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
