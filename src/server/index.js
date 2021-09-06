const csv=require('csvtojson')

const fs=require('fs')
const pathMatchesCsv = "src/data/matches.csv";
const pathDeliveriesCsv = 'src/data/deliveries.csv'
const {matchesPerYear, extraRunPerTeam, 
  matchesWonPerTeam, top10EconomicalBowlers2015}=require("./ipl");



const saveOutputToJson = (data, fileName) => {
  fs.writeFile(
    "src/public/output/" + fileName + ".json",
    JSON.stringify(data, null, 2),
    "utf-8", errorPrint)
  }
  function errorPrint(err){
    if(err){
      console.log(err)
    }
  }



csv()
  .fromFile(pathMatchesCsv)
  .then((matches) => {
    csv()
      .fromFile(pathDeliveriesCsv)
      .then((deliveries) => {
        let matchesPlayed = matchesPerYear(matches);
        saveOutputToJson(matchesPlayed, 'matchesPerYear');
        let matchesWon =matchesWonPerTeam(matches);
        saveOutputToJson(matchesWon, 'matchesWonPerTeam');
        let extraRuns = extraRunPerTeam(matches, deliveries);
        saveOutputToJson(extraRuns, 'extraRunPerTeam');
        let topBoler =top10EconomicalBowlers2015(matches,deliveries);
        saveOutputToJson(topBoler, 'top10EconomicalBowlers2015');
    });
  });

  