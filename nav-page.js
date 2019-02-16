if (!document.getElementById("mainPage")){
    let requestedPage = location.pathname;
    location.assign("/index.html#"+requestedPage.split('/')[1]);
}
