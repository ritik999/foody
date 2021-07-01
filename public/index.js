let searchBtn = document.querySelector(".search-recipe");
let searchDish = document.querySelector(".enter-recipe");
let rowContent = document.querySelector(".row");
let popDiv = document.querySelector(".popup-div");


let dishSearched = "";
let storeMealid="";


searchBtn.addEventListener("click", searchFunction);


function searchFunction() {
    dishSearched = searchDish.value;
    console.log(dishSearched);
    fetchApi().then((data) => {
        let html = "";

        if (data.meals) {
            data.meals.forEach(element => {
                html += `
                <div class="colm">
                   <div class="inner-colm">
                       <div class="content">
                           <div class="image">
                               <img src="${element.strMealThumb}" alt="">
                           </div>
                           <div class="text">
                               <h2>${element.strMeal}</h2>
                               <a href="#" class="recipe-btn ${element.idMeal}">Get Recipe</a>
                           </div>
                       </div>
                   </div>
               </div>
                `
                rowContent.classList.remove("error-text");

            });
        }
        else {
            html = `<h1>Sorry, we didn't find any meal.</h1>`
            rowContent.classList.add("error-text");
        }
        rowContent.innerHTML = html;
        // console.log(document.querySelector(".recipe-btn").classList[1]);

        console.log("fetched data");

        console.log(document.querySelector(".recipe-btn").classList[1]);

      
        async function recipeApi() {
            const api = await fetch(`https:/www.themealdb.com/api/json/v1/1/lookup.php?i=${storeMealid}`);
            const convertjson = api.json();
            return convertjson;
        }

        let recipeBtnArray=document.querySelectorAll(".recipe-btn");

        recipeBtnArray.forEach((element)=>{
        element.addEventListener("click", function (event) {
            document.querySelector(".popup-div").style.display = "block";
            event.preventDefault();
            storeMealid=event.target.classList[1];
            console.log(storeMealid);
            recipeApi().then((recipeData) => {
                let html2 = "";
                // console.log(recipeData.meals[0].idMeal);
                if (recipeData.meals[0].idMeal == event.target.classList[1]) {
                    html2 += `
                    <i class="far fa-times-circle fa-3x cancle-icon"></i>
                    <h2>${recipeData.meals[0].strMeal}</h2>
                    <h3>${recipeData.meals[0].strCategory}</h3>
                    <h3>Insturctions:</h3>
                    <p>${recipeData.meals[0].strInstructions}</p>
                    <div class="vedio-thumbnail">
                    <img src="${recipeData.meals[0].strMealThumb}" alt="">
                    </div>
                    <a href="${recipeData.meals[0].strYoutube}" target="_blank">Watch Video</a>
                    `
                }
                else {
                    html2 = `
                    <i class="far fa-times-circle fa-3x cancle-icon"></i>
                    <h1>The data is not Available.<h1>`
                }
                
                popDiv.innerHTML= html2;
                document.querySelector(".cancle-icon").addEventListener("click",function() {
                    popDiv.innerHTML="";
                    popDiv.style.display="none";
                })
            })
        });
   })

    })
}

async function fetchApi() {
    try {
        let api = await fetch(`https:/www.themealdb.com/api/json/v1/1/filter.php?i=${dishSearched}`);
        let jsonConvert = await api.json();
        return jsonConvert;
    } catch (error) {
        console.log(error);
    }

}



console.log("game is good");

// console.log(storeMealid);

