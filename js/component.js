function standings_component(data) {
    let standingsHTML = ""
    data.standings[0].table.forEach(team => {
        team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
        standingsHTML += `<tr>
              <td class="center-align">${team.position}</td>
              <td>       
              <p class="hide-on-small-only">
              <img class = "show-on-medium-and-up show-on-medium-and-down" src=${team.team.crestUrl} style="float:left;width:22px;height:22px;margin-right:20px">
              ${team.team.name}
              </p>
              <p class="hide-on-med-and-up">
              <img src=${team.team.crestUrl} style="float:left;width:22px;height:22px;margin-right:20px">
              </p>
              </td>
              <td class="center-align">${team.playedGames}</td>
              <td class="center-align">${team.won}</td>
              <td class="center-align">${team.draw}</td>
              <td class="center-align">${team.lost}</td>       
              <td class="center-align">${team.points}</td>
              <td class="center-align">
              <a class="waves-effect waves-light btn-small" onClick="check_favorite(${team.team.id},'team')">Favorite</a>
              </td>
            </tr>`

    })
    document.getElementById("standings").innerHTML = standingsHTML
}

function mathces_component(data) {
    let matchesHTML = "";
    data.matches.forEach(match => {
        match = JSON.parse(JSON.stringify(match).replace(/http:/g, 'https:'));
        matchesHTML += `<div class="col s12 m6 l6">
        <div class="card">
            <div class="card-content">
                <div center-align>
                    <div class="right-align">
                    <a class="waves-effect waves-light btn-small" onClick="check_favorite(${match.id},'match')">Favorite</a>
                    </div>
                    <h5 class="center-align">Matchday: ${match.matchday}</h5>
                    <div class="center-align">Kick Off: ${match.utcDate}</div>
    
                    <div class="row" style="margin:20px">
                        <div class="col s5 truncate right-align">
                            <span class="blue-text text-darken-2"> ${match.homeTeam.name}</span>
                        </div>
                        <div class="col s2 ">
                            VS
                        </div>
                        <div class="col s5 truncate left-align">
                            <span class="blue-text text-darken-2"> ${match.awayTeam.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    })
    document.getElementById("matches").innerHTML = matchesHTML
}

function initFavoriteMatch() {
    getAllData("match").then(data => {
        if (data.length == 0) return document.getElementById("matches_fav").innerHTML = ""
        let matchHtml = "<h2>Favorite Match</h2>"
        data.forEach(match => {
            matchHtml += `           
          <div class="col s12 m6 l6">
          <div class="card">
              <div class="card-content">
                  <div center-align>
                      <div class="right-align">
                      <a class="waves-effect waves-light btn-small" onClick="deletefav(${match.id},'match')">X</a>
                      </div>
                      <h5 class="center-align">Matchday: ${match.match.matchday}</h5>
      
                      <div class="row" style="margin:20px">
                          <div class="col s5 truncate right-align">
                              <span class="blue-text text-darken-2"> ${match.match.homeTeam.name}</span>
                          </div>
                          <div class="col s2 ">
                              VS
                          </div>
                          <div class="col s5 truncate left-align">
                              <span class="blue-text text-darken-2"> ${match.match.awayTeam.name}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>`
        })
        document.getElementById("matches_fav").innerHTML = matchHtml

    })
}

function initFavoriteTeam() {
    getAllData("team").then(data => {
        if (data.length == 0) return document.getElementById("team_fav").innerHTML = ""
        let teamHtml = "<h2>Favorite Team</h2>"
        data.forEach(team => {
            teamHtml += `           
            <div class="row">
            <div class="col s12 m3">
            <div class="center-align card">
              <div class="card-image">
                <img class="responsive-img" src="${team.crestUrl}" style="width:250px; height:250px;">
                <a class="center-align btn-floating halfway-fab waves-effect waves-light red" onClick="deletefav(${team.id},'team')">X</a>
              </div>
              <div class="card-content">
                <span class="card-title">${team.name}</span>
              </div>
            </div>
          </div>`
        })
        document.getElementById("team_fav").innerHTML = teamHtml
    })
}