import React, { useState, useEffect } from 'react'
import axios from 'axios'

const APP_KEY = process.env.REACT_APP_RECIPE_API_KEY

const App = () => {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [featuredRecipes, setFeaturedRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const API_URL = 'https://api.edamam.com/api/recipes/v2'
  const APP_ID = '782d2889'

  // Öne çıkan tarifleri getir
  useEffect(() => {
    fetchFeaturedRecipes()
  }, [])

  const fetchFeaturedRecipes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${API_URL}?type=public&q=pasta&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      setFeaturedRecipes(response.data.hits)
      setLoading(false)
    } catch (err) {
      setError('Tarifler yüklenirken bir hata oluştu!')
      setLoading(false)
      console.log(err)
    }
  }

  const fetchRecipes = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${API_URL}?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      setRecipes(response.data.hits)
      setLoading(false)
    } catch (err) {
      setError('Arama sırasında bir hata oluştu!')
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      fetchRecipes()
    }
  }

  return (
    <div className="bg-pink-100 min-h-screen p-5">
      <h1 className="text-center text-3xl font-bold mb-5">
        Project-9 Recipe App
      </h1>

      {/* Arama çubuğu */}
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center mb-5"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Recipe Title Here..."
          className="w-1/2 p-2 border rounded-l-md"
        />
        <button
          type="submit"
          className="p-2 bg-pink-500 text-white rounded-r-md hover:bg-pink-600"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Tarifler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(recipes.length > 0 ? recipes : featuredRecipes).map(
          (recipe, index) => (
            <RecipeCard key={index} recipe={recipe.recipe} />
          )
        )}
      </div>
    </div>
  )
}

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-5">
      <h2 className="text-xl font-bold mb-3">{recipe.label}</h2>
      <img
        src={recipe.image}
        alt={recipe.label}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <p className="text-gray-700 mb-3">{Math.round(recipe.calories)} kcal</p>
      <ul className="list-disc ml-5 mb-3">
        {recipe.ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <a
        href={recipe.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-pink-500 hover:underline"
      >
        Learn More About...
      </a>
    </div>
  )
}

export default App
