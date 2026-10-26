document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       NAVBAR SCROLL EFFECT
    =============================== */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            navbar.style.boxShadow =
                "0 5px 25px rgba(0, 0, 0, 0.15)";
        } else {
            navbar.style.boxShadow = "none";
        }

    });


    /* ===============================
       STAT COUNTER
    =============================== */

    const counters = document.querySelectorAll("[data-count]");

    const observer = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) return;

                const counter = entry.target;
                const target = parseInt(
                    counter.getAttribute("data-count")
                );

                let current = 0;

                const increment = Math.ceil(target / 50);

                const updateCounter = setInterval(function () {

                    current += increment;

                    if (current >= target) {
                        current = target;
                        clearInterval(updateCounter);
                    }

                    counter.textContent =
                        current.toLocaleString();

                }, 30);

                observer.unobserve(counter);

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(function (counter) {
        observer.observe(counter);
    });

});
