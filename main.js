(function () {
    "use strict";

    // -------------------------------------------------------------
    // Mobile navigation toggle
    // -------------------------------------------------------------
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

    // -------------------------------------------------------------
    // Navbar scroll state
    // -------------------------------------------------------------
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        const updateNavbarScroll = function () {
            navbar.classList.toggle("navbar--scrolled", window.scrollY > 20);
        };
        window.addEventListener("scroll", updateNavbarScroll, { passive: true });
        updateNavbarScroll();
    }

    // -------------------------------------------------------------
    // Active navigation link highlighting on scroll
    // -------------------------------------------------------------
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const navigationLinks = Array.from(document.querySelectorAll(".nav-links a"));
    if ("IntersectionObserver" in window && sections.length > 0) {
        const navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navigationLinks.forEach(function (link) {
                    const href = link.getAttribute("href");
                    const targetId = entry.target.id;
                    const isActive = href === "#" + targetId || href === "/home#" + targetId;
                    link.classList.toggle("active", isActive);
                });
            });
        }, { rootMargin: "-30% 0px -55% 0px" });
        sections.forEach(function (section) { navObserver.observe(section); });
    }

    // -------------------------------------------------------------
    // Scroll-triggered reveals for sections and cards
    // -------------------------------------------------------------
    const revealElements = Array.from(document.querySelectorAll(".section-entrance, .stagger-child"));
    const welcomeSection = document.getElementById("welcome");
    if (welcomeSection) {
        welcomeSection.classList.add("is-revealed");
    }

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px -40px 0px"
        });

        revealElements.forEach(function (el) {
            if (el === welcomeSection) return;
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add("is-revealed");
        });
    }

    // -------------------------------------------------------------
    // Accordion interaction
    // -------------------------------------------------------------
    document.querySelectorAll(".accordion-header").forEach(function (button) {
        button.addEventListener("click", function () {
            const content = button.parentElement.nextElementSibling;
            const expanded = button.getAttribute("aria-expanded") === "true";
            button.setAttribute("aria-expanded", String(!expanded));
            content.hidden = expanded;
            const icon = button.querySelector("span");
            if (icon) icon.textContent = expanded ? "+" : "−";
        });
    });

    const developerTrigger = document.querySelector(".developer-trigger");
    const developerEntry = document.getElementById("developer-entry");
    if (developerTrigger && developerEntry) {
        let clickCount = 0;
        let resetTimer;
        const revealDeveloperEntry = function () {
            clickCount += 1;
            window.clearTimeout(resetTimer);
            resetTimer = window.setTimeout(function () { clickCount = 0; }, 5000);
            if (clickCount >= 5) {
                developerEntry.hidden = false;
                clickCount = 0;
            }
        };
        developerTrigger.addEventListener("mousedown", function (event) {
            event.preventDefault();
        });
        developerTrigger.addEventListener("selectstart", function (event) {
            event.preventDefault();
        });
        developerTrigger.addEventListener("click", revealDeveloperEntry);
        developerTrigger.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                revealDeveloperEntry();
            }
        });
    }

    // -------------------------------------------------------------
    // Search overlay & modal
    // -------------------------------------------------------------
    const overlay = document.getElementById("search-overlay");
    const searchInput = document.getElementById("search-input");
    const results = document.getElementById("search-results");
    const searchData = [
        ["About the Hackathon", "Learn about Equinox 2027", "#about-hackathon"],
        ["Challenge Tracks", "Explore the five tracks", "#challenges"],
        ["How It Works", "Follow the event journey", "#how-it-works"],
        ["Partners and Sponsors", "Meet the event network", "#partners"],
        ["Event Schedule", "View provisional milestones", "#schedule"],
        ["About the Organisers", "Meet Velocity, Horizon IoT Club, and IPO", "#about-us"],
        ["Registration", "Learn how to register", "#registration"],
        ["FAQs", "Find answers to common questions", "#faqs"],
        ["Contact", "Get in touch with the organisers", "#contact"],
        ["Quantum University", "Host institution", "#partners"],
        ["Velocity", "Gaming and Game Development Club", "/clubs/velocity"],
        ["Horizon IoT Club", "IoT and connected technologies", "/clubs/horizon"],
        ["IPO", "International Partnership Office", "/clubs/ipo"]
    ];

    function renderResults(query) {
        if (!results) return;
        const q = query.toLowerCase();
        const matches = searchData.filter(function (item) {
            return item.join(" ").toLowerCase().includes(q);
        });
        results.innerHTML = matches.length
            ? matches.map(function (item) {
                return '<a class="search-result-item" href="' + item[2] + '"><strong>' + item[0] + '</strong><span>' + item[1] + '</span></a>';
            }).join("")
            : '<p class="no-results">No matching sections found.</p>';
    }

    function openSearch() {
        if (!overlay || !searchInput) return;
        overlay.hidden = false;
        searchInput.value = "";
        renderResults("");
        searchInput.focus();
    }

    function closeSearch() {
        if (overlay) overlay.hidden = true;
    }

    document.getElementById("search-btn")?.addEventListener("click", openSearch);
    document.getElementById("close-search")?.addEventListener("click", closeSearch);
    document.getElementById("clear-search")?.addEventListener("click", function () {
        if (!searchInput) return;
        searchInput.value = "";
        renderResults("");
        searchInput.focus();
    });
    searchInput?.addEventListener("input", function () {
        renderResults(searchInput.value);
    });
    results?.addEventListener("click", closeSearch);
    overlay?.addEventListener("click", function (event) {
        if (event.target === overlay) closeSearch();
    });
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && overlay && !overlay.hidden) closeSearch();
    });

    // -------------------------------------------------------------
    // Challenge Tracks Stacking Deck Interaction (Video Project 5)
    // -------------------------------------------------------------
    const deckTabs = Array.from(document.querySelectorAll(".deck-tab"));
    const deckCards = Array.from(document.querySelectorAll(".deck-card"));
    const deckTabsNav = document.querySelector(".deck-tabs-nav");
    const deckTabsWrapper = document.querySelector(".deck-tabs-wrapper");

    if (deckTabs.length > 0 && deckCards.length > 0) {
        // Tab click: smooth scroll to corresponding card
        deckTabs.forEach(function (tab) {
            tab.addEventListener("click", function () {
                const targetId = tab.getAttribute("data-target");
                const targetCard = document.getElementById(targetId);
                if (!targetCard) return;

                const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 72;
                const tabsHeight = deckTabsWrapper ? deckTabsWrapper.offsetHeight : 54;
                const cardIndex = parseInt(targetCard.getAttribute("data-card-index")) || 0;

                const cardRect = targetCard.getBoundingClientRect();
                const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
                // Offset calculation accounts for sticky navbar + sticky tabs + card stacking offset
                const targetY = currentScrollY + cardRect.top - (navHeight + tabsHeight + 16 + cardIndex * 10);

                window.scrollTo({
                    top: Math.max(0, targetY),
                    behavior: "smooth"
                });

                // Update active tab immediately
                deckTabs.forEach(function (t) { t.classList.toggle("is-active", t === tab); });
                if (deckTabsNav) {
                    tab.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
                }
            });
        });

        // Scroll listener: update active tab as cards stack
        let isTicking = false;
        const updateActiveDeckTab = function () {
            const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 72;
            const tabsHeight = deckTabsWrapper ? deckTabsWrapper.offsetHeight : 54;
            const triggerLine = navHeight + tabsHeight + 80;

            let currentActiveIndex = 0;
            deckCards.forEach(function (card, index) {
                const rect = card.getBoundingClientRect();
                if (rect.top <= triggerLine) {
                    currentActiveIndex = index;
                }
            });

            deckTabs.forEach(function (tab, index) {
                const isActive = index === currentActiveIndex;
                if (tab.classList.contains("is-active") !== isActive) {
                    tab.classList.toggle("is-active", isActive);
                    if (isActive && deckTabsNav) {
                        tab.scrollIntoView({ behavior: "smooth", inline: "nearest", block: "nearest" });
                    }
                }
            });
            isTicking = false;
        };

        window.addEventListener("scroll", function () {
            if (!isTicking) {
                window.requestAnimationFrame(updateActiveDeckTab);
                isTicking = true;
            }
        }, { passive: true });
    }

    // -------------------------------------------------------------
    // Sponsor Marquee touch pause enhancement (Video Project 6)
    // -------------------------------------------------------------
    const marqueeTracks = document.querySelectorAll(".sponsor-marquee__track");
    marqueeTracks.forEach(function (track) {
        let isTouchPaused = false;
        track.parentElement?.addEventListener("touchstart", function () {
            track.style.animationPlayState = "paused";
            isTouchPaused = true;
        }, { passive: true });
        track.parentElement?.addEventListener("touchend", function () {
            setTimeout(function () {
                if (isTouchPaused) {
                    track.style.animationPlayState = "";
                    isTouchPaused = false;
                }
            }, 1200);
        }, { passive: true });
    });

    // -------------------------------------------------------------
    // Equinox 2027 event countdown (24 February 2027, midnight IST)
    // -------------------------------------------------------------
    const countdown = document.getElementById("event-countdown");
    if (countdown) {
        const targetAttr = countdown.getAttribute("data-target");
        const targetTime = targetAttr ? new Date(targetAttr).getTime() : NaN;
        const units = {
            days: countdown.querySelector("[data-countdown-days]"),
            hours: countdown.querySelector("[data-countdown-hours]"),
            minutes: countdown.querySelector("[data-countdown-minutes]"),
            seconds: countdown.querySelector("[data-countdown-seconds]")
        };
        const prevValues = { days: "", hours: "", minutes: "", seconds: "" };
        let countdownInterval;

        function updateCountdown() {
            const remaining = targetTime - Date.now();
            if (!Number.isFinite(targetTime) || remaining <= 0) {
                Object.keys(units).forEach(function (unit) {
                    if (units[unit]) units[unit].textContent = unit === "days" ? "0" : "00";
                });
                const note = countdown.parentElement ? countdown.parentElement.querySelector(".countdown-note") : null;
                if (note) {
                    note.textContent = "Equinox 2027 is here! Check the official event updates.";
                    note.classList.add("countdown-finished");
                }
                if (countdownInterval) window.clearInterval(countdownInterval);
                return;
            }

            const totalSeconds = Math.floor(remaining / 1000);
            const values = {
                days: Math.floor(totalSeconds / 86400),
                hours: Math.floor((totalSeconds % 86400) / 3600),
                minutes: Math.floor((totalSeconds % 3600) / 60),
                seconds: totalSeconds % 60
            };

            Object.keys(units).forEach(function (unit) {
                const el = units[unit];
                if (!el) return;
                const formatted = unit === "days"
                    ? String(values[unit])
                    : String(values[unit]).padStart(2, "0");

                if (prevValues[unit] !== formatted) {
                    el.textContent = formatted;
                    prevValues[unit] = formatted;

                    // Trigger subtle pulse micro-animation when value changes
                    const parentCard = el.closest(".countdown-unit");
                    if (parentCard) {
                        parentCard.classList.remove("digit-pulse");
                        void parentCard.offsetWidth; // force reflow
                        parentCard.classList.add("digit-pulse");
                    }
                }
            });
        }

        updateCountdown();
        if (targetTime > Date.now()) {
            countdownInterval = window.setInterval(updateCountdown, 1000);
        }
    }
}());
