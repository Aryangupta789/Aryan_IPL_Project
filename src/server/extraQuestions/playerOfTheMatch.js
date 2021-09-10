// Find a player who has won the highest number of Player of the Match awards for each season
function playerOfTheMatch(matches) {
  let matchSeasons=[]
  matches.map((match)=>{
    if(!matchSeasons.includes(match["season"])){
      matchSeasons.push(match["season"])
    }
  })
  let players={}
  matchSeasons.forEach((year)=>{
    players[year]=matches.reduce((player,match)=>{
      if(year=== match.season){
        player[match.player_of_match]=(player[match.player_of_match] || 0)+1;
      }
      return player
    },{})
  })
  let finalResult = {};

  for (player in players) {

      let max = Math.max(...Object.values(players[player]))
      let obj = players[player];

      for (iterate in obj) {
          if (obj[iterate] === max) {
              finalResult[player] = iterate;
          }
      }
  }
  return finalResult;
}

module.exports=playerOfTheMatch