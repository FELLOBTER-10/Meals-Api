"use strict"

let loading_screen = document.getElementById('loading_screen')
let open_nav = document.querySelector('.open-nav')
let close_nav = document.querySelector('.close-nav')
let sideBar = document.getElementById('sideBar')
let rowData = document.getElementById('rowData')
let searchByNameInput = document.getElementById("searchByName")
let searchByLetterInput = document.getElementById("searchByLetter")
let pages = document.getElementById('pages')

function loadingScreen() {
    $(document).ready(function () {
        $('loader').hide(1000)
    })
}

/* function open side bar */

function OpenSideBar() {
    $(".open-nav").on("click", function () {
        $(".side-box ").animate({ left: "0%" }, 500)
    })


    $(".open-nav").on("click", function () {
        open_nav.classList.add('d-none')
        close_nav.classList.add('d-block')
    })
}
OpenSideBar()

/* function close side bar */

function CloseSideBar() {
    $(".close-nav").on("click", function () {
        $(".side-box ").animate({ left: "-20%" }, 500)

    })

    $(".close-nav").on("click", function () {
        open_nav.classList.toggle('d-none')
        close_nav.classList.toggle('d-block')
    })
}
CloseSideBar()


/* function get data*/

async function getSearchArr(SER) {
    loadingScreen()
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${SER}`)
    let DataMeals = await request.json()
    return DataMeals.meals
}

(async function () {
    loadingScreen()
    let meals = await getSearchArr("")
    displayData(meals)
})()
/* create Continar */
let ElContainar = document.createElement("div")
ElContainar.classList.add("container")

/* create Search inputByName  */
let colMdInputSearch = document.createElement("div")
colMdInputSearch.classList.add("d-flex", "justify-content-between", "my-5")
let inputByName = document.createElement("input")
inputByName.setAttribute("placeholder", "search By Name ")
inputByName.setAttribute("type", " text")
inputByName.classList.add("form-control", "my-2", "bg-transparent", "ms-4", "d-inline-block", "text-white")
inputByName.setAttribute("id", "SearchinputByName")
/* function searchByName */
inputByName.addEventListener('keyup', async () => {
    loadingScreen()
    let meals = await getSearchArr(inputByName.value)
    pages.innerHTML = ''
    let temp = ""
    for (let i = 0; i < meals.length; i++) {
        temp += `  <div class="col-md-3   ">
<div onclick="Ditals(${meals[i].idMeal})" class="item my-3 position-relative overflow-hidden rounded-2 cursor-pointer">
    <img src="${meals[i].strMealThumb}" alt="" class="w-100">
    <div class="layer d-flex align-items-center p-2 position-absolute ">
        <h3>${meals[i].strMeal}</h3>
    </div>
</div>
</div>`
    }
    pages.innerHTML = temp

})

/* create Search inputByLetter */
let inputByLetter = document.createElement("input")
inputByLetter.setAttribute("placeholder", "search By Letter ")
inputByLetter.setAttribute("type", " text")
inputByLetter.setAttribute("maxlength", " 1")
inputByLetter.classList.add("form-control", "my-2", "bg-transparent", "ms-4", "d-inline-block", "text-white")
inputByLetter.setAttribute("id", "SearchinputByLetter")
colMdInputSearch.append(inputByName, inputByLetter)
ElContainar.append(colMdInputSearch)


/* function searchByLettr */
let meals = []
async function apiSearchByLettr(letter) {
    loadingScreen()
    pages.innerHTML = ""
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    let Data = await request.json()
    meals = Data
    console.log(meals);
}



/*******************************************/
inputByLetter.addEventListener("keyup", async () => {
    loadingScreen()
    let meals = await getSearchArr(inputByLetter.value)
    pages.innerHTML = ""

    let temp = ""
    for (let i = 0; i < meals.length; i++) {
        temp += `  <div class="col-md-3   ">
<div onclick="Ditals(${meals[i].idMeal})" class="item my-3 position-relative overflow-hidden rounded-2 cursor-pointer">
    <img src="${meals[i].strMealThumb}" alt="" class="w-100">
    <div class="layer d-flex align-items-center p-2 position-absolute ">
        <h3>${meals[i].strMeal}</h3>
    </div>
</div>
</div>`
    }
    pages.innerHTML = temp


})





function displaySearch() {
    loadingScreen()
    rowData.innerHTML = ""
    pages.innerHTML = ""
    rowData.append(ElContainar)
}

/* functiom display search */






/* function display data*/

function displayData(meals) {
    pages.innerHTML = ""
    loadingScreen()
    loading_screen.classList.add('d-none')
    let temp = ""
    for (let i = 0; i < meals.length; i++) {
        temp += `  <div class="col-md-3   ">
    <div onclick="Ditals(${meals[i].idMeal})" class="item my-3 position-relative overflow-hidden rounded-2 cursor-pointer">
        <img src="${meals[i].strMealThumb}" alt="" class="w-100">
        <div class="layer d-flex align-items-center p-2 position-absolute ">
            <h3>${meals[i].strMeal}</h3>
        </div>
    </div>
</div>`

        rowData.innerHTML = temp
    }
}


let ditals = []
async function Ditals(id) {
    pages.innerHTML = ""
    loadingScreen()
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let Data = await request.json()
    ditals = Data.meals
    console.log(ditals);
    displayDitals()
}

/* display ditals */

function displayDitals() {
    pages.innerHTML = ""
    loadingScreen()
    rowData.innerHTML = ""
    let temp = ""
    // console.log(ditals);
    for (let i = 0; i < ditals.length; i++) {
        temp += `  <div class="col-md-4 text-white">
        <img src="${ditals[i].strMealThumb}" alt="" class="w-100 rounded-3">
        <h2>${ditals[i].strMeal}</h2>
    </div>
    <div class="col-md-8 text-white">
        <h2>Instructions</h2>
        <p>${ditals[i].strInstructions}</p>
        <h3> <span class="fw-bolder">Area: ${ditals[i].strArea}</span> </h3>
        <h3>Category: ${ditals[i].strCategory}</h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-info m-2 p-1">${ditals[i]["strMeasure1"]}</li>
        </ul>
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            <li class="alert alert-danger m-2 p-1">${ditals[i].strTags}</li>
        </ul>

        <a target="_blank" class="btn btn-success" href="${ditals[i].strSource}">Source</a>
        <a target="_blank" class="btn btn-danger" href="${ditals[i].strYoutube}">Youtube</a>
    </div>`
        rowData.innerHTML = temp

    }
}

/* function display search*/





/* function get catrgories */
let response = []
async function getCatrgories() {
    loadingScreen()
    pages.innerHTML = ""
    rowData.innerHTML = ""
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let DataCategories = await request.json()
    response = DataCategories.categories
    // console.log(response);
}
getCatrgories()

/* function display catrgories */
function displayCatgroies() {
    loadingScreen()
    pages.innerHTML = ""
    rowData.innerHTML = ""
    let result = ""
    for (let i = 0; i < response.length; i++) {
        result += `  <div class="col-md-3   ">
    <div  onclick="categoriesDitals('${mealsCategriose[i].strCategory}')" class="item my-3 position-relative overflow-hidden rounded-2 cursor-pointer">
        <img src="${response[i].strCategoryThumb}" alt="" class="w-100">
        <div class="layer text-center  p-2 position-absolute overflow-hidden ">
            <h3>${response[i].strCategory}</h3>
            <h6>${response[i].strCategoryDescription.slice(0, 104)}</h6>
        </div>
    </div>
</div>`
        rowData.innerHTML = result
    }

}

/* function getDitals Categroies */

let getDitalsCategriose = []
async function categoriesDitals(categories) {

    loadingScreen()
    pages.innerHTML = ""
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories}`)
    let DataSetrCategroy = await request.json()
    getDitalsCategriose = DataSetrCategroy.meals
    console.log(getDitalsCategriose);
    console.log("categories: " + categories);
    displayData(getDitalsCategriose)
}



