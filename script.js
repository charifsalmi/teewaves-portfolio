// Smooth scrolling
document.querySelectorAll(".nav-item").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });

    // Remove active class from all nav items
    document
      .querySelectorAll(".nav-item")
      .forEach((item) => item.classList.remove("active"));
    // Add active class to the clicked nav item
    this.classList.add("active");
  });
});

///////////////////////////////////////////////////////////

// Select the back-to-top button and the designs section
const backToTopButton = document.querySelector(".back-to-top");
const designsSection = document.querySelector("#designs");

// Set an offset (e.g., 100px before the bottom of the designs section)
const offset = 2300;

// Function to show or hide the button based on scroll position
window.addEventListener("scroll", () => {
  const designsSectionBottom = designsSection.getBoundingClientRect().bottom;

  // Show the button if scrolled past the bottom of the designs section plus the offset
  if (window.scrollY > designsSectionBottom + offset) {
    backToTopButton.style.display = "block";
  } else {
    // Hide the button when scrolling up and approaching the bottom of the designs section minus the offset
    backToTopButton.style.display = "none";
  }
});

// Smooth scrolling to the top when the button is clicked
backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  // Create lightbox overlay
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  document.body.appendChild(lightbox);

  // Get all design images
  const images = Array.from(document.querySelectorAll(".card img"));
  let currentIndex = -1;

  // Function to open lightbox with an image
  function openLightbox(index) {
    if (index < 0 || index >= images.length) return;
    currentIndex = index;

    const img = document.createElement("img");
    img.src = images[currentIndex].src;

    // Clear previous content and add image
    lightbox.innerHTML = "";
    lightbox.appendChild(img);

    // Add arrows for navigation
    const prevArrow = document.createElement("div");
    prevArrow.className = "arrow prev";
    prevArrow.innerHTML = "&#10094;"; // Left arrow

    const nextArrow = document.createElement("div");
    nextArrow.className = "arrow next";
    nextArrow.innerHTML = "&#10095;"; // Right arrow

    lightbox.appendChild(prevArrow);
    lightbox.appendChild(nextArrow);

    lightbox.classList.add("active");

    // Add event listeners for arrow clicks
    prevArrow.addEventListener("click", () => navigateLightbox(-1));
    nextArrow.addEventListener("click", () => navigateLightbox(1));
  }

  // Function to navigate lightbox
  function navigateLightbox(direction) {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1; // Loop to last image
    if (newIndex >= images.length) newIndex = 0; // Loop to first image
    openLightbox(newIndex);
  }

  // Function to close lightbox
  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.addEventListener(
      "transitionend",
      () => {
        lightbox.innerHTML = ""; // Clear image and arrows
      },
      { once: true }
    );
  }

  // Event listener for image click to open lightbox
  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  // Click event on lightbox overlay to close it
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard events for navigation and closing
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      navigateLightbox(1);
    } else if (e.key === "ArrowLeft") {
      navigateLightbox(-1);
    }
  });
});
