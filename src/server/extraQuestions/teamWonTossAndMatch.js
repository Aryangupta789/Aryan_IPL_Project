// Question: Find the number of times each team won the toss and also won the match
function teamWonTossAndMatch(matches) {
  let team = {};
  matches.map((match) => {
    if (match.toss_winner === match.winner) {
      if (!team.hasOwnProperty(match["winner"])) {
        team[match.winner] = 1;
      } else {
        team[match.winner] += 1;
      }
    }
  });
  return team;
}

module.exports=teamWonTossAndMatch