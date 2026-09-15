
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
    
        <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightbox);
    return lightbox;
}

function initializeLightbox() {
    const lightbox = createLightbox();

    const lightboxImg = lightbox.querySelector(".lightbox-image");
    const caption = lightbox.querySelector(".lightbox-caption");

    // Get all images that can be opened in the lightbox.
    // Images inside links are still ignored, just like your original code.
    const images = Array.from(
        document.querySelectorAll("img:not(.lightbox-image)")
    ).filter(img => !img.closest("a"));

    let currentIndex = 0;

    // Create navigation arrows
    const prevButton = document.createElement("button");
    prevButton.className = "lightbox-prev";
    prevButton.innerHTML = "&#10094;";
    prevButton.setAttribute("aria-label", "Previous image");

    const nextButton = document.createElement("button");
    nextButton.className = "lightbox-next";
    nextButton.innerHTML = "&#10095;";
    nextButton.setAttribute("aria-label", "Next image");

    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);

    function showImage(index) {
        // Wrap around when reaching either end
        if (index < 0) {
            index = images.length - 1;
        }

        if (index >= images.length) {
            index = 0;
        }

        currentIndex = index;

        const img = images[currentIndex];

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";

        // Get caption from the image's figure
        const figure = img.closest("figure");

        if (figure) {
            const figcaption = figure.querySelector("figcaption");

            if (figcaption && figcaption.textContent.trim()) {
                caption.textContent = figcaption.textContent;
                caption.style.display = "block";
            } else {
                caption.style.display = "none";
            }
        } else {
            caption.style.display = "none";
        }
    }

    // Open lightbox when an image is clicked
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            showImage(currentIndex);
            lightbox.classList.add("active");
        });
    });

    // Previous image
    prevButton.addEventListener("click", e => {
        e.stopPropagation();
        showImage(currentIndex - 1);
    });

    // Next image
    nextButton.addEventListener("click", e => {
        e.stopPropagation();
        showImage(currentIndex + 1);
    });

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    // Close button
    lightbox
        .querySelector(".lightbox-close")
        .addEventListener("click", closeLightbox);

    // Clicking the dark background closes the lightbox
    lightbox.addEventListener("click", e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener("keydown", e => {
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") {
            closeLightbox();
        }

        if (e.key === "ArrowLeft") {
            showImage(currentIndex - 1);
        }

        if (e.key === "ArrowRight") {
            showImage(currentIndex + 1);
        }
    });
}

/*
function initializeLightbox() {
    const lightbox = createLightbox();
    const lightboxImg =
        lightbox.querySelector("img");
    const caption =
        lightbox.querySelector(".lightbox-caption");
    document.querySelectorAll("img:not(.lightbox-image)").forEach(img => {
        // Ignore linked images
        if (img.closest("a")) return;
        img.addEventListener("click", () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || "";
            const figure = img.closest("figure");
            if (figure) {
                const figcaption = figure.querySelector("figcaption");
                if (figcaption && figcaption.textContent.trim()) {
                    caption.textContent = figcaption.textContent;
                    caption.style.display = "block";
                } else {
                    caption.style.display = "none";
                }
            } else {
                caption.style.display = "none";
            }
            lightbox.classList.add("active");
        });
    });
    function closeLightbox() {
        lightbox.classList.remove("active");
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

*/
