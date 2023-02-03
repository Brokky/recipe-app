import './App.css';
import React, { useState, useEffect } from 'react';
import { RiSearch2Line } from 'react-icons/ri';

function App() {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const appId = process.env.REACT_APP_APP_ID;
    const appKey = process.env.REACT_APP_APP_KEY;
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };



  return (
    <div className="App">
      <header>Food Recipes</header>
      <form onSubmit={getSearch} className="search-form">
        <input
          type="text"
          className="search-bar"
          placeholder='e.g., Chicken'
          value={search}
          onChange={updateSearch}
        />
        <button type="submit" className="search-button"><RiSearch2Line size={20}/></button>
      </form>
      <div className='recipes-list'>
        {recipes.map(recipe => (
          <div className='recipes-item' key={recipe.recipe.label}>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <div className='recipes-text'>
              <h1>{recipe.recipe.label}</h1>
              <p>{recipe.recipe.ingredients.map(ingredient => ingredient.text).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
