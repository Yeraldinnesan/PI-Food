import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  FILTER_BY_DIET,
  SET_CURRENT_PAGE,
  FILTER_CREATED,
  SORT_ALPHABETICALLY,
  SORT_BY_HEALTHSCORE,
  GET_RECIPES_BY_NAME,
  CLEAR_RECIPES,
  RECIPE_DETAIL,
  CLEAR_RECIPE_DETAIL,
  ADD_TO_FAVS,
  REMOVE_FROM_FAVS,
  DELETE_RECIPE,
} from "../actions/index";

const initialState = {
  recipes: [], // rendering
  allRecipes: [], // backup one
  diets: [],
  recipeDetail: [],
  currentPage: 1,
  favorites: [],
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

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case RECIPE_DETAIL:
      return {
        recipeDetail: action.payload,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };

    case CLEAR_RECIPES:
      return {
        ...state,
        recipes: [],
      };

    case CLEAR_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: [],
      };

    case DELETE_RECIPE:
      return {
        ...state,
        allRecipes: state.allRecipes.filter((r) => r !== action.payload),
      };

    //----------------------> FAVORITES FEATURE

    // case ADD_TO_FAVS:
    //   if (!state.favorites?.find((fav) => fav.id === action.payload.id)) {
    //     const updatedFavorites = [...state.favorites, action.payload];
    //     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    //     return {
    //       ...state,
    //       favorites: updatedFavorites,
    //     };
    //   } else {
    //     return state;
    //   }

    // case REMOVE_FROM_FAVS:
    //   const updatedFavorites = state.favorites?.filter(
    //     (el) => el.id !== action.payload.id
    //   );
    //   localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    //   return {
    //     ...state,
    //     favorites: updatedFavorites,
    //   };

    case ADD_TO_FAVS:
      const favorites = state.favorites || [];
      if (!favorites.find((fav) => fav.id === action.payload.id)) {
        return {
          ...state,
          favorites: [...favorites, action.payload],
        };
      } else {
        return state;
      }

    case REMOVE_FROM_FAVS:
      return {
        ...state,
        favorites: state.favorites?.filter((el) => el.id !== action.payload.id),
      };

    //--------------------------> FILTERS <----------------------------------------
    case FILTER_BY_DIET:
      const filteredRecipes = state.recipes.filter((el) =>
        el.diets.includes(action.payload) ? el : null
      );

      return {
        ...state,
        recipes: filteredRecipes,
      };
    // case FILTER_BY_DIET:
    //   const allRecipes = state.allRecipes;
    //   let filteredRecipes =
    //     action.payload === "all"
    //       ? allRecipes
    //       : state.allRecipes.filter((el) => {
    //           if (action.payload === "vegan" && el.vegan) return true;
    //           if (action.payload === "vegetarian" && el.vegetarian) return true;
    //           if (action.payload === "gluten free" && el.glutenFree)
    //             return true;
    //           if (action.payload === "dairy free" && el.dairyFree) return true;
    //           return el.diets?.includes(action.payload);
    //         });
    //   if (!filteredRecipes.length) {
    //     alert("No recipes found");
    //     filteredRecipes = allRecipes;
    //   }
    //   return {
    //     ...state,
    //     recipes: filteredRecipes,
    //   };

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
      const alphSorted =
        action.payload === "a-z"
          ? state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });

      return {
        ...state,
        recipes: alphSorted,
        currentPage: 2,
      };

    case SORT_BY_HEALTHSCORE:
      const newOne = [...state.recipes];
      const yessssssss =
        action.payload === "max-min"
          ? newOne.sort((a, b) => {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            })
          : newOne.sort((a, b) => {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            });

      return {
        ...state,
        recipes: yessssssss,
        currentPage: 2,
      };

    //----------------------------------------------------------------------------------
    // case SORT_BY_HEALTHSCORE:

    //   let scoreSorted =
    //     action.payload === "none"
    //       ? state.recipes
    //       : action.payload === "min-max"
    //       ? state.recipes.sort((a, b) => a.healthScor - b.healthScore)
    //       : state.recipes.sort((a, b) => b.healthScore - a.healthScore);
    //   return {
    //     ...state,
    //     recipes: scoreSorted,
    //     currentPage: 2,
    //   };
    //---------------------------------------------------------------------------

    default:
      return { ...state };
  }
};
