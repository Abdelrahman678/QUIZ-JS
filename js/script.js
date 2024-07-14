// --GLOBAL--

// clear function
function clear() {
     $("#inputs").remove();
     $("#mainMeals").empty();
     $("#mealsSearchData").empty();
     $("#categoriesData").empty();
     $("#searchContainer").empty();
     $("#areaData").empty();
     $("#ingredientsData").empty();
     $("#contactData").empty();
     $("#detailsData").empty();
     // close();
}

// hover Function
function hoverFunction() {
     $(".img").hover(function (e) {
          $(e.target).next().css({ transform: "translateY(0)" });

     }, function () {
          $(".img-info").css({ transform: "translateY(110%)" });
     })
}

// Melas Details functions
async function getMealDetails(mealID) {
     clear()
     let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
     responseData = await respone.json();
     console.log(responseData.meals);
     displayMealDetails(responseData.meals[0])

}
function displayMealDetails(mealDetails) {

     let recipy = ``
     for (let i = 1; i <= 20; i++) {
          if (mealDetails[`strIngredient${i}`]) {
               recipy += `<li class="alert alert-info m-2 p-1">${mealDetails[`strMeasure${i}`]} ${mealDetails[`strIngredient${i}`]}</li>`
          }
     }
     // let tags = mealDetails.strTags
     // console.log(tags);
     // let tags = mealDetails.strTags.split(",") "sushi"
     // console.log(tags);
     if (mealDetails.strTags) {
          tags = mealDetails.strTags.split(",")
     } else {
          tags = []
     }

     let allTags = ''
     for (let i = 0; i < tags.length; i++) {
          allTags += `
         <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
     }

     let cartona = `
     <div class="col-md-4">
                 <img class="rounded-2 w-100 mb-2" src="${mealDetails.strMealThumb}"
                     alt="${mealDetails.strMeal}">
                     <h2>${mealDetails.strMeal}</h2>
             </div>
             <div class="col-md-8">
                 <h2 class="fw-bold">Instructions</h2>
                 <p>${mealDetails.strInstructions}</p>
                 <h3><span class="fw-bolder">Area: </span>${mealDetails.strArea}</h3>
                 <h3><span class="fw-bolder">Category : </span>${mealDetails.strCategory}</h3>
                 <h3 class="d-block">Recipes: </h3>
                 <ul class="list-unstyled g-2 d-flex flex-wrap justify-content-start align-items-center">
                     ${recipy}
                 </ul>
                 <h3 class="d-block">Tags: </h3>
                 <ul class="list-unstyled g-2 d-flex flex-wrap justify-content-start align-items-center">
                     ${allTags}
                 </ul>
                 <a class="btn btn-success" href="${mealDetails.strSource}" target="_blank">Source</a>
                 <a class="btn btn-danger"  href="${mealDetails.strYoutube}" target="_blank">Youtube</a>
             </div>`

     document.querySelector("#detailsData").innerHTML = cartona
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// --SideBar--

// Open & Close icon + List Animation
$("#sideBar .openIcon span").on("click", function (e) {
     // console.log($("#sideBar").css("left")); 0px
     // console.log($("#sideBar .list").innerWidth()); 217.031
     if ($("#sideBar").css("left") == "0px") {
          close();
     } else {
          open();
     }
});

function close() {
     $("#sideBar").animate({ left: `-${$("#sideBar .list").innerWidth()}px` }, 500);
     $(".openIcon span").html("<i class='fas fs-3 fa-bars'></i>");
     // Animation
     $(".list ul").animate({
          top: "200px",
     }, 700);
     $(".list ul li").fadeToggle(1000);
}

function open() {
     $("#sideBar").animate({ left: 0 }, 500)
     $(".openIcon span").html("<i class='fa-solid fa-x fs-3'></i>");
     // Animation
     $(".list ul").animate({
          top: "0px",
     }, 700);
     $(".list ul li").fadeToggle(1000);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// --Main Meals--
async function getMainMeals() {
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
     let responseData = await response.json();
     // console.log(responseData.meals);
     displayMainMeals(responseData.meals, "mealsData");
}

function displayMainMeals(data, selector) {
     let mealsData = data;
     // console.log(mealsData.length);
     let cartona = ``;

     if (mealsData.length > 20 && selector != "mealsData") {
          for (let i = 0; i < 20; i++) {
               cartona += `<div class="col-md-3 cursor-pointer" onclick="getMealDetails('${mealsData[i].idMeal}')">
                         <div class="img position-relative overflow-hidden">
                             <img src="${mealsData[i].strMealThumb}" class="w-100  rounded rounded-2" alt="soup">
                             <div class="img-info position-absolute rounded rounded-2">
                                 <h3 class="position-absolute top-50 translate-middle-y p-2">${mealsData[i].strMeal}</h3>
                             </div>
                         </div>    
                     </div>`

          }
     } else {
          for (let i = 0; i < mealsData.length; i++) {
               cartona += `<div class="col-md-3 cursor-pointer" onclick="getMealDetails('${mealsData[i].idMeal}')">
                         <div class="img position-relative overflow-hidden">
                             <img src="${mealsData[i].strMealThumb}" class="w-100  rounded rounded-2" alt="soup">
                             <div class="img-info position-absolute rounded rounded-2">
                                 <h3 class="position-absolute top-50 translate-middle-y p-2">${mealsData[i].strMeal}</h3>
                             </div>
                         </div>    
                     </div>`

          }
     }

     document.querySelector(`#${selector}`).innerHTML = cartona;
     hoverFunction();

}

// Calling
getMainMeals();

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// --Search--


$("#search").on("click", function () {

     clear();
     close();
     $("#mealsSearchData").before(`<div class="container w-75" id="searchContainer">
     <div class="row pb-4 mb-5" id="inputs">
          <div class="col-md-6 ">
               <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
          </div>
          <div class="col-md-6">
               <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
          </div>
     </div>
     </div>`);

})

async function searchByName(search) {
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
     let responseData = await response.json();
     // $("#mealsSearchByLetterData").empty();
     displayMainMeals(responseData.meals, "mealsSearchData");
}

async function searchByFirstLetter(search) {
     // search == "" ? search = "a" : "";
     if (search == "") {
          search = "a";
     }
     console.log(search);
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`);
     let responseData = await response.json();
     // $("#mealsSearchByNameData").empty();
     displayMainMeals(responseData.meals, "mealsSearchData");
}


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// --Categories--

$("#categories").on("click", function () {
     clear();
     close();
     getCategories();
})

async function getCategories() {
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
     let responseData = await response.json();
     // console.log(responseData.categories);
     displayCategories(responseData.categories);
}

function displayCategories(data) {
     let mealsData = data;
     // console.log(mealsData.length);

     let cartona = ``;

     for (let i = 0; i < mealsData.length; i++) {
          cartona += `<div class="col-md-3 cursor-pointer">
                         <div class="img position-relative overflow-hidden" onclick="getCategoryMeals('${mealsData[i].strCategory}')">
                             <img src="${mealsData[i].strCategoryThumb}" class="w-100  rounded rounded-2" alt="soup">
                             <div class="img-info position-absolute rounded rounded-2 d-flex flex-column justify-content-center align-items-center text-center">
                                 <h3 class="p-2 pb-0">${mealsData[i].strCategory}</h3>
                                 <p class="p-2 pt-0">${mealsData[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                             </div>
                         </div>    
                     </div>`
     }


     document.querySelector(`#categoriesData`).innerHTML = cartona;
     hoverFunctionCat();
}
async function getCategoryMeals(category) {
     clear()
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
     let responseData = await response.json()
     displayMainMeals(responseData.meals, "categoriesData")
}
function hoverFunctionCat() {
     $(".img").hover(function (e) {
          $(e.target).next().css({ transform: "translateY(0)" });

     }, function () {
          $(".img-info").css({ transform: "translateY(110%)" });
     })
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// --Area--

$("#area").on("click", function () {
     clear();
     close();
     getArea();
})

async function getArea() {
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
     let responseData = await response.json();
     // console.log(responseData.meals.strArea);
     displayArea(responseData.meals);
}

function displayArea(data) {
     let areaData = data;
     // console.log(areaData.length);
     let cartona = ``;

     for (let i = 0; i < areaData.length; i++) {
          cartona += `<div class="col-md-3">
                         <div onclick="getAreaMeals('${areaData[i].strArea}')" class="area-color w-25 mx-auto cursor-pointer">
                              <i class="fa-solid fa-house-laptop fa-4x"></i>
                              <h3>${areaData[i].strArea}</h3>
                         </div>    
                     </div>`
     }
     document.querySelector(`#categoriesData`).innerHTML = cartona;
}

async function getAreaMeals(area) {
     clear()
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
     let responseData = await response.json()
     displayMainMeals(responseData.meals, "areaData")
     // console.log(responseData.meals);
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// --Ingridents

$("#ingredients").on("click", function () {
     clear();
     close();
     getIngridents();
})

async function getIngridents() {
     let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
     let responseData = await respone.json()
     //    console.log(responseData.meals);
     displayIngredients(responseData.meals.slice(0, 20))
}

function displayIngredients(data) {
     let areaData = data;
     let cartona = "";
     for (let i = 0; i < areaData.length; i++) {

          cartona += `
         <div class="col-md-3">
                 <div onclick="getIngredientsMeals('${areaData[i].strIngredient}')" class="area-color rounded-2 text-center cursor-pointer">
                         <i class="fa-solid fa-drumstick-bite fa-4x mb-3"></i>
                         <h3>${areaData[i].strIngredient}</h3>
                         <p>${areaData[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                 </div>
         </div>
         `
     }

     document.querySelector(`#ingredientsData`).innerHTML = cartona;
}

async function getIngredientsMeals(ingridents) {
     clear()
     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingridents}`)
     let responseData = await response.json()
     displayMainMeals(responseData.meals, "ingredientsData")
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------
// Contact Us

$("#contact").on("click", function () {
     clear();
     close();
     displayContacts();
})

// Declerations
let namePressed;
let emailPressed;
let phonePressed;
let agePressed;
let passwordPressed;
let repasswordPressed;

function displayContacts() {

     $("#contactData").html(
          `<div class="row gy-4" >
                <div class="col-md-6">
                    <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control"
                        placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Special Characters & Numbers not allowed
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control "
                        placeholder="Enter Your Email">
                    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter a valid Email Ex: mail@testing.com
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control "
                        placeholder="Enter Your Phone">
                    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid Phone Number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control "
                        placeholder="Enter Your Age">
                    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid age
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control "
                        placeholder="Enter Your Password">
                    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter valid password which contain minimum 8 characters containing at least 1 letter and 1 number
                    </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control "
                        placeholder="Re-enter password">
                    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                        Enter a valid password
                    </div>
                </div>
            </div>
            <button id="submitBtn" disabled class="btn btn-outline-danger d-block mx-auto px-3 mt-3">Submit</button> `
     )

     submitBtn = document.querySelector("#submitBtn");
     nameInput = document.querySelector("#nameInput");
     emailInput = document.querySelector("#emailInput");
     phoneInput = document.querySelector("#phoneInput");
     ageInput = document.querySelector("#ageInput");
     passwordInput = document.querySelector("#passwordInput");
     repasswordInput = document.querySelector("#repasswordInput");
     nameAlert = document.querySelector("#nameAlert");
     emailAlert = document.querySelector("#emailAlert");
     phoneAlert = document.querySelector("#phoneAlert");
     ageAlert = document.querySelector("#ageAlert");
     passwordAlert = document.querySelector("#passwordAlert");
     repasswordAlert = document.querySelector("#repasswordAlert");

     // for only the focused input
     $("#nameInput").on("focus", function () { namePressed = true; })
     $("#emailInput").on("focus", function () { emailPressed = true; })
     $("#phoneInput").on("focus", function () { phonePressed = true; })
     $("#ageInput").on("focus", function () { agePressed = true; })
     $("#passwordInput").on("focus", function () { passwordPressed = true; })
     $("#repasswordInput").on("focus", function () { repasswordPressed = true; })

}

function inputsValidation() {

     if (namePressed) {
          if (nameValidation()) {
               nameAlert.classList.replace("d-block", "d-none")

          } else {
               nameAlert.classList.replace("d-none", "d-block")

          }
     }

     if (emailPressed) {
          if (emailValidation()) {
               emailAlert.classList.replace("d-block", "d-none")
          } else {
               emailAlert.classList.replace("d-none", "d-block")

          }
     }

     if (phonePressed) {
          if (phoneValidation()) {
               phoneAlert.classList.replace("d-block", "d-none")
          } else {
               phoneAlert.classList.replace("d-none", "d-block")

          }
     }

     if (agePressed) {
          if (ageValidation()) {
               ageAlert.classList.replace("d-block", "d-none")
          } else {
               ageAlert.classList.replace("d-none", "d-block")

          }
     }

     if (passwordPressed) {
          if (passwordValidation()) {
               passwordAlert.classList.replace("d-block", "d-none")
          } else {
               passwordAlert.classList.replace("d-none", "d-block")

          }
     }

     if (repasswordPressed) {
          if (repasswordValidation()) {
               repasswordAlert.classList.replace("d-block", "d-none")
          } else {
               repasswordAlert.classList.replace("d-none", "d-block")

          }
     }

     if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation()) {
          submitBtn.removeAttribute("disabled")
     } else {
          // set the attr disabled to true if any validation = false
          submitBtn.setAttribute("disabled", true)
     }
}

function nameValidation() {
     let regex = /^[a-zA-Z ]+$/.test(nameInput.value);
     return regex;
}

function emailValidation() {
     let regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(emailInput.value);
     return regex;
}

function phoneValidation() {
     let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value);
     return regex;
}

function ageValidation() {
     let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value);
     return regex;
}

function passwordValidation() {
     let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value);
     return regex;
}

function repasswordValidation() {
     return passwordInput.value == repasswordInput.value
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------