/* function get mealsCategriose */
let mealsCategriose = []
async function getMeals() {
    loadingScreen()
    pages.innerHTML = ""
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    let Datameals = await request.json()
    mealsCategriose = Datameals.meals
    // console.log(mealsCategriose);
}
getMeals()

/* function displyDitals Categroies */

function displyDitalsCategroies() {
    loadingScreen()
    pages.innerHTML = ""
    rowData.innerHTML = ""
    let temp = ""
    for (let i = 0; i < getDitalsCategriose.length; i++) {
        temp += `<div class="col-md-3   ">
        <div   class="item my-3 position-relative overflow-hidden rounded-2 cursor-pointer">
            <img src="${getDitalsCategriose[i].strMealThumb}" alt="" class="w-100">
            <div class="layer text-center  p-2 position-absolute overflow-hidden ">
                <h3>${getDitalsCategriose[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    rowData.innerHTML = temp
}




/* function get Area */
let AraeData = []
async function getArea() {
    loadingScreen()
    pages.innerHTML = ""
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let arrey = await request.json()
    AraeData = arrey.meals
    console.log(AraeData);
    displayArea()
}


/* function display area */

function displayArea() {
    rowData.innerHTML = ""
    pages.innerHTML = ""
    let temp = ""
    for (let i = 0; i < AraeData.length; i++) {
        loadingScreen()
        temp += ` <div class="col-md-3 ">
        <div onclick="AreaDitals('${AraeData[i].strArea}')" class="item my-3 position-relative overflow-hidden rounded-2 text-white cursor-pointer">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${AraeData[i].strArea}</h3>
        </div>
    </div>`
        rowData.innerHTML = temp

    }
}
/* function getDitals Area */
async function AreaDitals(Arae) {
    pages.innerHTML = ""
    loadingScreen()
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Arae}`)
    let { meals } = await request.json()
    console.log(meals);
    displayData(meals)
}


