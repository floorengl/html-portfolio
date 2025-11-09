document.getElementById('button1').addEventListener('click', () => {
  window.location.href =
    'mailto:you@example.com?subject=Project%20inquiry&body=Hi%20Floor%2C%0A%0A';
});

document.getElementById('button2').addEventListener('click', () => {
  document.querySelector('#works').scrollIntoView({ behavior: 'smooth' });
});




// Reveal-on-scroll (toggle) — tiny and robust
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // If you want it to animate only once, un-comment the next line:
        // observer.unobserve(entry.target);
      } else {
        // Remove to hide again when you scroll away (comment out if you prefer once)
        entry.target.classList.remove('in-view');
      }
    });
  },
  {
    root: null,            // viewport
    threshold: 0.2,        // fire when 20% is visible
    rootMargin: "0px 0px -10% 0px" // start a bit earlier as it enters
  }
);

// Observe every element you want to reveal
document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));


// --- WORKS: hover image preview --------------------------------------------
function initWorkPreview() {
  const preview = document.querySelector('.works__preview');
  if (!preview) return;

  const items = document.querySelectorAll('.work');
  if (!items.length) return;

  items.forEach(item => {
    const show = () => {
      const src = item.dataset.img;
      if (!src) return;
      preview.style.backgroundImage = `url("${src}")`;
      preview.classList.add('show');
    };
    const hide = () => preview.classList.remove('show');

    // mouse
    item.addEventListener('mouseenter', show);
    item.addEventListener('mouseleave', hide);

    // keyboard accessibility
    item.addEventListener('focus', show);
    item.addEventListener('blur', hide);
  });

  // Optional: hide the preview when the list leaves the viewport
  const list = document.querySelector('.works__list');
  if (list) {
    const hideObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) preview.classList.remove('show');
      },
      { threshold: 0 }
    );
    hideObserver.observe(list);
  }
}

// Run after the DOM is ready (safe whether your script is in <head> or bottom)
document.addEventListener('DOMContentLoaded', initWorkPreview);




// For the clock time!
const el = document.getElementById('clock');

  function renderTime(){
    const d = new Date();                 // user's device time
    let h = d.getHours();
    const m = String(d.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'AM' : 'PM';   // swap if you prefer PM for >=12
    h = h % 12 || 12;                     // 0 -> 12
    el.textContent = `${h}:${m} ${ampm}`;
  }

  // update exactly on the minute
  function startClock(){
    renderTime();
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    setTimeout(() => {
      renderTime();
      setInterval(renderTime, 60000);     // every minute
    }, msToNextMinute);
  }

  startClock();



  // Start/stop marquee animation when in viewport
document.addEventListener('DOMContentLoaded', () => {
  const marquee = document.querySelector('.marquee');
  if (!marquee) return;

  const io = new IntersectionObserver(([entry]) => {
    marquee.classList.toggle('run', entry.isIntersecting);
  }, { threshold: 0 });

  io.observe(marquee);
});
