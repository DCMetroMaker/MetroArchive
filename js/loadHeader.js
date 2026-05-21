const path = window.location.pathname;

let depth = "";

if (path.includes("/rolling-stock/")) {
    depth = "../";
}

fetch(depth + "components/header.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("header-placeholder").innerHTML = data;

        initializeHeader();

    });

function initializeHeader() {

    const header = document.getElementById("site-header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    });

}
