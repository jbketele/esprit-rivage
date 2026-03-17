function includeHTML(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        });
}

includeHTML("header", "/assets/components/header.html");
includeHTML("footer", "/assets/components/footer.html");