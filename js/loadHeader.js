
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
        initializeImageFallbacks();
        initializeLightbox();
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
            img.src = "img/comingsoon.jpg";
        });
    });
}



function createLightbox() {
    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img src="" alt="">
    `;
    document.body.appendChild(lightbox);
    return lightbox;
}

function initializeLightbox() {
    const lightbox = createLightbox();
    const lightboxImg = lightbox.querySelector("img");
    document.querySelectorAll("img").forEach(img => {

        // Ignore linked images
        if (img.closest("a")) return;
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "";
            lightbox.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
    }
    lightbox
        .querySelector(".lightbox-close")
        .addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeLightbox();
        }
    });
}


