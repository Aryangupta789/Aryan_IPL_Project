// Find the bowler with the best economy in super overs
function economyInSuperOver(deliveries) {
  let bowlerRuns = {};
  let bowlerBalls = {};
//.................finding  runs and balls given by bowler.................
  deliveries.filter((item) => Number(item.is_super_over) !== 0)
    .map((delivery) => {
      bowlerRuns[delivery.bowler] =
        (bowlerRuns[delivery.bowler] || 0) +
        Number(delivery.total_runs);
      bowlerBalls[delivery.bowler] =
        (bowlerBalls[delivery.bowler] || 0) + 1;
    });
//.................calculating the economy of each bowler.........
  let economiRate = {};

  for (bowler in bowlerRuns) {
    economiRate[bowler] = (
      bowlerRuns[bowler] /
      (bowlerBalls[bowler] / 6)
    );
  }
 //..............find minimum economy and return the bowler........
  
 let minValueOfEconomiRate = Math.min(...Object.values(economiRate));
  //console.log(economiRate,minValueOfEconomiRate)
 
  let finalResult = {};

  for (bowler in economiRate) {
    if (minValueOfEconomiRate === Number(economiRate[bowler])) {
      finalResult[bowler] = minValueOfEconomiRate;
    }
  }

  return finalResult;
}

module.exports=economyInSuperOver
