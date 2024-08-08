const closeBtn = document.getElementById('close-btn');
const openBtn = document.getElementById('open-btn');
const sendBtn = document.getElementById("send-mail");
const nullInputMessage = document.getElementById("invalid-input");
const menu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-links');
var currentIndex = 0;
var newIndex = 0;
var enableAutoplay = true;
// var autoplayInterval = 4000;
// var autoplayTimer = null;


openBtn.addEventListener('click', () => {
    menu.style.display = "block";
    closeBtn.style.display = "block";
    openBtn.style.display = "none";
});
function closeMenu() {
    menu.style.display = "none";
    closeBtn.style.display = "none";
    openBtn.style.display = "block";
}

closeBtn.addEventListener('click', () => {
    closeMenu();
});

for (let i = 0; i < navLinks.length; i++) {
navLinks[i].addEventListener('click', () => {
    closeMenu();
})
};
window.addEventListener('scroll', function() {
    closeMenu();
});


window.addEventListener('scroll', () => {
    // let infoImg = document.querySelector('.info-img');
    let practiceProjects = document.querySelector('.practice-projects');
    let elements = document.querySelectorAll('.more');
    elements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('add-visual');
            setTimeout(() => {
                practiceProjects.classList.add('add-visual')
            }, 3000)
        }
        
    });
});

window.addEventListener('scroll', () => {
    let images = document.querySelectorAll('.info-img');
    console.log(images);
    images.forEach(image => {
        if (image.getBoundingClientRect().top < window.innerHeight) {
            image.classList.add('add-visual');
            
        }
        
    });
})

window.addEventListener('scroll', () => {
    let text = document.querySelectorAll('.text');
    console.log(text);
    text.forEach(char => {
        if (char.getBoundingClientRect().top < window.innerHeight) {
            char.classList.add('text-transform');
            
        }
        
    });
})



//emailjs function......working with the html form
function sendMail() {
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;
    const messageInput = document.getElementById("message").value;

    if (nameInput.trim() === "" || emailInput.trim() === "" || messageInput.trim() === "") {
        nullInputMessage.innerHTML ="Please fill in all required fields!"
        setTimeout(() => {
            nullInputMessage.innerHTML ="" 
        }, 7000);
        return;
    }

    var params = {
        name: nameInput,
        email: emailInput,
        message: messageInput,
    };

    const serviceID = "service_d5qd7lj";
    const templateID = "template_admo8wh";

    emailjs
        .send(serviceID, templateID, params)
        .then(res => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            console.log(res);
            nullInputMessage.innerHTML = "Mail sent successfully";
            nullInputMessage.style.color = "#98ca56"
            setTimeout(function() {
                nullInputMessage.innerHTML = "";
                nullInputMessage.style.color = "red"
            }, 5000);
        })
        .catch(err => console.log(err));
}

sendBtn.addEventListener('click', function(event) {
    event.preventDefault();
    sendMail();
});

//controlling the navBar log section

window.addEventListener('scroll', () => {
    document.querySelector('.logo-name').classList.toggle('logo-name1', window.scrollY > 0);
    document.querySelector('.logo-fixed').classList.toggle('fixed1', window.scrollY > 0);
});

//carousel js....



var slideElements = document.getElementsByClassName('slider_slide');
console.log(slideElements);
var slidesLength = slideElements.length;
var paginationElement = document.getElementsByClassName('slider_pagination')[0];
var navElements = document.getElementsByClassName("slider_nav");

function navigateSlider() {
   if (enableAutoplay) {
      Autoplay.reset();
   }
   if (newIndex === -1) {
      newIndex = slidesLength - 1;
   }
   else if (newIndex === slidesLength) {
      newIndex = 0;
   }
   var currentVideo = slideElements[currentIndex].querySelector('video');
   if(currentVideo) {
      currentVideo.pause();
      currentVideo.currentTime = 0;
   }

   paginationElement.childNodes[currentIndex].classList.remove('slider_pagination_btn--sel');
   paginationElement.childNodes[newIndex].classList.add('slider_pagination_btn--sel');

   slideElements[newIndex].style.display = "block";
   slideElements[currentIndex].style.display = "none";

   //video code starts hee!..
var newVideo = slideElements[newIndex].querySelector('video');
if(newVideo) {
   newVideo.play();
}

//ends here..
   currentIndex = newIndex;
}



navElements[0].addEventListener('click', function() {
   newIndex--;
   navigateSlider();
});

navElements[1].addEventListener('click', function() {
   newIndex++;
   navigateSlider();
});
// paginationElement...
var paginationHTML = [];
for (var i = 0; i < slidesLength; i++) {
   paginationHTML.push('<button class="slider_pagination_btn" data-index="' + i + '"></button>');
}
paginationElement.innerHTML = paginationHTML.join('');

paginationElement.addEventListener('click', function(e) {
   var target = e.target;
   if (target.classList.contains("slider_pagination_btn")) {
      newIndex = Number(target.getAttribute("data-index"));
      navigateSlider();
   }
});
// ===Autoplay===
// function startTimer() {
//    autoplayTimer = setInterval(function() {
//       newIndex++;
//       navigateSlider();
//    }, autoplayInterval);
// }

var Autoplay = {
   timerId: null,
   interval: 4000,

   start: function() {
      this.timerId = setInterval(function() {
         newIndex++;
         navigateSlider();
      }, this.interval);
   },

   stop: function() {
      clearInterval(this.timerId);
      this.timerId = null;
  },

   reset: function() {
      this.stop();
      this.start();
   }
}

if (enableAutoplay) {
   Autoplay.start();
}
// event listeners to videos for hover control
for (var i = 0; i < slidesLength; i++) {
   var video = slideElements[i].querySelector('video');
   if (video) {
       video.addEventListener('mouseenter', function () {
           console.log('Mouse entered video, stopping autoplay');
           Autoplay.stop(); // Stop autoplay on hover
       });
       video.addEventListener('mouseleave', function () {
           console.log('Mouse left video, starting autoplay');
           if (enableAutoplay) {
               Autoplay.start(); // Resume autoplay when not hovering
           }
       });
       // Add touch events for mobile compatibility
       video.addEventListener('touchstart', function () {
           console.log('Touch started on video, stopping autoplay');
           Autoplay.stop(); // Stop autoplay on touch start
       });
       video.addEventListener('touchend', function () {
           console.log('Touch ended on video, starting autoplay');
           if (enableAutoplay) {
               Autoplay.start(); // Resume autoplay when touch ends
           }
       });
   }
}

function scoll_stop() {
corousel_option = document.getElementById('corousel-option');
let isScrolling = null;

window.addEventListener('scroll', function (event) {
    if(isScrolling !== null) {
        clearTimeout(isScrolling);
    }

     isScrolling = setTimeout(function() {
        const rect = corousel_option.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight
        if(isVisible)  {
        corousel_option.style.visibility = 'visible'
        corousel_option.innerHTML = 'Hover over current video for full demo.'
        corousel_option.style.opacity = 1;
        console.log('Scrolling has stopped.');

        setTimeout(function() {
            corousel_option.style.visibility = 'hidden';
        }, 2000);
    }
    }, 150);
}, false);

}
scoll_stop()
