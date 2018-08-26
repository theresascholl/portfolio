

// SHOW / HIDE MODAL FOR PORTFOLIO

let showModal = (e) => {
  const target = e.currentTarget.dataset.id;

  fetch('db.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(projects => {  
    
    const modal = document.querySelector("#modal");
    const backdrop = document.querySelector("#backdrop");
    const body = document.querySelector("body");

    modal.style.display = 'block';
    backdrop.style.display = 'block';
    body.style.overflow = 'hidden';

    let output =
    `<div id="modal-header">
    <h3 id="modal-headline">${projects.portfolio[target].project}</h3>
    <div id="modal-close"><img src="./img/close.svg" alt="close"/></div>
    </div>
    <div id="modal-content">
    <p id="modal-description">${projects.portfolio[target].about.replace(/\n/g, '<br />')}</p>
    <div id="modal-slider"></div>
    </div>`;
    document.querySelector("#modal").innerHTML = output;

    let imgGallery = "";
    projects.portfolio[target].images.forEach(img => {
      imgGallery +=
        `<img src="${img.img}" alt="" class="slider-img"/>`
    });
    document.querySelector("#modal-slider").innerHTML = imgGallery;

    backdrop.addEventListener('click', closeModal);
    document.querySelector('#modal-close').addEventListener('click', closeModal);
  })
  .catch(err => console.log(err))
};

let closeModal = (e) => {
  const modal = document.querySelector("#modal");
  const backdrop = document.querySelector("#backdrop");
  const body = document.querySelector("body");

  modal.style.display = 'none';
  backdrop.style.display = 'none';
  body.style.overflow = 'initial';
}


// SHOW PORTFOLIO

// Fetch API
let showPortfolio = () => {
  fetch('db.json', {
    mode: 'no-cors'
  })
  .then(res => res.json())
  .then(projects => {
    let output = "";
    projects.portfolio.forEach(project => {
      output += 
      `<div class="wall-entry" data-toggle="modal" data-id="${projects.portfolio.indexOf(project)}">
        <img src="${project.images[0].img}" alt="${project.images[0].img}" class="wall-img"/>
        <div class="img-overlay">
          <h3>${project.project}</h3>
          <p>${project.about}</p>
        </div>
      </div>`;
    })
    document.querySelector("#test").innerHTML = output;
  })
  .then(output => {
    const portfolioImg = document.querySelectorAll(".wall-entry");
    portfolioImg.forEach(img => img.addEventListener('click', showModal))})
  .catch(err => console.log(err))
}
showPortfolio();

// XML Request
// function showPortfolio () {
//   var request = new XMLHttpRequest();
//   request.open('GET', 'http://localhost:3000/portfolio', true);
//   request.onload = function() {
//     if (this.status === 200) {
//       var projects = JSON.parse(this.responseText);
//       var wallEntry;
//       for (var project in projects) {
//         var wallEntry = document.createElement("div");                       
//         wallEntry.classList.add('wall-entry');

//         var wallImg = document.createElement("img");
//         wallImg.src = projects[project].images[0].img; 
//         wallImg.classList = "wall-img";

//         var wallOverlay = document.createElement("div");
//         wallOverlay.classList = 'img-overlay';

//         var headline = document.createElement("h3");
//         headline.innerHTML = projects[project].project;
//         wallOverlay.appendChild(headline);

//         var about = document.createElement("p");
//         about.innerHTML = projects[project].about;
//         wallOverlay.appendChild(about);

//         wallEntry.appendChild(wallImg);
//         wallEntry.appendChild(wallOverlay);
//         document.getElementById("test").appendChild(wallEntry); 
//       } 
//     }
//   }
//   request.send();
// }
// showPortfolio();

// window.onload(draw());

const accordionHeadline = document.querySelector("#accordion-headline");
const accordionContent = document.querySelector("#accordion");

accordionHeadline.addEventListener("click", function() {
  if (accordionContent.style.display === "block") {
    accordionContent.style.display = "none";
    accordionHeadline.innerHTML = "Impressum &dtrif;";
  } else {
    accordionContent.style.display = "block";
    accordionHeadline.innerHTML = "Impressum &utrif;";
  }
});