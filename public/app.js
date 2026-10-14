document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("header nav");
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle && nav) menuToggle.addEventListener("click", () => { const opened = nav.classList.toggle("mobile-open"); menuToggle.setAttribute("aria-expanded", String(opened)); });
  document.querySelectorAll(".dropdown-toggle").forEach(button => button.addEventListener("click", () => button.parentElement.classList.toggle("open")));
  if (nav && !nav.querySelector(".crud-dropdown")) {
    const wrap = document.createElement("label"); wrap.className = "crud-dropdown"; wrap.setAttribute("aria-label", "CRUD operations");
    const select = document.createElement("select"); select.setAttribute("aria-label", "Go to a CRUD operation");
    select.innerHTML = '<option value="">CRUD Operations ▾</option><option value="list.html">Read · All Events</option><option value="listOne.html">Search · One Event</option><option value="insert.html">Create · Add Event</option><option value="update.html">Update · Edit Event</option><option value="delete.html">Delete · Remove Event</option>';
    select.addEventListener("change", () => { if (select.value) location.href = select.value; }); wrap.appendChild(select); nav.appendChild(wrap);
  }
  if (nav) nav.querySelectorAll("a").forEach(a => { if (a.href === location.href) { a.classList.add("active"); a.setAttribute("aria-current", "page"); } });
  const cards = document.querySelectorAll(".card, .grid article");
  if ("IntersectionObserver" in window) { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), {threshold:.08}); cards.forEach(card => { card.classList.add("reveal"); observer.observe(card); }); }
  document.querySelectorAll("img").forEach(img => img.addEventListener("error", () => { img.style.background = "linear-gradient(120deg,#0c2342,#1c82b9)"; img.style.minHeight = "130px"; img.alt = img.alt || "College event"; }, {once:true}));
});
