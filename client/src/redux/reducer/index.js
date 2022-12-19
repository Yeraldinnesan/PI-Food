import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  FILTER_BY_DIET,
  SET_CURRENT_PAGE,
  FILTER_CREATED,
  SORT_ALPHABETICALLY,
} from "../actions/index";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  currentPage: 1,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    //-------------------> FILTERS <----------------------------------------

    case FILTER_BY_DIET:
      const allRecipes = state.allRecipes;
      let filteredRecipes =
        action.payload === "all"
          ? allRecipes
          : state.allRecipes.filter((el) => {
              if (action.payload === "vegan" && el.vegan) return true;
              if (action.payload === "vegetarian" && el.vegetarian) return true;
              if (action.payload === "gluten free" && el.glutenFree)
                return true;
              if (action.payload === "dairy free" && el.dairyFree) return true;
              return el.diets.includes(action.payload);
            });
      if (!filteredRecipes.length) {
        alert("No recipes found");
        filteredRecipes = allRecipes;
      }
      return {
        ...state,
        recipes: filteredRecipes,
      };

    case FILTER_CREATED:
      const filtRecipes = state.allRecipes;
      let createdFiltered =
        action.payload === "api"
          ? filtRecipes
          : action.payload === "database"
          ? state.recipes.filter((el) => el.id.length > 20)
          : state.recipes.filter((el) => el.id.toString().length < 20);
      if (!createdFiltered.length) {
        alert("No recipes created yet");
        createdFiltered = filtRecipes;
      }
      return {
        ...state,
        recipes: createdFiltered,
      };
    //------------------------> SORTERS <-------------------------------------------

    case SORT_ALPHABETICALLY:
      const toSortArr =
        action.payload === "a-z"
          ? state.recipes.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });

      return {
        ...state,
        recipes: toSortArr,
      };

    //---------------------------------------------------------------------------

    default:
      return { ...state };
  }
};
