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
  dot.style.left = `${mx}px`;
  dot.style.top = `${my}px`;
});

function cursorLoop() {
  rx += (mx - rx) * 0.14;
  ry += (my - ry) * 0.14;
  ring.style.left = `${rx}px`;
  ring.style.top = `${ry}px`;
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

window.addEventListener("scroll", () => {
  const y = window.scrollY;
  document.querySelectorAll(".orb").forEach((orb, i) => {
    orb.style.transform = `translate3d(0, ${Math.sin(y * 0.002 + i) * 18}px, 0)`;
  });
});
