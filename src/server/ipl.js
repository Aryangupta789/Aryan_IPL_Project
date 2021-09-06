/*Number of matches played per year for all the years in IPL.*/
function matchesPerYear(matches) {

    if (typeof matches !== 'object' || matches.length === 0) {
        return "either matches is not object or it is empty";
    }
    else {

        let yearCount = {};
        matches.map(matches=>{
            let years= matches.season;
            if(!yearCount.hasOwnProperty(matches['season'])){
                yearCount[years]=1;
            }else{
                yearCount[years]++;
            }
        })

        return yearCount;

    }
}


//Number of matches won per team per year in IPL.

function matchesWonPerTeam(matches) {

    if (typeof matches !== 'object' || matches.length === 0) {
        return {};
    }

    else {
        let teams = {};

        matches.map(matches => {
            let season = matches.season;
            let winner = matches.winner;

            if (teams[season] != undefined) {

                if (teams[season][winner] != undefined) {
                    teams[season][winner] += 1;
                }
                else {

                    teams[season][winner] = 1;
                }
            }
            else {

                teams[season] = {};
                teams[season][winner] = 1;
            }
        });
        return teams;

    }
}

//Extra runs conceded per team in the year 2016

function extraRunPerTeam(matches, deliveries, year = 2016) {

    let items = {};

    matches.map(matches => {

        if (matches.season == year) {

            deliveries.forEach(element => {

                if (matches.id == element.match_id) {

                    if (items[element.bowling_team]) {
                        items[element.bowling_team] += Number(element.extra_runs);
                    }
                    else {
                        items[element.bowling_team] = Number(element.extra_runs);
                    }
                }
            });

        }

    });

    return items;

}

//Top 10 economical bowlers in the year 2015
function top10EconomicalBowlers2015(matches, deliveries,year = 2015) {
    var bowlerInfo = {};
    var matchId = [];
    matches.map((match) => {
        if (match["season"] == year) {
            matchId.push(match["id"])
        }
    })
    deliveries.map((delivery) => {

        if (matchId.includes(delivery["match_id"])) {

            if (!bowlerInfo.hasOwnProperty(delivery["bowler"])) {

                bowlerInfo[delivery["bowler"]] = { "runs": Number(delivery["total_runs"]), "balls": 1 }

            }
            else {
                bowlerInfo[delivery["bowler"]].runs += Number(delivery["total_runs"]);
                bowlerInfo[delivery["bowler"]].balls += 1;
            }
        }
    })
    //console.log(bowlerInfo);
    var bowlerEconomy = Object.keys(bowlerInfo).reduce((acc, ele) => {

        acc.push([ele, bowlerInfo[ele].runs / (bowlerInfo[ele].balls / 6)])
        return acc;
    }, [])
    //console.log(bowlerEconomy)
    let economyInSortedOrder = bowlerEconomy.sort(
        (a, b) => a[1] - b[1]
    );
    let result = economyInSortedOrder.slice(0, 10);
    return result;
}

module.exports = { matchesPerYear, extraRunPerTeam, matchesWonPerTeam, top10EconomicalBowlers2015 }