// Handle setting "active" on navbar links
let header = document.getElementById("navbarCollapse");
let links = header.getElementsByClassName("nav-item");
for (let i = 0; i < links.length; i++){
  // Ignore disabled links
  if (links[i].getElementsByClassName("disabled", "").length == 0) {
    links[i].addEventListener("click", function(){
      let current = document.getElementsByClassName("active", "");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
}

// AJAX dynamic html loading
function getContent(name){
  if (name == "/" || name == "/index.html"){ name = "home.html"; }
  jQuery.get(name, function(data) { // Perform AJAX GET request
    console.log("Retrieving " + name);
    jQuery('#page-content').html(data); // If the request is successful, load the response inside the path-content div
  });
}

// Dynamic loading of page content
function loadContent(name){
  if (name == window.location.pathname.split('/')[1]) return false;
  let page = { currentPage : name };
  history.pushState(page, name, name);
  getContent(name);
  return false;
}

// Handle bookmarks
$(document).ready(function() {
  if (!location.hash){
  getContent(window.location.pathname);
} else {
  let pageName = location.hash.split('#')[1].split(".")[0];
  let page = { currentPage : pageName };
  history.pushState(page, pageName, pageName+".html");

  let current = document.getElementsByClassName("active", "");
  current[0].className = current[0].className.replace(" active", "");
  let header = document.getElementById("navbarCollapse");
  let links = header.getElementsByClassName("nav-link");
  for (let i = 0; i < links.length; i++){
      if (links[i].id == pageName) links[i].className += " active";
  }
  getContent(pageName+".html");
}
});

// Handle history
window.onpopstate = function(event) {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  let page = event.state.currentPage;
  getContent(page);
};

// Generate cards
function generateCard(cardData, index) {
   var cardTitle = cardData.title;
   var cardDescription = cardData.description;
   var cardImage = cardData.image;
   var cardLink = cardData.link;
   var cardLinkTitle = cardData.linkTitle;
   var cardDelay = 250*index;
   return [
     '<div class="w-30">',
     '<div class="card border-dlight mb-3 mb-3" style="float:left;max-width: 18rem;" data-aos-delay="' + cardDelay + '" data-aos-duration="1000" class="item" data-aos="fade-left">',
        '<h5 class="card-header">' + cardTitle + '</h5>',
        '<div class="card-body">',
        //'<img src=' + cardImage + ' class="card-img">',
         //'<div class="card-img-overlay"></div>',
         '<p class="card-text">' + cardDescription + '</p>',
         '<a href="' + cardLink + '"class="btn btn-primary">' + cardLinkTitle + '</a>',
      '</div>',
     '</div>',
     '</div>'
   ].join('');
 }
