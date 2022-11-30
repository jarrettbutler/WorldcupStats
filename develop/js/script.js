class CountryInfo {
    constructor(name, flag, capital, population, languages){
        this.name = name;
        this.flag = flag;
        this.capital = capital;
        this.population = population;
        this.languages = languages;
    }
}


class TeamStats{
    constructor (team, wins, losses, draws, points)
    {
        this.team = team;
        this.wins = wins;
        this.losses = losses;
        this. draws = draws;
        this.points = points;
    }
}

class Group{
    constructor(groupCode, teams){
        this.groupCode = groupCode;
        this.teams = teams;
    }
}

function getGroupStats(){
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

           for (var j= 0; j<data[i]["teams"].length; j++){
           teams.push( new TeamStats(data[i]["teams"][j]["country"],
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




function getCountryInfo() {
    var requestUrl = 'https://restcountries.com/v2/name/canada';
    var countryInfo = new CountryInfo();
     fetch(requestUrl)
       .then(function (response) {
        
         return response.json();
       })
       .then(function (data) {
       var languages = [];
        for(var i =0; i<data[0]["languages"].length; i++){
            languages.push(data[0]["languages"][i]["name"]);
        }
        countryInfo = new CountryInfo(
            data[0]["name"],
            data[0]["flags"]["png"],
            data[0]["capital"],
            data[0]["population"],
            languages ); 
       });
       
       return countryInfo;
   }
   
   var countryInfo = getCountryInfo();
   var groupStatistics = getGroupStats();
   console.log(countryInfo);
   console.log(groupStatistics);

