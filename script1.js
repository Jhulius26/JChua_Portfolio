const progressBar = document.getElementById('progressBar');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const cursorGlow = document.getElementById('cursorGlow');

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(window.scrollY / max) * 100}%`;
});

menuBtn?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

if (window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

const galleries = {
  documed: [
    {
      image: "images/documed-dashboard.png",
      title: "DocuMed Dashboard"
    },
    {
      image: "images/documed-patients.png",
      title: "Patient Records"
    },
    {
      image: "images/documed-reports.png",
      title: "Patient Reports"
    },
    {
      image: "images/documed-archive.png",
      title: "Patient Archive"
    },
    {
      image: "images/documed-medicinelist.png",
      title: "Medicine Management"
    },
    {
      image: "images/documed-medreport.png",
      title: "Medicine Reports"
    },
    {
      image: "images/documed-login.png",
      title: "Login Page"
    },
  ],

  trikego: [
    {
      image: "images/trikego-login.jpg",
      title: "TrikeGo Login"
    },
    {
      image: "images/trikego-booking.png",
      title: "In Progress"
    }
  ]
};

let currentGallery = [];
let currentIndex = 0;

function openGallery(project) {
  currentGallery = galleries[project];
  currentIndex = 0;

  document.getElementById("gallery").classList.add("active");

  showGalleryImage();
}

function closeGallery() {
  document.getElementById("gallery").classList.remove("active");
}

function showGalleryImage() {
  const item = currentGallery[currentIndex];

  document.getElementById("galleryImage").src = item.image;
  document.getElementById("galleryCaption").textContent = item.title;

  document.getElementById("galleryCurrent").textContent =
    currentIndex + 1;

  document.getElementById("galleryTotal").textContent =
    currentGallery.length;
}

function nextImage() {
  currentIndex++;

  if (currentIndex >= currentGallery.length) {
    currentIndex = 0;
  }

  showGalleryImage();
}

function previousImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = currentGallery.length - 1;
  }

  showGalleryImage();
}

document.addEventListener("keydown", function(e) {
  const gallery = document.getElementById("gallery");

  if (!gallery.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeGallery();
  }

  if (e.key === "ArrowRight") {
    nextImage();
  }

  if (e.key === "ArrowLeft") {
    previousImage();
  }
});