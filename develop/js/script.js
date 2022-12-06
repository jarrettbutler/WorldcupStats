"use strict";

// =================Side Nav bar=========================

const dropDowns = document.querySelectorAll(".dropdown");
const dropItems = document.querySelectorAll(".dropdown-item");
const groupsHtml = document.getElementById("groups-container");

for (let i = 0; i < dropDowns.length; i++) {
  dropDowns[i].addEventListener("click", function () {
    dropDowns[i].classList.toggle("is-active");
    dropDowns[i].classList.toggle("drop-mar");
  });
}

// for (let i = 0; i < dropItems.length; i++) {
//   dropItems[i].addEventListener("click", function () {
//     console.log(dropItems[i].textContent);
//   });
// }

// ======================================================
// ---------------Render All Groups of World Cup 2022 -------------------
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

// getData("https://copa22.medeiro.tech/groups");

// -----------------------Modal windows BTNS Handler-------------------------

// fetch(`https://copa22.medeiro.tech/teams/ned/matches`)
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// fetch(`https://restcountries.com/v2/name/Netherlands`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data);
//   });

for (let i = 0; i < dropItems.length; i++) {
  dropItems[i].addEventListener("click", function () {
    handleCountryNameClick(dropItems[i].getAttribute("name"));
  });
}
function handleCountryNameClick(countryName) {
  fetch(`https://copa22.medeiro.tech/teams/${countryName}/matches`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

// `const data1 = async function fetchCountryName(url) {
//   const response = await fetch(url);
//   await return response.json();
// };

// let fullData = data1("https://restcountries.com/v2/name/Canada");

// console.log(fullData);`
//               data[i]["teams"][j]["country"],
//               data[i]["teams"][j]["wins"],
//               data[i]["teams"][j]["losses"],
//               data[i]["teams"][j]["draws"],
//               data[i]["teams"][j]["points"]

// //country appreviation is the code of 3 characters
// class CountryInfo {
//   constructor(name, apprev, flag, capital, population, languages) {
//     this.name = name;
//     this.apprev = apprev;
//     this.flag = flag;
//     this.capital = capital;
//     this.population = population;
//     this.languages = languages; //languages is an array
//   }
// }

// class TeamStats {
//   constructor(team, wins, losses, draws, points) {
//     this.team = team;
//     this.wins = wins;
//     this.losses = losses;
//     this.draws = draws;
//     this.points = points;
//   }
// }

// class Group {
//   constructor(groupCode, teams) {
//     this.groupCode = groupCode;
//     this.teams = teams;
//   }
// }

// //country name is in 3 characters

// class Match {
//   constructor(
//     homeCountryName,
//     homeCountryApprev,
//     homeFlag,
//     homeCountryGoals,
//     awayCountryName,
//     awayCountryApprev,
//     awayFlag,
//     awayCountryGoals,
//     date,
//     stage
//   ) {
//     this.homeCountryName = homeCountryName;
//     this.homeCountryApprev = homeCountryApprev;
//     this.homeCountryGoals = homeCountryGoals;
//     this.homeFlag = homeFlag;

//     this.awayCountryName = awayCountryName;
//     this.awayCountryGoals = awayCountryGoals;
//     this.awayCountryApprev = awayCountryApprev;
//     this.awayFlag = awayFlag;

//     this.date = date;
//     this.stage = stage;
//   }
// }

// function getGroupStats() {
//   var reqURL = "https://copa22.medeiro.tech/groups";
//   var allGroups = [];

//   fetch(reqURL)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       //for each group
//       for (var i = 0; i < data.length; i++) {
//         var teams = [];

//         for (var j = 0; j < data[i]["teams"].length; j++) {
//           teams.push(
//             new TeamStats(
//               data[i]["teams"][j]["country"],
//               data[i]["teams"][j]["wins"],
//               data[i]["teams"][j]["losses"],
//               data[i]["teams"][j]["draws"],
//               data[i]["teams"][j]["points"]
//             )
//           );
//         }
//         allGroups.push(new Group(data[i]["code"], teams));
//       }
//     });
//   return allGroups;
// }

// //country name should be the full name not the country appreviation
// function getCountryInfo(countryName) {
//   var requestUrl = "https://restcountries.com/v2/name/" + countryName;

//   var countryInfo = [];
//   fetch(requestUrl)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       for (var i = 0; i < data.length; i++) {
//         var languages = [];
//         for (var j = 0; j < data[i]["languages"].length; j++) {
//           languages.push(data[i]["languages"][j]["name"]);
//         }
//         var tempCountryInfo = new CountryInfo(
//           data[i]["name"],
//           data[i]["alpha3Code"],
//           data[i]["flags"]["png"],
//           data[i]["capital"],
//           data[i]["population"],
//           languages
//         );

//         countryInfo.push(tempCountryInfo);
//       }
//     });

//   return countryInfo;
// }

//the country name should be in 3 characters
function getMatchesByCountry(countryName) {
  var reqURL = "https://copa22.medeiro.tech/teams/" + countryName + "/matches";
  fetch(reqURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("Matches:");
      console.log(data);
      //for each match
      for (var i = 0; i < data.length; i++) {
        var homeCountryName = data[i]["homeTeam"]["name"];
        var homeCountryApprev = data[i]["homeTeam"]["country"];
        var homeCountryGoals = data[i]["homeTeam"]["goals"];
        // var homeCountryInfo = getCountryInfo(homeCountryName);
        var homeFlag = "";

        var awayCountryName = data[i]["awayTeam"]["name"];
        var awayCountryApprev = data[i]["awayTeam"]["country"];
        var awayCountryGoals = data[i]["awayTeam"]["goals"];

        var awayFlag = "";

        //render
        const html = `

           <section class="country-info column">
               <h1 class="country-name">Canada <button class="favourite">⭐</button></h1>
               <img src="./develop/images/canadianflag.png"></img>
               <p class="fact1">Pop: 38.25million</p>
               <p class="fact2">Currency: Canadian$</p>
               <p class="fact3">Official languages: French and English</p>

           <section class="column">
             <section class="matches columns is-mobile">
                 <card class="box match1 grow column">
                     <div class="round">
                         <p class="round1">Round Robin</p>
                     </div>
                     <div class="date">
                         <p class="date1">Nov 23, 2022</p>
                     </div>
                     <div class="teams">
                     <p class="hometeam1">Belgium</p>
                     <p class="awayteam1">Canada</p>
                     </div>
                     <div class="scores">
                     <p class="hometeamscore1">1</p>
                     <p>-</p>
                     <p class="awayteamscore1">0</p>
                     </div>
                 </card>
                 <card class="box match2 grow column">
                     <div class="round">
                         <p class="round2"></p>
                     </div>
                     <div class="date">
                         <p class="date2"></p>
                     </div>
                     <div class="teams">
                     <p class="hometeam2"></p>
                     <p class="awayteam2"></p>
                     </div>
                     <div class="scores">
                     <p class="hometeamscore2"></p>
                     <p>-</p>
                     <p class="awayteamscore2"></p>
                     </div>
                 </card>
                 <card class="box match3 grow column">
                     <div class="round">
                         <p class="round3"></p>
                     </div>
                     <div class="date">
                         <p class="date3"></p>
                     </div>
                     <div class="teams">
                     <p class="hometeam3"></p>
                     <p class="awayteam3"></p>
                     </div>
                     <div class="scores">
                     <p class="hometeamscore3"></p>
                     <p>-</p>
                     <p class="awayteamscore3"></p>
                     </div>
                 </card>
             </section>
           </section>
         </section>  

        
        `;
      }
    });

  //return matchesByCountry;
}

// var country = getCountryInfo("canada");
// console.log("============contry info==============");
// console.log(country);
// console.log("==========Group Statistics=============");
// console.log(getGroupStats());
// console.log("Matches of Brazil==============");
// var matches = getMatchesByCountry("bra");
// console.log(matches);
