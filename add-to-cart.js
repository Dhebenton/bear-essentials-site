document.addEventListener("DOMContentLoaded", () => {
  let quantity = 1;

  const qtyValue = document.getElementById("qty-value");
  const increaseBtn = document.getElementById("qty-increase");
  const decreaseBtn = document.getElementById("qty-decrease");

  if (qtyValue) qtyValue.textContent = "1";

  increaseBtn?.addEventListener("click", () => {
    quantity += 1;
    qtyValue.textContent = quantity;
  });

  decreaseBtn?.addEventListener("click", () => {
    if (quantity > 1) {
      quantity -= 1;
      qtyValue.textContent = quantity;
    }
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-to-cart");
    if (!btn) return;

    e.preventDefault();

    const existing = Number(localStorage.getItem("cart_qty")) || 0;
    const newQty = existing + quantity;

    localStorage.setItem("cart_qty", String(newQty));

    window.dispatchEvent(new Event("cart:add"));

    quantity = 1;
    qtyValue.textContent = "1";
  });
});
