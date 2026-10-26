
document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       NAVBAR SCROLL EFFECT
    =============================== */

    const navbar = document.querySelector(".navbar");

    if (navbar) {
        let ticking = false;

        window.addEventListener("scroll", function () {
            if (ticking) return;
            ticking = true;

            window.requestAnimationFrame(function () {
                navbar.style.boxShadow =
                    window.scrollY > 50
                        ? "0 5px 25px rgba(0, 0, 0, 0.15)"
                        : "none";

                ticking = false;
            });
        }, { passive: true });
    }


    /* ===============================
       STAT COUNTER
    =============================== */

    const counters = document.querySelectorAll("[data-count]");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;

                    const counter = entry.target;
                    const target = Number.parseInt(
                        counter.getAttribute("data-count"),
                        10
                    );

                    if (!Number.isFinite(target) || target < 0) {
                        observer.unobserve(counter);
                        return;
                    }

                    const reduceMotion = window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches;

                    if (reduceMotion || target === 0) {
                        counter.textContent = target.toLocaleString();
                        observer.unobserve(counter);
                        return;
                    }

                    const duration = 1200;
                    const start = performance.now();

                    function animate(now) {
                        const progress = Math.min(
                            (now - start) / duration,
                            1
                        );

                        counter.textContent = Math.floor(
                            target * progress
                        ).toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    }

                    requestAnimationFrame(animate);
                    observer.unobserve(counter);
                });
            },
            { threshold: 0.5 }
        );

        counters.forEach(function (counter) {
            observer.observe(counter);
        });
    } else {
        counters.forEach(function (counter) {
            const target = Number.parseInt(
                counter.getAttribute("data-count"),
                10
            );

            if (Number.isFinite(target)) {
                counter.textContent = target.toLocaleString();
            }
        });
    }


    /* ===============================
       IMAGE LOADING OPTIMISATION
    =============================== */

    document.querySelectorAll(
        "img:not([loading])"
    ).forEach(function (img) {

        // Defer images that are not yet loaded.
        if (!img.complete) {
            img.loading = "lazy";
        }

        img.decoding = "async";
    });

});
