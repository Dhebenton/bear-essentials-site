const stripe = Stripe("pk_live_51RVeDuFETrEWF2M5ccSoGIHtsNvWKc1Zi3h2UVXWylcy2BFZZjNLw2fiambGePJw8Tse4Iztx0MxGwNlymeLjmtx006Dwh7UY6");

let quantity = 1;

const qtyValue = document.getElementById("qty-value");
const increaseBtn = document.getElementById("qty-increase");
const decreaseBtn = document.getElementById("qty-decrease");
const checkoutBtn = document.getElementById("checkout-button");

increaseBtn.addEventListener("click", () => {
  quantity += 1;
  qtyValue.textContent = quantity;
});

decreaseBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity -= 1;
    qtyValue.textContent = quantity;
  }
});

checkoutBtn.addEventListener("click", async () => {
    const res = await fetch("http://localhost:4242/api/create-checkout-session", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: [
        {
          priceId: "price_1SZtawFETrEWF2M5OesWcn2u",
          quantity: quantity
        }
      ]
    })
  });

  if (!res.ok) throw new Error("Failed to create checkout session");

  const data = await res.json();
  const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
  if (error) throw error;
});
