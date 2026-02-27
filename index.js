let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector("#theme-switch");
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");
const sendBtn = document.getElementById("send-email-btn");
const nullInputMessage = document.getElementById("invalid-input");
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.dot-nav a');
// var currentIndex = 0;
// var newIndex = 0;
// var enableAutoplay = true;



window.addEventListener('scroll', () => {

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });
});

navLinks.forEach((dot, index) => {
  dot.addEventListener('click', (e) => {
    e.preventDefault();

    sections[index].scrollIntoView({
      behavior: 'smooth'
    });

  });
});


window.addEventListener('scroll', () => {
    let images = document.querySelectorAll('.info-img');
    images.forEach(image => {
        if (image.getBoundingClientRect().top < window.innerHeight) {
            image.classList.add('add-visual');
            
        }
        
    });
})

window.addEventListener('scroll', () => {
    let text = document.querySelectorAll('.text');
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


window.addEventListener('scroll', () => {
    document.querySelector('.logo-name').classList.toggle('logo-name1', window.scrollY > 0);
    document.querySelector('.logo-fixed').classList.toggle('fixed1', window.scrollY > 0);
});


function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const name = "BRIANMUNDU01";
const fontSize = 16;
const columns = () => Math.floor(canvas.width / fontSize);

let drops = Array(columns()).fill(0);

let letterIndex = Array(columns()).fill(0);

function draw() {
  ctx.fillStyle = "rgba(11, 14, 20, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0, 255, 180, 0.35)";
  ctx.font = `${fontSize}px monospace`;

  drops.forEach((y, i) => {


    const text = name[letterIndex[i] % name.length];

    ctx.fillText(text, i * fontSize, y * fontSize);

    if (y * fontSize > canvas.height && Math.random() > 0.98) {
      drops[i] = 0;
      letterIndex[i] = 0;
    }

    drops[i]++;
    letterIndex[i]++;
  });
}

setInterval(draw, 150);


const enableDarkMode = () => {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");

}

const disableDarkMode = () => {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", null);

}

if (darkMode === "enabled") {
    enableDarkMode();
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");
    if (darkMode !== "enabled") {
        enableDarkMode();
    }else{
        disableDarkMode();
    }
})

