


// NAVBAR

// let header = document.querySelector("header");
// let logo = document.getElementById("logo");
// let target = document.getElementById("main-img");

// window.addEventListener("load", function(event) {
//   createObserver();
// }, false);

// function createObserver() {
//   let options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 1
//   }  
//   let observer = new IntersectionObserver(handler, options);
//   observer.observe(target);  
// }  

// function handler(mainImg, observer) {
//   if (mainImg.isIntersecting) {
//     logo.classList.add('fade-in');
//     observer.unobserve(mainImg.target);
//   } else {
//     logo.classList.remove('fade-in');
//     logo.classList.add('fade-out');   
//   }
// }


// const experienceList = document.querySelectorAll(".experience-entry");

// window.addEventListener("load", function(event) {
//   createObserver();
// }, false);

// function createObserver() {
//   let options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.1
//   }  
//   let observer = new IntersectionObserver(handler, options);
//   experienceList.forEach(experience => observer.observe(experience));  
// }  

// function handler(entries, observer) {
//   entries.forEach(function(entry) {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('slide-in');
//     } else {
//       entry.target.classList.remove('slide-in');
//     }
//   });
// }




// var options = {
//   root: document.querySelector('#about'),
//   rootMargin: '0px',
//   threshold: 0.2
// }

// var observer = new IntersectionObserver(callback, options);


// SHOW RESUME

// const jobs = document.querySelectorAll('.job');
// // function getPosition( el ) {
// //   var x = 0;
// //   var y = 0;
// //   while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
// //   x += el.offsetLeft - el.scrollLeft;
// //   y += el.offsetTop - el.scrollTop;
// //   el = el.offsetParent;
// //   }
// //   console.log(y);
// //   console.log(x);
// //   return { top: y, left: x };
// // }
// // getPosition(jobs[0]);
// function getPosition( el ) {
//   var x = 0;
//   var y = 0;
//   while( el && !isNaN( el.offsetTop ) ) {
//   y += el.offsetTop - el.scrollTop;
//   el = el.offsetParent;
//   }
//   console.log(y);
// }
// getPosition(jobs[1]);

// Fetch API
// let showResume = () => {

//   const jobs = document.querySelectorAll(".job");



//   fetch('http://localhost:3000/experience')
//   .then(res => res.json())
//   .then(experiences => {
//     let output = "";
//     experiences.forEach(experience => {
//       output += 
//       `<div class="wall-entry" data-toggle="modal" data-id="${experiences.indexOf(experience)}">
//         <img src="${experience.images[0].img}" alt="${experience.images[0].img}" class="wall-img"/>
//         <div class="img-overlay">
//           <h3>${experience.experience}</h3>
//           <p>${experience.about}</p>
//         </div>
//       </div>`;
//     })
//     document.querySelector("#test").innerHTML = output;
//   })
//   .then(output => {
//     const portfolioImg = document.querySelectorAll(".wall-entry");
//     portfolioImg.forEach(img => img.addEventListener('click', showModal))})
//   .catch(err => console.log(err))
// }
// showResume();


// CANVAS FOR RESUME

// let draw = () => {
//   const container = document.querySelector("#experience");
//   const canvas = document.querySelector("#myCanvas");
//   const ctx = canvas.getContext("2d");
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   // line
//   ctx.beginPath();
//   ctx.moveTo(ctx.canvas.width / 3 , 0);
//   ctx.lineTo(ctx.canvas.width / 3 , container.offsetHeight);
//   ctx.strokeStyle = '#de88a5';
//   ctx.stroke();

//   // circles
//   ctx.beginPath();
//   const x = ctx.canvas.width / 3; // x coordinate
//   const y = 10; // y coordinate
//   const radius = 10; // Arc radius
//   const startAngle = 0; // Starting point on circle
//   const endAngle = Math.PI * 2; // End point on circle
//   const anticlockwise = true; // clockwise or anticlockwise
//   ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
//   ctx.fillStyle = '#de88a5';
//   ctx.fill();
// }


// SHOW / HIDE MODAL FOR PORTFOLIO

let showModal = (e) => {
  const target = e.currentTarget.dataset.id;

  fetch('http://localhost:3000/portfolio')
  .then(res => res.json())
  .then(projects => {  

    console.log(projects[0]);

    const modal = document.querySelector("#modal");
    const backdrop = document.querySelector("#backdrop");
    const body = document.querySelector("body");

    modal.style.display = 'block';
    backdrop.style.display = 'block';
    body.style.overflow = 'hidden';

    let output =
    `<div id="modal-header">
    <h3 id="modal-headline">${projects[target].project}</h3>
    <div id="modal-close"><img src="./img/close.svg" alt="close"/></div>
    </div>
    <div id="modal-content">
    <p id="modal-description">${projects[target].about.replace(/\n/g, '<br />')}</p>
    <div id="modal-slider"></div>
    </div>`;
    document.querySelector("#modal").innerHTML = output;

    let imgGallery = "";
    projects[target].images.forEach(img => {
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
  fetch('http://localhost:3000/portfolio')
  .then(res => res.json())
  .then(projects => {
    let output = "";
    projects.forEach(project => {
      output += 
      `<div class="wall-entry" data-toggle="modal" data-id="${projects.indexOf(project)}">
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