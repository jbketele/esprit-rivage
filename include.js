function includeHTML(id, file) {
    const target = document.getElementById(id);

    if (!target) {
        console.error(`❌ Element #${id} introuvable`);
        return Promise.resolve();
    }

    return fetch(file)
        .then(res => res.text())
        .then(data => {
            target.innerHTML = data;
        })
        .catch(err => console.error("Erreur includeHTML:", err));
}

function initModal() {
    const modal = document.getElementById("modal-devis");
    const btn = document.getElementById("btn-devis");

    if (!modal || !btn) {
        console.warn("Modal ou bouton devis introuvable");
        return;
    }

    const closeBtn = modal.querySelector(".close-devis");

    btn.addEventListener("click", () => {
        modal.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove("active");
        }
    });
}

async function initApp() {
    await includeHTML("header", "/assets/components/header.html");
    await includeHTML("footer", "/assets/components/footer.html");
    await includeHTML("modal-devis", "/assets/components/modal.html");

    initModal();
}

initApp();