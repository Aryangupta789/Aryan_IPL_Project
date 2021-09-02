/*Number of matches played per year for all the years in IPL.*/
function matchesPerYear(matches) {

    if (typeof matches !== 'object' || matches.length === 0) {
        return {};
    }
    else {

        let yearCount = {};

        matches.forEach(matches => {
            let years = matches.season;

            if (years in yearCount) {
                yearCount[years]++;
            }
            else {
                yearCount[years] = 1;
            }
        });
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

        matches.forEach(matches => {
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

    matches.forEach(matches => {

        if (matches.season == year) {

            deliveries.forEach(element => {

                if (matches.id == element.match_id) {

                    if (items[element.batting_team]) {
                        items[element.batting_team] += Number(element.extra_runs);
                    }
                    else {
                        items[element.batting_team] = Number(element.extra_runs);
                    }
                }
            });

        }

    });

    return items;

}

//
function top10EconomicalBowlers2015(matches, deliveries) {
    let matchId = 0;
    let economy = {};
    for (let match of matches) {
        const season = match.season;
        const id = match.id;
        if (season == 2015) {
            matchId = id;
        }

        for (let delivery of deliveries) {
            const match_id = delivery.match_id;
            const bowler = delivery.bowler;
            const over = delivery.over;
            const total_runs = delivery.total_runs;
            if (match_id == matchId) {
                if (bowler in economy) {
                    economy[bowler] += Number(total_runs / over);
                } else {
                    economy[bowler] = Number(total_runs / over);
                }
            }
        }
    }

    let economyInSortedOrder = Object.entries(economy).sort(
        (a, b) => a[1] - b[1]
    );
    let result = economyInSortedOrder.slice(0, 10);
    return result;
};

module.exports = { matchesPerYear, extraRunPerTeam, matchesWonPerTeam, top10EconomicalBowlers2015 }