const navbarContainer = document.getElementById("navbar");

if (navbarContainer) {
  const navbarCandidates = ["navbar.html", "../navbar.html", "/navbar.html"];

  const rewriteNavbarLinksForNestedPages = () => {
    const pathname = window.location.pathname.replace(/\\/g, "/");
    const isBlogpostPage = pathname.includes("/blogposts/");

    if (!isBlogpostPage) {
      return;
    }

    navbarContainer.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) {
        return;
      }

      const isExternal = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href);
      const isAnchorOnly = href.startsWith("#");
      const isAlreadyAdjusted = href.startsWith("../") || href.startsWith("./");

      if (isExternal || isAnchorOnly || isAlreadyAdjusted) {
        return;
      }

      link.setAttribute("href", `../${href}`);
    });
  };

  (async () => {
    for (const path of navbarCandidates) {
      try {
        const res = await fetch(path);
        if (!res.ok) {
          continue;
        }

        navbarContainer.innerHTML = await res.text();
        rewriteNavbarLinksForNestedPages();
        return;
      } catch {
        // Try next candidate path.
      }
    }

    console.error("Failed to load navbar.html from known paths.");
  })();
}
