//Find the highest number of times one player has been dismissed by another player
function playerDismissed(deliveries) {
  let result = {};

  let playerDismissedData = deliveries.filter(
    (item) => item.player_dismissed !== ""
  );
  playerDismissedData.forEach((player) => {
    let bowlerName = {};
    playerDismissedData.map((delivery) => {
      if (player.batsman === delivery.player_dismissed) {
        bowlerName[delivery.bowler] = (bowlerName[delivery.bowler] || 0) + 1;
      }
    });
    result[player.batsman] = bowlerName;
  });
  console.log(result)
  finalResult={}
  for(player in result){
      let max=Math.max(...Object.values(result[player]))
      let obj =result[player];
      
      for (iterate in obj){
          if (obj[iterate]===max){
              finalResult[player]= [iterate +":"+ max]

          }
      }
    }
  return finalResult;
}
module.exports = playerDismissed;
