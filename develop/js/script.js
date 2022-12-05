
//country appreviation is the code of 3 characters
class CountryInfo {
    constructor(name, apprev, flag, capital, population, languages) {
        this.name = name;
        this.apprev = apprev;
        this.flag = flag;
        this.capital = capital;
        this.population = population;
        this.languages = languages; //languages is an array
    }
}


class TeamStats {
    constructor(team, wins, losses, draws, points) {
        this.team = team;
        this.wins = wins;
        this.losses = losses;
        this.draws = draws;
        this.points = points;
    }
}

class Group {
    constructor(groupCode, teams) {
        this.groupCode = groupCode;
        this.teams = teams;
    }
}

//country name is in 3 characters

class Match {
    constructor(homeCountryName, homeCountryApprev, homeFlag, homeCountryGoals, awayCountryName, awayCountryApprev, awayFlag, awayCountryGoals, date, stage) {

        this.homeCountryName = homeCountryName;
        this.homeCountryApprev = homeCountryApprev;
        this.homeCountryGoals = homeCountryGoals;
        this.homeFlag = homeFlag;

        this.awayCountryName = awayCountryName
        this.awayCountryGoals = awayCountryGoals;
        this.awayCountryApprev = awayCountryApprev;
        this.awayFlag = awayFlag;

        this.date = date;
        this.stage = stage;

    }
}


function getGroupStats() {
    var reqURL = "https://copa22.medeiro.tech/groups";
    var allGroups = [];

    fetch(reqURL)
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {

            //for each group
            for (var i = 0; i < data.length; i++) {

                var teams = [];

                for (var j = 0; j < data[i]["teams"].length; j++) {
                    teams.push(new TeamStats(data[i]["teams"][j]["country"],
                        data[i]["teams"][j]["wins"],
                        data[i]["teams"][j]["losses"],
                        data[i]["teams"][j]["draws"],
                        data[i]["teams"][j]["points"]));
                }
                allGroups.push(new Group(data[i]["code"], teams));
            }

        });
    return allGroups;
}



//country name should be the full name not the country appreviation
function getCountryInfo(countryName) {
    var requestUrl = 'https://restcountries.com/v2/name/' + countryName;

    var countryInfo = [];
    fetch(requestUrl)
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {
            for (var i = 0; i < data.length; i++) {
                var languages = [];
                for (var j = 0; j < data[i]["languages"].length; j++) {
                    languages.push(data[i]["languages"][j]["name"]);
                }
                var tempCountryInfo = new CountryInfo(
                    data[i]["name"],
                    data[i]["alpha3Code"],
                    data[i]["flags"]["png"],
                    data[i]["capital"],
                    data[i]["population"],
                    languages);

                countryInfo.push(tempCountryInfo);
            }

        });

    return countryInfo;
}

//the country name should be in 3 characters
function getMatchesByCountry(countryName) {
    var matchesByCountry = [];
    var reqURL = "https://copa22.medeiro.tech/teams/" + countryName + "/matches";
    fetch(reqURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            //for each match
            for (var i = 0; i < data.length; i++) {
                var homeCountryName = data[i]["homeTeam"]["name"];
                var homeCountryApprev = data[i]["homeTeam"]["country"];
                var homeCountryGoals = data[i]["homeTeam"]["goals"];
                var homeCountryInfo = getCountryInfo(homeCountryName);
                var homeFlag = "";

                var awayCountryName = data[i]["awayTeam"]["name"];
                var awayCountryApprev = data[i]["awayTeam"]["country"];
                var awayCountryGoals = data[i]["awayTeam"]["goals"];
                var awayFlag = "";


                matchesByCountry.push(new Match(homeCountryName,
                    homeCountryApprev,
                    homeFlag,
                    homeCountryGoals,
                    awayCountryName,
                    awayCountryApprev,
                    awayFlag,
                    awayCountryGoals,
                    data[i]["date"],
                    data[i]["stageName"]));

            }
        });

    return matchesByCountry;
}


var country = getCountryInfo("canada");
console.log("============contry info==============");
console.log(country);
console.log("==========Group Statistics=============");
console.log(getGroupStats());
console.log("Matches of Brazil==============");
var matches = getMatchesByCountry("bra");
console.log(matches);
