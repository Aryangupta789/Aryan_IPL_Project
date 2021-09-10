const csv = require("csvtojson");
const fs = require("fs");
const pathMatchesCsv = "src/data/matches.csv";
const pathDeliveriesCsv = "src/data/deliveries.csv";
const playerDismissed=require("./playerDismissed")
const teamWonTossAndMatch = require("./teamWonTossAndMatch");
const economyInSuperOver =require('./economyInSuperOver');
const strikeRate =require("./strikeRate");
const playerOfTheMatch = require("./playerOfTheMatch");
const saveOutputToJson = (data, fileName) => {
  fs.writeFile(
    "src/public/output/extraQuestions/" + fileName + ".json",
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
        let teamsWon = teamWonTossAndMatch(matches);
        saveOutputToJson(teamsWon, 'teamsWonTossAndMatch');
        let players = playerOfTheMatch(matches);
        saveOutputToJson(players, 'playerOfTheMatch');
        let dismissed =playerDismissed(deliveries);
        saveOutputToJson(dismissed, 'playerDismissed'); 
        let economy = economyInSuperOver(deliveries);
        saveOutputToJson(economy,"economyInSuperOver")
        let strikeRt= strikeRate(matches,deliveries);
        saveOutputToJson(strikeRt,"strikeRate");
    });
  });