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

    const backToTop = document.getElementById("back-to-top");
    window.addEventListener("scroll", function () { backToTop?.classList.toggle("visible", window.scrollY > 600); }, { passive: true });
    backToTop?.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
}());


    // Equinox 2027 event countdown (24 February 2027, midnight IST).
    const countdown = document.getElementById("event-countdown");
    if (countdown) {
        const targetTime = new Date(countdown.getAttribute("data-target")).getTime();
        const units = {
            days: countdown.querySelector("[data-countdown-days]"),
            hours: countdown.querySelector("[data-countdown-hours]"),
            minutes: countdown.querySelector("[data-countdown-minutes]"),
            seconds: countdown.querySelector("[data-countdown-seconds]")
        };
        let countdownInterval;

        function updateCountdown() {
            const remaining = targetTime - Date.now();
            if (!Number.isFinite(targetTime) || remaining <= 0) {
                Object.keys(units).forEach(function (unit) {
                    if (units[unit]) units[unit].textContent = unit === "days" ? "0" : "00";
                });
                const note = countdown.parentElement.querySelector(".countdown-note");
                if (note) {
                    note.textContent = "Equinox 2027 is here! Check the official event updates.";
                    note.classList.add("countdown-finished");
                }
                if (countdownInterval) window.clearInterval(countdownInterval);
                return;
            }

            const seconds = Math.floor(remaining / 1000);
            const values = {
                days: Math.floor(seconds / 86400),
                hours: Math.floor((seconds % 86400) / 3600),
                minutes: Math.floor((seconds % 3600) / 60),
                seconds: seconds % 60
            };
            Object.keys(units).forEach(function (unit) {
                if (units[unit]) units[unit].textContent = unit === "days"
                    ? String(values[unit])
                    : String(values[unit]).padStart(2, "0");
            });
        }

        updateCountdown();
        if (targetTime > Date.now()) countdownInterval = window.setInterval(updateCountdown, 1000);
    }