function displyAreaDitals() {
    loadingScreen()
    pages.innerHTML = ""
    rowData.innerHTML = ""
    let temp = ""
    for (let i = 0; i < getDitalsCategriose.length; i++) {
        temp += `<div class="col-md-3   ">
        <div   class="item my-3 position-relative overflow-hidden rounded-2 cursor-pointer">
            <img src="${getDitalsCategriose[i].strMealThumb}" alt="" class="w-100">
            <div class="layer text-center  p-2 position-absolute overflow-hidden ">
                <h3>${getDitalsCategriose[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    rowData.innerHTML = temp
}







/* function Get Ingredients */
let Ingredients = []
async function getIngredients() {
    loadingScreen()
    pages.innerHTML = ""
    let request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let dataIngredients = await request.json()
    Ingredients = dataIngredients.meals
    console.log(Ingredients);
    displayIngredients()
}
// getIngredients()

/* function display Ingredients */
function displayIngredients() {
    loadingScreen()
    pages.innerHTML = ""
    rowData.innerHTML = ""
    let temp = ""
    for (let i = 0; i < 20; i++) {
        temp += `  <div class="col-md-3 ">
        <div onclick="getDatilsIngreidents('${Ingredients[i].strIngredient}')"  class="item my-3 position-relative overflow-hidden rounded-2 text-center text-white cursor-pointer">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${Ingredients[i].strIngredient}</h3>
            <p>${Ingredients[i].strDescription.slice(1, 100)}</p>
        </div>
    </div>`
        // console.log("ing: " +Ingredients);
        rowData.innerHTML = temp
    }
}


/* function display DatilsIngreidents */
async function getDatilsIngreidents(Ing) {
    loadingScreen()
    pages.innerHTML = ""
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ing}`)
    let { meals } = await request.json()
    console.log(meals);
    displayData(meals)
}


function displayContact() {
    loadingScreen()
    pages.innerHTML = ""
    rowData.innerHTML = ""
    rowData.append(content)

}

