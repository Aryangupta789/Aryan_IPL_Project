//Find the highest number of times one player has been dismissed by another player
function playerDismissed(deliveries) {
  let finalResult = {};

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
    finalResult[player.batsman] = bowlerName;
  });
 
  return finalResult;
}
module.exports = playerDismissed;
