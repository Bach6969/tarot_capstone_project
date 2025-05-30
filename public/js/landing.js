const tips = [
  {
    title: "#1: Take a deep breath!",
    description: "Before you pick the cards, take a few deep breaths.\nTry to relax your body and quiet your mind.\nAllow your thoughts to come and go for a while without holding on to them."
  },
  {
    title: "#2: Focus on your intention",
    description: "Before starting, set a clear intention or question in your mind to guide your reading."
  },
  {
    title: "#3: Clear your space",
    description: "Make sure your reading area is free from distractions and clutter to allow for clear insights."
  },
  {
    title: "#4: Trust your intuition",
    description: "Listen to your inner voice and let it guide your interpretations of the cards."
  },
  {
    title: "#5: Be open to surprises",
    description: "Sometimes readings may reveal unexpected messages. Stay open to the lessons they bring."
  },
  {
    title: "#6: Take notes",
    description: "Write down your impressions during or after the reading to reflect and track your growth."
  },
  {
    title: "#7: Stay grounded",
    description: "Keep your feet on the ground and remain centered throughout the reading process."
  },
  {
    title: "#8: Practice regularly",
    description: "The more you practice, the more confident and intuitive your readings will become."
  },
  {
    title: "#9: Have fun!",
    description: "Enjoy the journey and remember that readings are a tool for self-discovery and growth."
  }
];

const cardTitle = document.getElementById('tip-title');
const cardDescription = document.getElementById('tip-description');
const paginationContainer = document.getElementById('pagination');

let currentIndex = 0;

// Populate pagination dots
tips.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('pagination-dot');
  if (index === currentIndex) dot.classList.add('active');
  dot.addEventListener('click', () => showTip(index));
  paginationContainer.appendChild(dot);
});

// Display initial tip
showTip(currentIndex);

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + tips.length) % tips.length;
  showTip(currentIndex);
});

document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % tips.length;
  showTip(currentIndex);
});

function showTip(index) {
  cardTitle.textContent = tips[index].title;
  cardDescription.textContent = tips[index].description;

  document.querySelectorAll('.pagination-dot').forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}
