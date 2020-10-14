const apiToken = "1df3e413fc204805a22af9f6853f011d"
const leagueCode = "2021"
const baseUrl = "https://api.football-data.org/"
const standingsUrl = `${baseUrl}v2/competitions/${leagueCode}/standings?standingType=TOTAL`
const matchesUrl = `${baseUrl}v2/competitions/${leagueCode}/matches?status=SCHEDULED`
let teamUrl = `${baseUrl}v2/teams/`
let matchUrl = `${baseUrl}v2/matches/`

let fetchApi = url => {
  return fetch(url, {
    method: "GET",
    headers: {
      'X-Auth-Token': apiToken
    }
  });
}

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statusText));
  } else {

    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getStandings() {
  if ("caches" in window) {
    caches.match(standingsUrl).then(function (response) {
      if (response) {
        response.json().then(data => {
          standings_component(data)
        })
      }
    }).catch(error)
  }

  fetchApi(standingsUrl)
    .then(status)
    .then(json)
    .then(data => {
      standings_component(data)
    })
    .catch(error)
}

function getMatches() {
  if ("caches" in window) {
    caches.match(matchesUrl).then(response => {
      if (response) {
        response.json().then(data => {
          mathces_component(data)
        })
      }
    })
  }

  fetchApi(matchesUrl)
    .then(status)
    .then(json)
    .then(data => {
      mathces_component(data)
    })
    .catch(error);
}

function getTeam(id) {
  return new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(teamUrl + id).then(response => {
        if (response) {
          response.json().then(data => {
            resolve(data)
          })
        }
      })
    }

    fetchApi(teamUrl + id)
      .then(status)
      .then(json)
      .then(data => {
        resolve(data)
      })
  })
}

function getMatch(id) {
  return new Promise((resolve, reject) => {
    if ("caches" in window) {
      caches.match(matchUrl + id).then(response => {
        if (response) {
          response.json().then(data => {
            resolve(data)
          })
        }
      })
    }

    fetchApi(matchUrl + id)
      .then(status)
      .then(json)
      .then(data => {
        resolve(data)
      })
  })
}