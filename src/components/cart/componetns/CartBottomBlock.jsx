import { loadStripe } from "@stripe/stripe-js";
import { useCart } from "../cartContext";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function getShippingEstimate() {
  const now = new Date();

  const cutoff = new Date(now);
  cutoff.setHours(15, 30, 0, 0);

  let effectiveCutoff = cutoff;
  if (now > cutoff) {
    effectiveCutoff = new Date(cutoff);
    effectiveCutoff.setDate(effectiveCutoff.getDate() + 1);
  }

  const diffMs = effectiveCutoff - now;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  const purchaseDate = new Date(now);
  if (now > cutoff) purchaseDate.setDate(purchaseDate.getDate() + 1);

  const minDelivery = new Date(purchaseDate);
  minDelivery.setDate(minDelivery.getDate() + 2);

  const maxDelivery = new Date(purchaseDate);
  maxDelivery.setDate(maxDelivery.getDate() + 4);

  const formatDate = (d) =>
    d.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  return {
    hours,
    minutes,
    minDate: formatDate(minDelivery),
    maxDate: formatDate(maxDelivery),
  };
}

export default function CartBottomBlock() {
  const { qty, subtotal, total } = useCart();
  const shipping = getShippingEstimate();

  const FREE_SHIPPING_THRESHOLD = 35;
  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  async function handleCheckout() {
    const res = await fetch(
      "http://localhost:4242/api/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              priceId: "price_1SZtawFETrEWF2M5OesWcn2u",
              quantity: qty,
            },
          ],
        }),
      }
    );

    if (!res.ok) throw new Error("Checkout session failed");

    const data = await res.json();
    const stripe = await stripePromise;

    await stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <div className="cart-bottom-block">
      {/* Subtotal */}
      <div className="f-row j-s-b">
        <h3>Subtotal:</h3>
        <div className="f-row g8 a-f-e">
          {subtotal !== total && (
            <p className="cart-bottom-block-cost gant strike">
              £{subtotal.toFixed(2)}
            </p>
          )}
          <p className="cart-bottom-block-cost gant">
            £{total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Shipping */}
      <div className="f-row j-s-b">
        <h3>Shipping</h3>
        <p
          className={`cart-bottom-block-cost gant${
            hasFreeShipping ? " second" : ""
          }`}
        >
          {hasFreeShipping ? "Free" : "£2.99"}
        </p>
      </div>

      {/* Shipping estimate */}
      <div className="f-row cart-estimated-shipping-wrap g12">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M1.36364 0C0.610182 0 0 0.610909 0 1.36364V6.54545H8.72727V1.36364C8.72727 0.610182 8.11636 0 7.36364 0H1.36364ZM8.72727 7.63636H0V9.54545C0 10.2982 0.610909 10.9091 1.36364 10.9091H1.63636C1.63636 10.3304 1.86623 9.77548 2.2754 9.36631C2.68457 8.95714 3.23953 8.72727 3.81818 8.72727C4.39684 8.72727 4.95179 8.95714 5.36096 9.36631C5.77013 9.77548 6 10.3304 6 10.9091H8.18182C8.32648 10.9091 8.46522 10.8516 8.56751 10.7493C8.6698 10.647 8.72727 10.5083 8.72727 10.3636V7.63636Z" /> <path d="M4.90909 10.9091C4.90909 10.6198 4.79416 10.3423 4.58957 10.1377C4.38499 9.93312 4.10751 9.81818 3.81818 9.81818C3.52885 9.81818 3.25138 9.93312 3.04679 10.1377C2.84221 10.3423 2.72727 10.6198 2.72727 10.9091C2.72727 11.1984 2.84221 11.4759 3.04679 11.6805C3.25138 11.8851 3.52885 12 3.81818 12C4.10751 12 4.38499 11.8851 4.58957 11.6805C4.79416 11.4759 4.90909 11.1984 4.90909 10.9091ZM10.3636 1.63636C10.219 1.63636 10.0802 1.69383 9.97794 1.79612C9.87565 1.89842 9.81818 2.03715 9.81818 2.18182V10.3636C9.81818 10.4269 9.82909 10.4873 9.84873 10.544C9.93937 10.0067 10.2278 9.52269 10.6573 9.1873C11.0868 8.85191 11.6263 8.68939 12.1696 8.7317C12.7128 8.77401 13.2206 9.01809 13.593 9.41593C13.9654 9.81377 14.1755 10.3366 14.1818 10.8815C14.8022 10.7542 15.2887 10.2015 15.2465 9.512C15.0839 6.84899 14.1398 4.29302 12.5324 2.16364C12.4071 1.99898 12.2454 1.86565 12.0599 1.77415C11.8744 1.68266 11.6701 1.63549 11.4633 1.63636H10.3636Z" /> <path d="M13.0909 10.9091C13.0909 10.6198 12.976 10.3423 12.7714 10.1377C12.5668 9.93312 12.2893 9.81818 12 9.81818C11.7107 9.81818 11.4332 9.93312 11.2286 10.1377C11.024 10.3423 10.9091 10.6198 10.9091 10.9091C10.9091 11.1984 11.024 11.4759 11.2286 11.6805C11.4332 11.8851 11.7107 12 12 12C12.2893 12 12.5668 11.8851 12.7714 11.6805C12.976 11.4759 13.0909 11.1984 13.0909 10.9091Z" /> </svg>

        <p>
          Order in{" "}
          <span>
            {shipping.hours}h {shipping.minutes}m
          </span>{" "}
          & get it by{" "}
          <span>
            {shipping.minDate} – {shipping.maxDate}
          </span>
        </p>
      </div>

      {/* Checkout */}
      <button className="button-main" type="button" onClick={handleCheckout}>
        Proceed to checkout
      </button>
    </div>
  );
}
