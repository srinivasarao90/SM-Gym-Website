document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;

  // Function to show the current slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.style.display = "block";
        slide.style.opacity = 1;
        slide.style.transition = "opacity 0.8s ease-in-out";
      } else {
        slide.style.display = "none";
        slide.style.opacity = 0;
      }
    });
  }

  // Function to move slides manually
  function moveSlide(step) {
    slideIndex = (slideIndex + step + totalSlides) % totalSlides; // Wrap around
    showSlide(slideIndex);
  }

  // Automatic Slide Function
  function autoSlide() {
    slideIndex = (slideIndex + 1) % totalSlides; // Increment with wrap around
    showSlide(slideIndex);
  }

  // Initialize the carousel
  showSlide(slideIndex);

  // Set up event listeners for navigation buttons
  document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
  document.querySelector(".next").addEventListener("click", () => moveSlide(1));

  // Start the automatic slideshow
  setInterval(autoSlide, 3000); // 3 seconds per slide

  // FAQ Section (Optional: Remove if not needed)
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle("active");
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });
    });
  });
});
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("MongoDB connection error:", error));

