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
        ["Velocity", "Organiser information", "#about-us"], ["Horizon IoT Club", "Organiser information", "#about-us"], ["IPO", "International Partnership Office", "#about-us"]
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