/* create username input  */
let colMdUserName = document.createElement("div")
colMdUserName.className = "col-md-6"
// console.log(colMdUserName);
let UserName = document.createElement("input")
UserName.setAttribute("placeholder", "Enter Your Name ")
UserName.setAttribute("type", " text")
UserName.classList.add("form-control", "my-2")
UserName.setAttribute("id", "NameInput")
let AlertErorrName = document.createElement("div")
AlertErorrName.classList.add('alert', "alert-danger", "d-none")
AlertErorrName.append(" Special characters and numbers not allowed")
colMdUserName.append(UserName, AlertErorrName)

/* create userEmail input  */
let colMdEmail = document.createElement("div")
colMdEmail.className = "col-md-6"
// console.log(colMdEmail);
let UserEamil = document.createElement("input")
UserEamil.setAttribute("placeholder", "Enter Your Email ")
UserEamil.setAttribute("type", "email")
UserEamil.classList.add("form-control", "my-2")
UserEamil.setAttribute("id", "EmailInput")
let AlertErorrEmail = document.createElement("div")
AlertErorrEmail.classList.add('alert', "alert-danger", "d-none")
AlertErorrEmail.append("  Email not valid *exemple@yyy.zzz")
colMdEmail.append(UserEamil, AlertErorrEmail)

/* create userPhone input  */
let colMdPhone = document.createElement("div")
colMdPhone.className = "col-md-6"
// console.log(colMdPhone);
let UserPhone = document.createElement("input")
UserPhone.setAttribute("placeholder", "Enter Your Phone ")
UserPhone.setAttribute("type", "number")
UserPhone.classList.add("form-control", "my-2")
UserPhone.setAttribute("id", "PhoneInput")
let AlertErorrPhone = document.createElement("div")
AlertErorrPhone.classList.add('alert', "alert-danger", "d-none")
AlertErorrPhone.append("  Enter valid Phone Number")
colMdPhone.append(UserPhone, AlertErorrPhone)

/* create userAge input  */
let colMdAge = document.createElement("div")
colMdAge.className = "col-md-6"
// console.log(colMdAge);
let UserAge = document.createElement("input")
UserAge.setAttribute("placeholder", "Enter Your Age ")
UserAge.setAttribute("type", "number")
UserAge.classList.add("form-control", "my-2")
UserAge.setAttribute("id", "AgeInput")
let AlertErorrAge = document.createElement("div")
AlertErorrAge.classList.add('alert', "alert-danger", "d-none")
AlertErorrAge.append("   Enter valid age")
colMdAge.append(UserAge, AlertErorrAge)

/* create userpassword input  */

let colMdPassword = document.createElement("div")
colMdPassword.className = "col-md-6"
// console.log(colMdPassword);
let UaerPassword = document.createElement("input")
UaerPassword.setAttribute("placeholder", "Enter Your Passowrd ")
UaerPassword.setAttribute("type", "password")
UaerPassword.classList.add("form-control", "my-2")
UaerPassword.setAttribute("id", "PasswordInput")
let AlertErorrPassword = document.createElement("div")
AlertErorrPassword.classList.add('alert', "alert-danger", "d-none")
AlertErorrPassword.append(" Enter valid password *Minimum eight characters, at least one letter and one number:*")
colMdPassword.append(UaerPassword, AlertErorrPassword)

/* create userRpassword input  */

let colMdRPassword = document.createElement("div")
colMdRPassword.className = "col-md-6"
// console.log(colMdRPassword);
let UserRPassword = document.createElement("input")
UserRPassword.setAttribute("placeholder", "RPassowrd ")
UserRPassword.setAttribute("type", "password")
UserRPassword.classList.add("form-control", "my-2")
UserRPassword.setAttribute("id", "RPasswordInput")
let AlertErorrRPassword = document.createElement("div")
AlertErorrRPassword.classList.add('alert', "alert-danger", "d-none")
AlertErorrRPassword.append("  Enter valid repassword")
colMdRPassword.append(UserRPassword, AlertErorrRPassword)

