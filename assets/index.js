const searchBtn = document.getElementById('search-btn');
const foodItem = document.getElementById('food');
const foodDetailscontent = document.querySelector('.food-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Get list match with input value
const getFood = async () => {
    let inputVal = document.getElementById('search-input').value.trim();
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputVal}`;
    let response = await fetch(url);
    let data = await response.json();
     let text ='';
     if(data.meals &&  inputVal !== ''){
         data.meals.forEach(food =>{
            text += ` 
        <div class = "food-item" data-id = ${food.idMeal}>
            <div class = "food-img">
              <img src = ${food.strMealThumb
                } alt = "food">
            </div>
            <div class = "food-name">
              <h3>${food.strMeal}</h3>
              <a href = "#" class = "recipe-btn">Get Recipe</a>
            </div>
          </div> `
         })
         foodItem.classList.remove('notget');
        }
            
      else{
        text = "Sorry, we didn't find any meal!";
       foodItem.classList.add('notget');
    }
    foodItem.innerHTML = text;
   
}

// Event listener
searchBtn.addEventListener('click', getFood);
foodItem.addEventListener('click', getRecipe);

function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data =>
             mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-food-img">
            <img src = "${meal.strMealThumb}" alt = "loading">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `
    foodDetailscontent.innerHTML= html;
    foodDetailscontent.parentElement.classList.add('showRecipe');
}
recipeCloseBtn.addEventListener('click' , ()=>{
     foodDetailscontent.parentElement.classList.remove('showRecipe');
})