"use strict";

// =================Side Nav bar=========================

const dropDowns = document.querySelectorAll(".dropdown");
const dropItems = document.querySelectorAll(".dropdown-item");
const groupsHtml = document.getElementById("groups-container");
const getMain = document.getElementById("get-main");
const getCountry = document.getElementById("get-country");
const getCountryCard = document.getElementById("get-country--card");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const favouriteBtn = document.getElementById("bookmark-btn");
const cardName = document.getElementById("coun-name");
const listElem = document.getElementById("favListId");
const clearFavListBtn = document.getElementById("clear");

let favCountriesList = [];
for (let i = 0; i < dropDowns.length; i++) {
  dropDowns[i].addEventListener("click", function () {
    dropDowns[i].classList.toggle("is-active");
    dropDowns[i].classList.toggle("drop-mar");
  });
}

if (localStorage.getItem("favCountry") === null) {
} else {
  favCountriesList = JSON.parse(localStorage.getItem("favCountry"));
}
// ======================================================

if (favCountriesList.length === 0) {
} else {
  renderFavList();
}

function renderFavList() {
  listElem.innerHTML = "";
  // favCountriesList = JSON.parse(localStorage.getItem("favCountry"));

  for (var i = 0; i < favCountriesList.length; i++) {
    const html = `<li><button>${favCountriesList[i]}</button></li>`;
    listElem.insertAdjacentHTML("beforeend", html);
  }
}

function clearFavList() {
  localStorage.clear();
  listElem.innerHTML = "";
  favCountriesList = [];
}

clearFavListBtn.addEventListener("click", clearFavList);

listElem.addEventListener("click", function (e) {
  renderMatchHead(e.target.textContent);
  var country = e.target.textContent;

  if (country === "Netherlands") {
    renderCountryMatch("NED");
  } else if (country === "Iran") {
    renderCountryMatch("IRN");
  } else if (country === "Saudi arabia") {
    renderCountryMatch("KSA");
  } else if (country === "Spain") {
    renderCountryMatch("ESP");
  } else if (country === "Japan") {
    renderCountryMatch("JPN");
  } else if (country === "Costa rica") {
    renderCountryMatch("CRC");
  } else if (country === "Morocco") {
    renderCountryMatch("MAR");
  } else if (country === "Switzerland") {
    renderCountryMatch("SUI");
  } else if (country === "Cameroon") {
    renderCountryMatch("CMR");
  } else if (country === "Serbia") {
    renderCountryMatch("SRB");
  } else {
    renderCountryMatch(country.slice(0, 3));
  }
});

// ---------------Render All Groups of World Cup 2022 -------------------
searchBtn.addEventListener("click", function () {
  const value = searchInput.value.toLowerCase();
  const country = value.slice(0, 1).toUpperCase() + value.slice(1);
  renderMatchHead(country);
  if (country === "Netherlands") {
    renderCountryMatch("NED");
  } else if (country === "Iran") {
    renderCountryMatch("IRN");
  } else if (country === "Saudi arabia") {
    renderCountryMatch("KSA");
  } else if (country === "Spain") {
    renderCountryMatch("ESP");
  } else if (country === "Japan") {
    renderCountryMatch("JPN");
  } else if (country === "Costa rica") {
    renderCountryMatch("CRC");
  } else if (country === "Morocco") {
    renderCountryMatch("MAR");
  } else if (country === "Switzerland") {
    renderCountryMatch("SUI");
  } else if (country === "Cameroon") {
    renderCountryMatch("CMR");
  } else if (country === "Serbia") {
    renderCountryMatch("SRB");
  } else {
    renderCountryMatch(country.slice(0, 3));
  }

  searchInput.value = "";
});

