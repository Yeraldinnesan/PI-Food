import React, { useEffect } from "react";
// import { useState } from "react";
import "../Pagination/pagination.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/actions";

const Pagination = (props) => {
  const dispatch = useDispatch();

  const allRecipes = useSelector((state) => state.recipes);
  const currentPage = useSelector((state) => state.currentPage);
  const favorites = useSelector((state) => state.favorites);

  let pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(allRecipes?.length / props.recipesPerPage);
    i++
  )
    pageNumbers.push(i);

  //------------------------------> LOCAL STATES -------------------------------

  // const [pageNumberLimit, setpageNumberLimit] = useState(4);
  // const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);
  // const [minPageNumberLimit, setminPageNumberLimit] = useState(1);

  //   //-------------------------> Prev and Next Handlers <------------------------

  //   const NextBtnHandler = () => {
  //     dispatch(setCurrentPage(currPage + 1));

  //     if (currPage + 1 > maxPageNumberLimit)
  //       setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
  //     setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  //   };
  //   const PrevBtnHandler = () => {
  //     dispatch(setCurrentPage(currPage + 1));

  //     if ((currPage - 1) % pageNumberLimit === 0)
  //       //
  //       setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
  //     setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
  //   };
  //   //---------------------> Hellip button => ... <-----------------------------

  //   //   const pageIncrementBtn = null;
  //   //   if (pageNumbers.length > maxPageNumberLimit)
  //   //     pageIncrementBtn = <li onClick={NextBtnHandler}>&hellip;</li>;

  //   //   const pageDecrementBtn = null;
  //   //   if (pageNumbers.length > maxPageNumberLimit)
  //   //     pageDecrementBtn = <li onClick={PrevBtnHandler}>&hellip;</li>;

  //   //----------------------------------------------

  const onPageChange = (pageNo) => {
    dispatch(setCurrentPage(pageNo));
  };

  return (
    <div className="pagination">
      {pageNumbers?.map(
        (num, i) => (
          // num < maxPageNumberLimit + 1 && num > minPageNumberLimit - 1 ? (
          <button
            key={i}
            onClick={() => onPageChange(num)}
            className={num == currentPage ? "active" : ""}
          >
            {num}
          </button>
        )
        // ) : null
      )}
    </div>
  );
};

export default Pagination;
