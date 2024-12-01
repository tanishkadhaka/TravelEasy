'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const destinations = data.site.sections.destinations;
    const destinationSection = document.getElementById('destination'); // Replace with correct ID

    destinations.forEach(dest => {
      const destCard = `
        <div class="destination-card">
          <img src="${dest.image}" alt="${dest.name}">
          <h3>${dest.name}</h3>
          <p>${dest.description}</p>
        </div>
      `;
      destinationSection.innerHTML += destCard;
    });
  });


  // Handle subscription form submission
document.getElementById('subscribe-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const emailField = event.target.elements.email;
  const email = emailField.value;

  try {
    const response = await fetch('http://localhost:5000/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const result = await response.json();
    alert(result.message);

    if (response.ok) {
      emailField.value = ''; // Clear the input field on success
    }
  } catch (err) {
    alert('An error occurred. Please try again later.');
  }
});
