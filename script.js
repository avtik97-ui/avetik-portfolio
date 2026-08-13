const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el, i) => {
  if (el.closest(".hero")) el.style.transitionDelay = `${Math.min(i * 70, 280)}ms`;
  observer.observe(el);
});

const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
let mx = innerWidth / 2, my = innerHeight / 2;
let rx = mx, ry = my;

window.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (dot) {
    dot.style.left = `${mx}px`;
    dot.style.top = `${my}px`;
  }
});

function cursorLoop() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  if (ring) {
    ring.style.left = `${rx}px`;
    ring.style.top = `${ry}px`;
  }
  requestAnimationFrame(cursorLoop);
}
cursorLoop();

document.querySelectorAll("a, button, .project").forEach((el) => {
  el.addEventListener("mouseenter", () => document.body.classList.add("is-hovering"));
  el.addEventListener("mouseleave", () => document.body.classList.remove("is-hovering"));
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (e) => e.preventDefault());
});

const copyBtn = document.getElementById("copyEmail");
const copyLabel = document.getElementById("copyLabel");

if (copyBtn && copyLabel) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    copyLabel.textContent = "COPIED!";
    setTimeout(() => copyLabel.textContent = "CLICK TO COPY", 1600);
  });
}

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  document.querySelectorAll(".orb").forEach((orb, i) => {
    orb.style.transform = `translate3d(0, ${Math.sin(y * 0.002 + i) * 18}px, 0)`;
  });
});

// Interactive hero portrait — inspired by the spatial, mouse-reactive feeling of jellys.space.
const hero = document.querySelector(".hero");
if (hero) {
  const heroStyles = document.createElement("link");
  heroStyles.rel = "stylesheet";
  heroStyles.href = "hero.css";
  document.head.appendChild(heroStyles);

  const stage = document.createElement("div");
  stage.className = "hero-portrait-stage";
  stage.innerHTML = `
    <div class="hero-portrait-glow"></div>
    <img class="hero-portrait" src="assets/hero-face.webp" alt="" aria-hidden="true" draggable="false">
  `;
  hero.prepend(stage);

  const portrait = stage.querySelector(".hero-portrait");
  const glow = stage.querySelector(".hero-portrait-glow");
  let tx = 0, ty = 0, cx = 0, cy = 0;

  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
  });

  hero.addEventListener("mouseleave", () => {
    tx = 0;
    ty = 0;
  });

  function animatePortrait() {
    cx += (tx - cx) * 0.055;
    cy += (ty - cy) * 0.055;

    const moveX = cx * 28;
    const moveY = cy * 18;
    const rotateY = cx * 5.5;
    const rotateX = cy * -4.5;

    portrait.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    glow.style.transform = `translate3d(${cx * -18}px, ${cy * -12}px, 0) scale(${1 + Math.abs(cx) * 0.035})`;

    requestAnimationFrame(animatePortrait);
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    animatePortrait();
  }
}
