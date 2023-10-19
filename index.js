const openBtn = document.getElementById('open-btn');
const sendBtn = document.getElementById("send-mail");

openBtn.addEventListener('click', () => {
    alert('Sorry menu button currently not woking...')
});

function sendMail() {
    const nameInput = document.getElementById("name").value;
    const emailInput = document.getElementById("email").value;
    const messageInput = document.getElementById("message").value;

    if (nameInput.trim() === "" || emailInput.trim() === "" || messageInput.trim() === "") {
        alert("Please fill in all required fields.");
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
            alert("Message sent successfully");
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

