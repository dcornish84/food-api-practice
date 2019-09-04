// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.table(parsedFoods)
//     })



const foodContainer = document.querySelector(".foodList")

function createFoodHTML(foodObj){
let FoodHTML = `
<section>
<h3>Name: ${foodObj.name}</h3>
<p>Category: ${foodObj.category}</p>
<p>Ethnicity: ${foodObj.ethnicity}</p>
<p>Ingredients: ${foodObj.ingredients}</p>
<p>Country of Origin: ${foodObj.country}</p>
<p>Calories: ${foodObj.calories}</P>
<p>Fat per serving: ${foodObj.fat}</p>
<p>Sugar per serving: ${foodObj.sugar}</p>
<p>Barcode: ${foodObj.barcode}</p>

</section>
`
return FoodHTML
}

function addFoodToDom(htmlString){
    foodContainer.innerHTML += htmlString;

}


// fetch("http://localhost:8088/food")
//     .then(foods => foods.json())
//     .then(parsedFoods => {
//         console.log("parseFoods", parsedFoods);
//         parsedFoods.forEach(item => {
//             const foodAsHTML = createFoodHTML(item)
//             addFoodToDom(foodAsHTML)
//         })
//     })


fetch("http://localhost:8088/food")
.then(response => response.json())
.then(myParsedFoods => {
    myParsedFoods.forEach(food => {
        console.log(food)   

        fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }

                    const foodAsHTML = createFoodHTML(food)
                    addFoodToDom(foodAsHTML)

                })
            })
        })
   