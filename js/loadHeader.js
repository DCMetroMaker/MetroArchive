const path = window.location.pathname;

let depth = "";

if (path.includes("/rolling-stock/")) {
    depth = "../";
}

fetch(depth + "../components/header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-placeholder").innerHTML = data;
    });
