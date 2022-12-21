import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, setCurrentPage } from "../../redux/actions";
import { Link } from "react-router-dom";
import FiltersBar from "../Filters Bar/FiltersBar";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";

//---------------------------PRUEBAS

//------------------------

const Home = () => {
  const dispatch = useDispatch();

  //same as mapStateToProps
  //all that it's in the recipes state contained in a constant
  const allRecipes = useSelector((state) => state.recipes);
  const currentPage = useSelector((state) => state.currentPage);

  //instead of componentDidMount
  //brings all the recipes in the state when the component gets rendered
  useEffect(() => {
    dispatch(getAllRecipes());
  }, []); //second parameter the dependency as long as [...] is there

  const onClickHandler = (e) => {
    e.preventDefault();
    dispatch(getAllRecipes());
  };

  //---------------------------> PAGINATION <-------------------------------

  // const [currentPage, setCurrentPage] = useState(1); BETTER AS A GLOBAL STATE
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage; // 8
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // console.log(allRecipes);
  return (
    <div>
      <Link to="/create">
        <button>Create Recipe</button>
      </Link>

      <button onClick={(e) => onClickHandler(e)}>All Recipes</button>
      <SearchBar currentRecipes={currentRecipes} />
      <FiltersBar />

      <Pagination
        // allRecipes={allRecipes.length}
        recipesPerPage={recipesPerPage}
        // onPageChange={onPageChange}
        // currentPage={currentPage}
        // setCurrentPage={setCurrentPage}
      />

      {currentRecipes?.map((el) => {
        return (
          <Card
            key={el.id}
            name={el.name}
            diets={el.diets}
            image={el.image}
            healthScore={el.healthScore}
          />
        );
      })}
    </div>
  );
};

export default Home;
