import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../../redux/actions";

import FiltersPanel from "../Filters Panel/FiltersPanel";
// import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
// import Empty from "../Empty/Empty";
import Cards from "../Card/Cards";
import "../Home/home.css";
import Empty from "../Empty/Empty";
import Footer from "../Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();

  //same as mapStateToProps
  //all that it's in the recipes state contained in a constant
  //-------------------------->GLOBAL STATES

  const allRecipes = useSelector((state) => state.recipes);
  const favorites = useSelector((state) => state.favorites);
  const currentPage = useSelector((state) => state.currentPage);
  const [loading, setLoading] = useState(false);

  //---------------------------> PAGINATION <-------------------------------

  // const [currentPage, setCurrentPage] = useState(1); BETTER AS A GLOBAL STATE
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage; // 8
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; //0

  const currentRecipes = allRecipes?.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  //  function refreshPage() {
  //   window.location.reload();
  // }
  //instead of componentDidMount
  //brings all the recipes in the state when the component gets rendered
  useEffect(() => {
    setLoading(true);
    dispatch(getAllRecipes()).then(() => {
      setLoading(false);
    });
  }, []); //second parameter the dependency as long as [...] is there (USE DISPATCH TO AVOID THE WARNIG)

  // if (allRecipes?.length === 0) {
  //   return <h1>Loading....</h1>;
  // }

  return (
    <div className="home">
      {/* SEARCH BAR */}
      <SearchBar currentRecipes={currentRecipes} />

      <div className="pagination-wrap">
        <Pagination recipesPerPage={recipesPerPage} />
      </div>
      <div className="home_panelList-wrap">
        <div className="home_panel-wrap">
          {/* SIDE PANELS */}
          <FiltersPanel />
        </div>

        <div className="home_cardlist-wrap">
          {/* CARDS, PAGINATION, EMPTY VIEW */}
          {loading ? (
            <Loading />
          ) : currentRecipes.length === 0 ? (
            <Empty />
          ) : (
            <>
              <Cards currentRecipes={currentRecipes} />
            </>
          )}
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="home">
  //     {/* SEARCH BAR */}
  //     <SearchBar currentRecipes={currentRecipes} />

  //     <div className="home_panelList-wrap">
  //       <div className="home_panel-wrap">
  //         {/* SIDE PANELS */}
  //         <FiltersPanel />
  //       </div>

  //       <div className="home_cardlist-wrap">
  //         {/* CARDS, PAGINATION, EMPTY VIEW */}
  //         {allRecipes?.length === 0 ? (
  //           <Loading />
  //         ) : (
  //           <div className="pagination-wrap">
  //             <Pagination recipesPerPage={recipesPerPage} />
  //           </div>
  //         )}
  //         {/* <div>
  //             <Loading />
  //           </div> */}

  //         <Cards currentRecipes={currentRecipes} />
  //         {/* <div>
  //             <Empty />
  //           </div> */}
  //         {/* {allRecipes.length ? (
  //           <div className="cardlist-section">
  //             {currentRecipes?.map((el) => {
  //               return (
  //                 <Card
  //                   key={el.id}
  //                   name={el.name}
  //                   diets={el.diets}
  //                   image={el.image}
  //                   healthScore={el.healthScore}
  //                 />
  //               );
  //             })}
  //           </div>
  //         ) : (
  //           <div>
  //             <Loading />
  //           </div>
  //         )} */}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Home;
