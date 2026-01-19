// ====== قائمة الجوال (Menu Toggle) ======
const nav = document.querySelector("nav");
const menuBtn = document.createElement("button");
menuBtn.classList.add("menu-btn");
menuBtn.innerHTML = "☰";
document.querySelector("header").appendChild(menuBtn);

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// ====== وضع ليلي (Dark Mode) ======
const darkBtn = document.createElement("button");
darkBtn.classList.add("dark-btn");
darkBtn.innerHTML = "🌙";
document.querySelector("header").appendChild(darkBtn);

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkBtn.innerHTML = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// ====== سلايدر الصور (Gallery Slider) ======
const photos = document.querySelectorAll(".photo");
let current = 0;

function showPhoto(index) {
  photos.forEach((p, i) => {
    p.style.transform = `translateX(${(i - index) * 110}%)`;
    p.style.opacity = i === index ? "1" : "0.4";
  });
}

showPhoto(current);

setInterval(() => {
  current = (current + 1) % photos.length;
  showPhoto(current);
}, 2500);

// ====== زر رجوع للأعلى ======
const topBtn = document.createElement("button");
topBtn.classList.add("top-btn");
topBtn.innerHTML = "⬆️";
document.body.appendChild(topBtn);

topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
