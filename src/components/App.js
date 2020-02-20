import React, { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeEdit from "./RecipeEdit";
import "../css/app.css";
import uuidv4 from "uuid/v4";

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

function App() {
  //Call
  const [recipes, setRecipes] = useState(sampleRecipes);
  

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    console.log("Rendered");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes]);



  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete
  };

  //Run
  function handleRecipeAdd() {
    const newRecipe = {
      // id: Date.now().toString()
      id: uuidv4(),
      name: "New",
      servings: 1,
      cookTime: "1:00",
      instructions: "Instr",
      ingredients: [{ id: uuidv4(), name: "Name", amount: "1Tbs" }]
    };
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeDelete(id) {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  }

  //Display
  return (
    <RecipeContext.Provider value={recipeContextValue}>
      {/* <div className="App"> */}
      <RecipeList
        recipes={recipes}
        // handleRecipeAdd={handleRecipeAdd}
        // handleRecipeDelete={handleRecipeDelete}
      />
      <RecipeEdit />
      {/* </div> */}
    </RecipeContext.Provider>
  );
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    serving: 3,
    cookTime: "1:45",
    instructions:
      "1. Put salt on chicken\n 2. Put chicken in oven\n 3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "2 Pounds"
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: 2,
    name: "Plain Pork",
    serving: 5,
    cookTime: "0:45",
    instructions: "1. Put salt on pork\n 2. Put pork in oven\n 3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: "Pork",
        amount: "3 Pounds"
      },
      {
        id: 2,
        name: "Paprika",
        amount: "2 Tbs"
      }
    ]
  }
];

export default App;