const getData = function (url) {
  fetch(url).then(function (response) {
    response.json().then(function (data) {
      groupsHtml.classList.remove("is-hidden");

      for (let i = 0; i < data.length; i++) {
        const html = `
          <table class="table is-bordered column grow">
            <tr>
                <th class="groupA">Group ${data[i].code}</th>
                <th>Wins</th>
                <th>Draws</th>
                <th>Loses</th>
                <th>Points</th>
            </tr>
            <tr>
                <td class="countryA1">${data[i].teams[0].alternateName}</td>
                <td class="winsA1">${data[i].teams[0].wins}</td>
                <td class="drawsA1">${data[i].teams[0].draws}</td>
                <td class="losesA1">${data[i].teams[0].losses}</td>
                <td class="pointsA1">${data[i].teams[0].points}</td>
            </tr>
            <tr>
                <td class="countryA2">${data[i].teams[1].alternateName}</td>
                <td class="winsA2">${data[i].teams[1].wins}</td>
                <td class="drawsA2">${data[i].teams[1].draws}</td>
                <td class="losesA2">${data[i].teams[1].losses}</td>
                <td class="pointsA2">${data[i].teams[1].points}</td>
            </tr>
            <tr>
                <td class="countryA3">${data[i].teams[2].alternateName}</td>
                <td class="winsA3">${data[i].teams[2].wins}</td>
                <td class="drawsA3">${data[i].teams[2].draws}</td>
                <td class="losesA3">${data[i].teams[2].losses}</td>
                <td class="pointsA3">${data[i].teams[2].points}</td>
            </tr>
            <tr>
                <td class="countryA4">${data[i].teams[3].alternateName}</td>
                <td class="winsA4">${data[i].teams[3].wins}</td>
                <td class="drawsA4">${data[i].teams[3].draws}</td>
                <td class="losesA4">${data[i].teams[3].losses}</td>
                <td class="pointsA4">${data[i].teams[3].points}</td>
            </tr>
          </table>
        `;

        groupsHtml.insertAdjacentHTML("beforeend", html);
      }
    });
  });
};
getData("https://copa22.medeiro.tech/groups");

for (let i = 0; i < dropItems.length; i++) {
  dropItems[i].addEventListener("click", function () {
    renderMatchHead(dropItems[i].textContent);
    renderCountryMatch(dropItems[i].getAttribute("name"));
  });
}

function renderMatchHead(countryName) {
  getMain.classList.remove("is-hidden");
  groupsHtml.classList.add("is-hidden");

  getCountry.innerHTML = "";
  fetch(`https://restcountries.com/v2/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const html = `
     <h1 class="country-name">${data[0].name}</h1>
     <img class="flags" src=${data[0].flag}></img>
     <p class="fact1">Population: ${(data[0].population / 1000000).toFixed(
       3
     )} million</p>
      <p class="fact2">Currency: ${data[0].currencies[0].code}(${
        data[0].currencies[0].symbol
      }) </p>
      <p class="fact3">Official languages: ${data[0].languages[0].name}</p>
    
      `;
      getCountry.insertAdjacentHTML("afterbegin", html);

      favouriteBtn.addEventListener("click", function () {
        handleSaveCountryInFavorites(countryName);
      });
    });
}

function handleSaveCountryInFavorites(countryName) {
  if (favCountriesList.includes(countryName)) {
  } else {
    favCountriesList.push(countryName);
    localStorage.setItem("favCountry", JSON.stringify(favCountriesList));
    favCountriesList = JSON.parse(localStorage.getItem("favCountry"));

    renderFavList();
  }
}
function renderCountryMatch(countryCode) {
  getCountryCard.innerHTML = "";

  fetch(`https://copa22.medeiro.tech/teams/${countryCode}/matches`)
    .then((response) => response.json())
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        const html = `
         <card class="box match1 grow column">
          <div class="teams">
            <div class="country">
            <img src="https://countryflagsapi.com/svg/${
              data[i].homeTeam.name
            }" style="height:50px;"></img>
              <p class="hometeam1">${data[i].homeTeam.name}</p>
              <p>${data[i].homeTeam.goals}</p>
            </div>
            <div class="">
              <div class="round">
                <p class="round1">${data[i].stageName}</p>
              </div>
              <div class="round">
              <p class="round1">${data[i].location}</p>
            </div>              
            <div class="date">
              <p class="date1">${data[i].date.split("T")[0]}</p>
            </div>
            </div>
            <div class="country">
               <img src="https://countryflagsapi.com/svg/${
                 data[i].awayTeam.name
               }" style="height:50px;"></img>
               <p class="awayteam1">${data[i].awayTeam.name}</p>
               <p>${data[i].awayTeam.goals}</p>
             </div>
          </div>
         </card>
        
        `;

        getCountryCard.insertAdjacentHTML("beforeend", html);
      }
    });
}
