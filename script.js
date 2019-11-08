var form = $("#form-column");
var input = $("#ingredients-input");
var chipsColumn = $("#chips-column");
var ingredientsArray = [];


form.on("submit", function (e) {
    e.preventDefault();

    var ingredients = $("#ingredients");
    var ingredientDivArr = ingredients[0].M_Chips["$chips"];
    var searchIngredients = [];
    for (var i = 0; i < ingredientDivArr.length; i++) {
        var thisIngredient = ingredientDivArr[i];
        searchIngredients.push($(thisIngredient).text().replace("close", ""))
    }
    getSpoonacularData(searchIngredients.join("&"), 10, function (response) {
        console.log(response)

        var recipeDiv = $("<div>");

        response.forEach(function (recipe) {
            var pOne = $("<p>").text("recipe: " + recipe.title).attr("data-id", recipe.id)
            var pTwo = $("<p>").text("recipeId: " + recipe.id);
            var base = "https://spoonacular.com/recipes/";
            var title = encodeURI(recipe.title.replace("%20","-"))

        console.log(title)

        var url = `${base}${title}-${recipe.id}`;
        console.log(url);

        //click function 
       var link = $("<a>").attr("href", url)
    
        

            var img = $("<img>").attr({
                src: recipe.image,
               alt: "food"
                
            })

           link.append(img)
            recipeDiv.append(pOne, pTwo, link);
        });

        $("#recipe-view").append(recipeDiv);
    })
})


function renderIngredients() {
    var ul = $("<ul>");
    ingredientsArray.forEach(function (ingredient) {
        ul.append($("<li>").text(ingredient));
    });
    $("#result").append(ul);
}
$("#ingredients").chips();



function getSpoonacularData(searchItem, number, callBack) {

    $.ajax({
        // method: "GET",
        // url: `https://api.spoonacular.com/recipes/search?query=${searchItem}&number=${number}&apiKey=bd181a4abdb64fba83f1add04302f39c`,
        // {
        "async": true,
        "crossDomain": true,
        "url": `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=${number}&ranking=1&ignorePantry=false&ingredients=${searchItem}`,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
            "x-rapidapi-key": "1ef656e72fmshe5f4267e958ab0fp1174eejsndba562eb441a"
        }
        // }
    }).then(function (response) {

        callBack(response)

        

       
   
    });








        
};


