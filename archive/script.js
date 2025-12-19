let isSticky = false; //tracking current status of bool

window.addEventListener("scroll", function () {
    const nav = document.getElementById("landing-nav");
    const landingSection = document.querySelector(".landing-page");
    const landingBottom =
        landingSection.offsetTop + landingSection.offsetHeight;

    const shouldBeSticky = window.scrollY > landingBottom - 100 // point at which sticky starts!
    // If scrolled past landing section
    if (shouldBeSticky && !isSticky) {
        nav.classList.add("sticky");
        nav.classList.remove("removing")
        isSticky = true;
    } else if (!shouldBeSticky && isSticky) {
        nav.classList.add("removing")
        setTimeout(() => {
            nav.classList.remove('sticky', 'removing');
            isSticky = false;
        }, 200); // 0.2s + tiny buffer
    }
});