/* create div button submit  */
let box = document.createElement("div")
box.classList.add("d-block", "m-auto", "test2")
/* create button submit  */
// console.log(box);
let submitBtn = document.createElement("button")
submitBtn.classList.add("btn", "btn-outline-danger", "px-2", "mt-3", "m-auto", "disabled")
submitBtn.append("submit")
box.append(submitBtn)

/* create Element container  */
let content = document.createElement("div")
content.classList.add("row", "test")
content.append(colMdUserName, colMdEmail, colMdPhone, colMdAge, colMdPassword, colMdRPassword, box)

let NameInput = UserName
let EmailInput = UserEamil
let PhoneInput = UserPhone
let AgeInput = UserAge
let passwordInput = UaerPassword
let RpasswordInput = UserRPassword
let RegexNameInput = /^[A-za-z]{3,16}$/
let RegexEmailInput = /^[A-za-z]{3,20}[0-9]{2,3}@[A-Za-z]{3,10}\.[a-zA-Z]{2,3}$/
let RegexPhoneInput = /^(02|01)[0125][0-9]{8}$/
let RegexAgeInput = /^[0-9]{1,3}$/
let RegexPasswordInput = /^(?=.*[A-Z][a-z])(?=.*\d)[A-Za-z\d]{8,16}$/


/* Regex Inputs  */
function ValidName() {
    if (RegexNameInput.test(NameInput.value) == true) {
        return true
    } else {
        return false
    }
}

function ValidEmail() {
    if (RegexEmailInput.test(EmailInput.value) == true) {
        return true
    } else {
        return false
    }
}

function ValidPhone() {
    if (RegexPhoneInput.test(PhoneInput.value) == true) {
        return true
    } else {
        return false
    }
}

function ValidAge() {
    if (RegexAgeInput.test(AgeInput.value) == true) {
        return true
    } else {
        return false
    }
}

function ValidPassword() {
    if (RegexPasswordInput.test(passwordInput.value) == true) {
        return true
    } else {
        return false
    }
}

function ValidRpassword() {
    if (RegexPasswordInput.test(RpasswordInput.value) == true) {
        return true
    } else {
        return false
    }
}


NameInput.addEventListener("keypress", () => {
    if (ValidName() == true) {
        AlertErorrName.classList.replace("d-block", "d-none")
    } else if (ValidName() == false) {
        AlertErorrName.classList.replace("d-none", "d-block")
    }
    EnableButton()

})

EmailInput.addEventListener("keypress", () => {
    if (ValidEmail() == true) {
        AlertErorrEmail.classList.replace("d-block", "d-none")
    } else if (ValidEmail() == false) {
        AlertErorrEmail.classList.replace('d-none', "d-block")
    }
    EnableButton()
})


PhoneInput.addEventListener("keyup", function () {
    if (ValidPhone() == true) {
        AlertErorrPhone.classList.replace("d-block", "d-none")
    } else {
        AlertErorrPhone.classList.replace("d-none", "d-block")
    }
    EnableButton()
})


AgeInput.addEventListener("keyup", function () {
    if (ValidAge() == true) {
        AlertErorrAge.classList.replace("d-block", "d-none")

    } else {
        AlertErorrAge.classList.replace("d-none", "d-block")
    }
    EnableButton()
})



passwordInput.addEventListener("keyup", function () {
    if (ValidPassword() == true) {
        AlertErorrPassword.classList.replace("d-block", "d-none")

    } else {
        AlertErorrPassword.classList.replace("d-none", "d-block")

    }
    EnableButton()
})


RpasswordInput.addEventListener("keyup", () => {
    console.log(RpasswordInput.value);
    console.log(passwordInput.value);
    if (RpasswordInput.value == passwordInput.value) {
        AlertErorrRPassword.classList.replace("d-block", "d-none")
    } else {
        AlertErorrRPassword.classList.replace("d-none", "d-block")

    }
    EnableButton()
})



function EnableButton() {
    if (ValidAge() == true && ValidEmail() == true && ValidName() == true
        && ValidPhone() == true && ValidPassword() == true && ValidRpassword() == true) {
        submitBtn.classList.remove("disabled")
    }
}

EnableButton()


