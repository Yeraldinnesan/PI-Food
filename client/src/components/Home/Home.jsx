import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, setCurrentPage } from "../../redux/actions";
import { Link } from "react-router-dom";
import FiltersPanel from "../Filters Panel/FiltersPanel";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
import Empty from "../Empty/Empty";
import "../Home/home.css";

//---------------------------PRUEBAS

//------------------------

const Home = () => {
  const dispatch = useDispatch();

  //same as mapStateToProps
  //all that it's in the recipes state contained in a constant
  //-------------------------->GLOBAL STATES

  const allRecipes = useSelector((state) => state.recipes);
  const currentPage = useSelector((state) => state.currentPage);

  //-----------------------> LOCAL STATE
  const [isLoading, setIsLoading] = useState(true);

  function refreshPage() {
    window.location.reload();
  }
  //instead of componentDidMount
  //brings all the recipes in the state when the component gets rendered
  useEffect(() => {
    dispatch(getAllRecipes());
    setIsLoading(false);
  }, []); //second parameter the dependency as long as [...] is there (USE DISPATCH TO AVOID THE WARNIG)

  const onClickHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(getAllRecipes()).then(() => {
      setIsLoading(false);
    });
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

  return (
    <div className="home">
      {/* SEARCH BAR */}
      <SearchBar currentRecipes={currentRecipes} />

      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          {/* SIDE PANELS */}
          <FiltersPanel />
          <Link to="/create">
            <button>Create Recipe</button>
          </Link>
          <button onClick={(e) => onClickHandler(e)}>Reset</button>
        </div>

        <div className="home_cardlist-wrap">
          {/* CARDS, PAGINATION, EMPTY VIEW */}
          <div className="pagination-wrap">
            <Pagination recipesPerPage={recipesPerPage} />
          </div>

          {isLoading ? (
            <div>
              <Loading />
            </div>
          ) : currentRecipes.length ? (
            <div className="cardlist-section">
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
          ) : (
            <div>
              <Empty />
            </div>
          )}

          {/* {allRecipes.length ? (
            <div className="cardlist-section">
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
          ) : (
            <div>
              <Loading />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
