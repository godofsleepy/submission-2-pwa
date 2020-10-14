document.addEventListener('DOMContentLoaded', function () {

    var elems = document.querySelectorAll('.sidenav')
    M.Sidenav.init(elems)
    loadNav()

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    route(page)
    
})