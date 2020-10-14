function route(page) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        var content = document.querySelector("#body-content");

        if (this.readyState == 4) {
            if (page === "home") {
                getStandings()
            } else if (page === "match") {
                getMatches()
            } else if (page === "favorite") {
                initFavoriteMatch()
                initFavoriteTeam()
            }

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
            }
        }
    };

    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
}