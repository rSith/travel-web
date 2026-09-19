// 1. Open and close the menu on small screens
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// Close the menu after a link is clicked
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// 2. Highlight the nav link of the section you are reading
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id,
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);

sections.forEach((section) => observer.observe(section));

// 3. "Tell me a fact" button shows a different fact each time
const facts = [
  "The train from Colombo runs so close to the sea that you can see the waves from your seat.",
  "Ambalangoda masks are carved from light wood and painted by hand.",
  "Sanni masks are used in a healing ritual, where each mask stands for a different sickness.",
  "Turtle hatcheries near the town protect eggs and baby turtles until they can go to the sea.",
  "Fishermen bring in their catch early in the morning, so it is the best time to visit the beach.",
  "The Madu River is a short drive north and has mangrove forests and small islands.",
];

const factBtn = document.getElementById("factBtn");
const factText = document.getElementById("factText");
let lastIndex = -1;

factBtn.addEventListener("click", () => {
  let index;
  // Pick a random fact, but never the same one twice in a row
  do {
    index = Math.floor(Math.random() * facts.length);
  } while (index === lastIndex);

  lastIndex = index;
  factText.textContent = facts[index];
  factBtn.textContent = "Another fact";
});

// 4. Put the current year in the footer
document.getElementById("year").textContent = new Date().getFullYear();
