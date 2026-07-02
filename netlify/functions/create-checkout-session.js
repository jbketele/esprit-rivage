const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {

    try {

        const { cart } = JSON.parse(event.body);

        const line_items = cart.map(item => ({
            price_data: {
                currency: "eur",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: 1
        }));

        const session = await stripe.checkout.sessions.create({

            payment_method_types: ["card"],

            mode: "payment",

            line_items,

            success_url:
                "https://esprit-rivage.fr/success.html",

            cancel_url:
                "https://esprit-rivage.fr/commande.html"

        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                url: session.url
            })
        };

    } catch (err) {

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message
            })
        };

    }

};