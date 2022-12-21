import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getAllDiets } from "../../redux/actions/index";

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);

  //----------------------------> INPUT STATE <------------------------------
  const [input, setInput] = useState({
    name: "",
    summary: "",
    diets: [],
    cookingTime: 20,
    healthScore: 10,
    steps: "",
    image: "",
  });
  //---------------------------------------------
  useEffect(() => {
    dispatch(getAllDiets());
  }, []);

  //-------------------------> HANDLERS <--------------------------

  const InputChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  };

  //------------------>CHECK BOX EXAMPLE----------------------
  /* <label><input
  type='radio'
  name={el}
  value={el}
  onChange={(e)=>{radioHandler(e)}}
   

  const radioHandler = (e)=>{
    e.target.checked ? setInput({...state, status: e.target.value}):null
  }
*/

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>

      <h1>Create your own recipe!</h1>
      <form>
        <div>
          <label>Recipe name</label>
          <input
            type="text"
            placeholder="Name your recipe..."
            value={input.name}
            name="name"
            onChange={(e) => InputChangeHandler(e)}
          />
        </div>
        <div>
          <div>
            <label>Image</label>
            <input
              type="url"
              value={input.image}
              name="image"
              placeholder="Insert an image URL..."
              onChange={(e) => InputChangeHandler(e)}
            />
          </div>
          <label>Description</label>
          <input
            type="text"
            value={input.summary}
            name="summary"
            onChange={(e) => InputChangeHandler(e)}
            placeholder="Briefly descrive your recipe..."
          />
        </div>
        <div>
          <label>Health Score</label>
          <input
            type="number"
            value={input.healthScore}
            name="healthScore"
            min="10"
            max="100"
            onChange={(e) => InputChangeHandler(e)}
          />
        </div>
        <div>
          <label>Steps</label>
          <input
            type="text"
            value={input.steps}
            placeholder="Add some cooking instructions..."
            onChange={(e) => InputChangeHandler(e)}
          />
        </div>
        <div>
          <label>Cooking Time</label>
          <input
            type="number"
            value={input.cookingTime}
            name="cookingTime"
            min="10"
            max="100"
            onChange={(e) => InputChangeHandler(e)}
          />
        </div>
        <div>
          <label>Diet Type</label>
          <select>
            <option disabled selected>
              Select a diet type
            </option>
            {diets?.map((el) => {
              return (
                <option value={el.name} name={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
          {!input.diets.length ? (
            ""
          ) : (
            <div>
              <label>Remove Diet</label>
              {input.diets.map((el) => {
                <button value={el} name={el}>
                  X {el}
                </button>;
              })}
            </div>
          )}
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
