
// Disable iPhone Safari phone-number detection
const meta = document.createElement("meta");

meta.name = "format-detection";
meta.content = "telephone=no";

document.head.appendChild(meta);



fetch("components/header.html")
    .then(response => response.text())
    .then(data => {

        document.getElementById("header-placeholder").innerHTML = data;

        initializeHeader();

    });

function initializeHeader() {

    const header = document.getElementById("site-header");

    if (!header) return;

    window.addEventListener("scroll", () => {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    });

}

function initializeImageFallbacks() {
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        img.addEventListener("error", () => {
            img.src = "img/placeholder.jpg";
        });
    });
}
