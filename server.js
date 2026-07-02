const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/* 🔥 création session Stripe */
app.post("/create-checkout-session", async (req, res) => {

    const cart = req.body.cart;

    const line_items = cart.map(item => ({
        price_data: {
            currency: "eur",
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100,
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items,
        success_url: "http://localhost:3000/success.html",
        cancel_url: "http://localhost:3000/cancel.html",
    });

    res.json({ url: session.url });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});