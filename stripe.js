const stripe = Stripe("pk_live_51Tojr02zHuBq865PCCpxMRdgBo05tpzaPpvQgIoH9uFep5UgKYvdbYT6N0ZxdLi1HbtfgOZNAp3qupapwYjLhccG00M41PVpYz");

async function pay() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {

        alert("Votre panier est vide.");

        return;

    }

    const button = document.querySelector("button");

    button.disabled = true;

    button.innerHTML = "Redirection...";

    try {

        const response = await fetch("/.netlify/functions/create-checkout-session", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                cart

            })

        });

        const data = await response.json();

        window.location.href = data.url;

    } catch (error) {

        alert("Une erreur est survenue.");

        button.disabled = false;

        button.innerHTML = "Confirmer la commande";

    }

}