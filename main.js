(function () {
    "use strict";

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });
        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const navigationLinks = Array.from(document.querySelectorAll(".nav-links a"));
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navigationLinks.forEach(function (link) {
                    link.classList.toggle("active", link.getAttribute("href") === "#".concat(entry.target.id) || link.getAttribute("href") === "/home#".concat(entry.target.id));
                });
            });
        }, { rootMargin: "-35% 0px -55% 0px" });
        sections.forEach(function (section) { observer.observe(section); });
    }

    document.querySelectorAll(".accordion-header").forEach(function (button) {
        button.addEventListener("click", function () {
            const content = button.parentElement.nextElementSibling;
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            content.hidden = expanded;
            button.querySelector("span").textContent = expanded ? "+" : "−";
        });
    });

    const overlay = document.getElementById("search-overlay");
    const searchInput = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    const searchData = [
        ["About the Hackathon", "Learn about Equinox 2027", "#about-hackathon"], ["Challenge Tracks", "Explore the five tracks", "#challenges"],
        ["How It Works", "Follow the event journey", "#how-it-works"], ["Partners and Sponsors", "Meet the event network", "#partners"],
        ["Event Schedule", "View provisional milestones", "#schedule"], ["About the Organisers", "Meet Velocity, Horizon IoT Club, and IPO", "#about-us"],
        ["Registration", "Learn how to register", "#registration"], ["FAQs", "Find answers to common questions", "#faqs"],
        ["Contact", "Get in touch with the organisers", "#contact"], ["Quantum University", "Host institution", "#partners"],
        ["Velocity", "Gaming and Game Development Club", "/clubs/velocity"], ["Horizon IoT Club", "IoT and connected technologies", "/clubs/horizon"], ["IPO", "International Partnership Office", "/clubs/ipo"]
    ];
    function renderResults(query) {
        const matches = searchData.filter(function (item) { return item.join(" ").toLowerCase().includes(query.toLowerCase()); });
        results.innerHTML = matches.length ? matches.map(function (item) { return '<a class="search-result-item" href="' + item[2] + '"><strong>' + item[0] + '</strong><span>' + item[1] + '</span></a>'; }).join("") : '<p class="no-results">No matching sections found.</p>';
    }
    function openSearch() { overlay.hidden = false; searchInput.value = ""; renderResults(""); searchInput.focus(); }
    function closeSearch() { overlay.hidden = true; }
    document.getElementById("search-btn")?.addEventListener("click", openSearch);
    document.getElementById("close-search")?.addEventListener("click", closeSearch);
    document.getElementById("clear-search")?.addEventListener("click", function () { searchInput.value = ""; renderResults(""); searchInput.focus(); });
    searchInput?.addEventListener("input", function () { renderResults(searchInput.value); });
    results?.addEventListener("click", closeSearch);
    overlay?.addEventListener("click", function (event) { if (event.target === overlay) closeSearch(); });
    document.addEventListener("keydown", function (event) { if (event.key === "Escape" && overlay && !overlay.hidden) closeSearch(); });

    // EQUINOX 2027 live countdown (24 Feb 2027, 00:00 IST; update time when confirmed).
    const countdown = document.getElementById("countdown");
    if (countdown) {
        const eventStart = new Date("2027-02-24T00:00:00+05:30").getTime();
        const units = {
            days: document.getElementById("countdown-days"),
            hours: document.getElementById("countdown-hours"),
            minutes: document.getElementById("countdown-minutes"),
            seconds: document.getElementById("countdown-seconds")
        };
        const heading = document.getElementById("countdown-title");
        function updateCountdown() {
            const remaining = eventStart - Date.now();
            if (remaining <= 0) {
                units.days.textContent = "00";
                units.hours.textContent = "00";
                units.minutes.textContent = "00";
                units.seconds.textContent = "00";
                if (heading) heading.innerHTML = 'EQUINOX 2027 <span>starts today!</span>';
                return false;
            }
            units.days.textContent = String(Math.floor(remaining / 86400000)).padStart(2, "0");
            units.hours.textContent = String(Math.floor((remaining % 86400000) / 3600000)).padStart(2, "0");
            units.minutes.textContent = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
            units.seconds.textContent = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
            return true;
        }
        if (updateCountdown()) {
            const countdownInterval = window.setInterval(function () {
                if (!updateCountdown()) window.clearInterval(countdownInterval);
            }, 1000);
        }
    }

    const backToTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", function () { backToTop?.classList.toggle("visible", window.scrollY > 600); }, { passive: true });
    backToTop?.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
}());
