const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdownToggles = document.querySelectorAll('.dropbtn');

// Toggle the mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Toggle the dropdown menu on click
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link behavior
        const dropdownContent = toggle.nextElementSibling; // Get the dropdown content
        dropdownContent.classList.toggle('active'); // Toggle visibility of the dropdown

        // Close other dropdowns (optional, for better UX)
        dropdownToggles.forEach(otherToggle => {
            if (otherToggle !== toggle) {
                const otherDropdown = otherToggle.nextElementSibling;
                otherDropdown.classList.remove('active');
            }
        });
    });
});
// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    dropdownToggles.forEach(toggle => {
        const dropdownContent = toggle.nextElementSibling;
        if (!toggle.contains(e.target) && !dropdownContent.contains(e.target)) {
            dropdownContent.classList.remove('active');
        }
    });
});



const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const images = [
    "https://www.briskdigitech.com/images/logo.png",
    "https://assets.travclan.com/unsafe/0x100/smart/https://s3.ap-south-1.amazonaws.com/com.travclan.b2b2c/logo/4268/1723206538.590756/0.8067609391250219/Untitled_design_19.png",
    "https://www.thewedcafe.com/wp-content/uploads/2017/07/Logo-Red.svg",
    "https://www.iid.org.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fiid-logo.c76f2eba.png&w=1920&q=75",
    "https://thebrisk.co/wp-content/uploads/2024/08/The-Bricks-Logo.webp",
    "../images/onepatnerlogo.png",
   
];

let visibleImages = 5; // Adjustable: Number of images visible at a time
let currentIndex = 0;

// Populate the carousel with images
function populateCarousel() {
    images.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        carousel.appendChild(img);
    });

    // Duplicate images for seamless looping
    for (let i = 0; i < visibleImages; i++) {
        const cloneFirst = carousel.children[i].cloneNode(true);
        const cloneLast = carousel.children[images.length - 1 - i].cloneNode(true);
        carousel.appendChild(cloneFirst);
        carousel.prepend(cloneLast);
    }

    // Adjust carousel width based on visible images
    const imageWidth = 120 / visibleImages;
    Array.from(carousel.children).forEach((img) => {
        img.style.width = `${imageWidth}%`;
    });

    // Start at the original first image
    const startIndex = visibleImages;
    carousel.style.transform = `translateX(-${startIndex * imageWidth}%)`;
    currentIndex = startIndex;
}

// Update the carousel position
function updateCarousel() {
    const imageWidth = 100 / visibleImages;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}%)`;

    // Handle infinite loop
    carousel.addEventListener('transitionend', () => {
        if (currentIndex === 0) {
            currentIndex = images.length;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
        } else if (currentIndex === images.length + visibleImages) {
            currentIndex = visibleImages;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(-${currentIndex * imageWidth}%)`;
        }
    });
}

// Show next set of images
function showNext() {
    currentIndex++;
    updateCarousel();
}

// Show previous set of images
function showPrev() {
    currentIndex--;
    updateCarousel();
}

// Event listeners
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Initialize
populateCarousel();



// JavaScript for handling the visibility of the buttons
document.getElementById("join-button").addEventListener("click", function() {
    const buttonContainer = document.querySelector(".button-container");
    buttonContainer.style.display = (buttonContainer.style.display === "flex") ? "none" : "flex";
});


const videoElements = document.querySelectorAll(".video-container .video");
let currentVideoIndex = 0;

function updateActiveVideo() {
    videoElements.forEach((video, index) => {
        video.classList.toggle("active", index === currentVideoIndex);
    });
}

function prevVideo() {
    currentVideoIndex = (currentVideoIndex - 1 + videoElements.length) % videoElements.length;
    updateActiveVideo();
}

function nextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoElements.length;
    updateActiveVideo();
}

// Initialize first video as active
updateActiveVideo();
